"use client";

import { useEffect, useRef, useState } from "react";
import { getIdToken, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import useNoScroll from "../../hooks/useNoScroll";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export default function SmileCam() {
  useNoScroll();
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [user, setUser] = useState<any>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [submittedForEnhancement, setSubmittedForEnhancement] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const storage = getStorage();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        const token = await getIdToken(currentUser);
        setAuthToken(token);
      } else {
        setUser(null);
        setAuthToken(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!showCamera) return;

    navigator.mediaDevices
      .getUserMedia({
        video: { width: { ideal: 9999 }, height: { ideal: 9999 } },
      })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            console.log(
              "[📷 Video Feed] Resolution:",
              videoRef.current?.videoWidth,
              "x",
              videoRef.current?.videoHeight
            );
          };
        }
      })
      .catch((err) => console.error("Camera error", err));
  }, [showCamera]);

  const handleCapture = async () => {
    if (!videoRef.current || !canvasRef.current || !authToken) return;

    setLoading(true);
    setShowCamera(false);
    setSubmittedForEnhancement(false);
    setErrorMessage(null);

    const ctx = canvasRef.current.getContext("2d");
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    ctx?.drawImage(videoRef.current, 0, 0);

    canvasRef.current.toBlob(async (blob) => {
      if (!blob) return;

      const filename = `teeth-${Date.now()}.jpg`;
      const storageRef = ref(storage, `uploads/${user.uid}/${filename}`);
      const uploadTask = uploadBytesResumable(storageRef, blob);

      uploadTask.on(
        "state_changed",
        () => {},
        (error) => {
          console.error("Upload error:", error);
          setLoading(false);
          setErrorMessage("Upload failed. Please try again.");
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setCapturedImage(downloadURL);
          } catch (err) {
            console.error("Download URL error:", err);
            setErrorMessage("Failed to retrieve uploaded image.");
          } finally {
            setLoading(false);
          }
        }
      );
    }, "image/jpeg");
  };

  const handleRetake = () => {
    setCapturedImage(null);
    setEnhancedImage(null);
    setLoading(false);
    setIsProcessing(false);
    setSubmittedForEnhancement(false);
    setShowCamera(true);
    setErrorMessage(null);
  };

  const handleSubmitEnhancement = async () => {
    if (!capturedImage || !user) return;

    setIsProcessing(true);
    setSubmittedForEnhancement(true);
    setErrorMessage(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_PYTHON_BACKEND_URL}/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl: capturedImage,
          uid: user?.uid,
        }),
      });

      const result = await response.json();
      if (response.ok && result.enhancedImageUrl) {
        setEnhancedImage(result.enhancedImageUrl);
      } else {
        const message = result.error || "Unknown error";
        console.error("Enhancement error:", message);
        setErrorMessage(message);
      }
    } catch (err) {
      console.error("Backend error:", err);
      setErrorMessage("Server error. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const getContent = () => {
    return (
      <div className="w-full aspect-[3/4] rounded-xl overflow-hidden border border-gray-300 shadow-md bg-white flex items-center justify-center relative">
        {showCamera && !loading && (
          <>
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-x-0 top-[16%] flex items-center justify-center pointer-events-none">
              <img src="silhouette.png" alt="Silhouette Overlay" />
            </div>
            <button
              onClick={handleCapture}
              className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-3xl bg-white border-4 border-red-400 w-16 h-16 rounded-full shadow-md hover:scale-105 active:scale-95 transition-transform flex items-center justify-center"
              aria-label="Capture"
            >
              📸
            </button>
            <canvas ref={canvasRef} className="hidden" />
          </>
        )}

        {loading && (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <p className="text-sm font-medium text-blue-500 mt-6 text-center px-4">
              Uploading and preparing your photo...
            </p>
          </div>
        )}

        {capturedImage && !enhancedImage && !submittedForEnhancement && (
          <img
            src={capturedImage}
            alt="Smile Preview"
            className="w-full h-full object-cover"
          />
        )}

        {submittedForEnhancement && isProcessing && (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
            <p className="text-sm mt-4 text-blue-600 font-medium text-center px-4">
              Enhancing smile...
            </p>
          </div>
        )}

        {enhancedImage && (
          <img
            src={enhancedImage}
            alt="Enhanced Smile"
            className="w-full h-full object-cover"
          />
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center px-4 w-full max-w-md">
      {!user ? (
        <p className="text-red-600">Please log in to take a photo.</p>
      ) : (
        <>
          {errorMessage && (
            <div className="w-full mb-2 text-center">
              <p className="text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">
                ⚠️ {errorMessage}
              </p>
            </div>
          )}

          {getContent()}

          {(capturedImage && !enhancedImage && !submittedForEnhancement) && (
            <div className="flex justify-between w-full mt-4 px-2">
              <button
                onClick={handleRetake}
                className="px-4 py-2 text-sm bg-red-100 text-red-700 rounded-full border border-red-300 hover:bg-red-300 w-[48%]"
              >
                Retake
              </button>
              <button
                onClick={handleSubmitEnhancement}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-full hover:bg-blue-700 w-[48%]"
              >
                Submit
              </button>
            </div>
          )}

          {enhancedImage && (
            <div className="flex justify-center w-full mt-4 px-2">
              <button
                onClick={handleRetake}
                className="px-4 py-2 text-sm bg-red-100 text-red-700 rounded-full border border-red-300 hover:bg-red-300 w-full"
              >
                Retake
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
