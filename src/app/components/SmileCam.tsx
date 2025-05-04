"use client";

import { useEffect, useRef, useState } from "react";
import { getIdToken, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

export default function SmileCam() {
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
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            setCapturedImage(downloadURL);
          } catch (err) {
            console.error("Download URL error:", err);
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
  };

  const handleSubmitEnhancement = async () => {
    if (!capturedImage || !user) return;

    setIsProcessing(true);
    setSubmittedForEnhancement(true);

    try {
      const response = await fetch(`${process.env.PYTHON_BACKEND_URL}/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image_url: capturedImage,
          uid: user?.uid,
        }),
      });

      const result = await response.json();
      if (response.ok && result.enhanced_image_url) {
        setEnhancedImage(result.enhanced_image_url);
      } else {
        console.error("Enhancement error:", result.error || "Unknown error");
      }
    } catch (err) {
      console.error("Backend error:", err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col items-center px-4">
      {!user ? (
        <p className="text-red-600">Please log in to take a photo.</p>
      ) : (
        <>
          {showCamera && !loading && (
            <>
              <div className="relative w-full max-w-md aspect-[3/4] rounded-xl overflow-hidden border border-gray-300 shadow-md">
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
                  className="absolute bottom-5 left-1/2 transform -translate-x-1/2 text-3xl bg-white border-4 border-red-400 w-16 h-16 rounded-full shadow-md hover:scale-105 active:scale-95 transition-transform flex items-center justify-center"
                  aria-label="Capture"
                >
                  📸
                </button>
              </div>
              <canvas ref={canvasRef} className="hidden" />
            </>
          )}

          {loading && (
            <div className="flex flex-col items-center justify-center h-[500px]">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
              <p className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500 mt-6">
                Uploading and preparing your photo...
              </p>
            </div>
          )}

          {capturedImage && !enhancedImage && !submittedForEnhancement && (
            <div className="mt-6 text-center w-full">
              <p className="text-sm text-gray-600 mb-2">
                If you're satisfied with the photo, hit submit.
              </p>
              <div className="w-full max-w-md aspect-[3/4] rounded-xl overflow-hidden border border-gray-300 shadow-md mx-auto">
                <img
                  src={capturedImage}
                  alt="Smile Preview"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex justify-center gap-4 mt-2">
                <button
                  onClick={handleRetake}
                  className="px-5 py-2 bg-red-100 text-sm text-red-700 rounded-full border border-red-300 hover:bg-red-300 transition"
                >
                  Retake Photo
                </button>
                <button
                  onClick={handleSubmitEnhancement}
                  className="px-5 py-2 bg-blue-600 text-white text-sm rounded-full hover:bg-blue-700 transition"
                >
                  Submit
                </button>
              </div>
            </div>
          )}

          {submittedForEnhancement && isProcessing && (
            <div className="w-full max-w-md h-[500px] flex flex-col items-center justify-center bg-white border border-gray-300 rounded-xl shadow-md p-4 mt-6">
              <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent"></div>
              <p className="text-sm mt-4 text-blue-600 font-medium">
                Enhancing smile...
              </p>
            </div>
          )}

          {enhancedImage && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 mb-2">
                Here's your enhanced smile:
              </p>
              <div className="w-full max-w-md aspect-[3/4] rounded-xl overflow-hidden border border-gray-300 shadow-md mx-auto">
                <img
                  src={enhancedImage}
                  alt="Enhanced Smile"
                  className="w-full h-full object-cover"
                />
              </div>

              <button
                onClick={handleRetake}
                className="mt-5 px-5 py-2 bg-red-100 text-sm text-red-700 rounded-full border border-red-300 hover:bg-red-300 transition"
              >
                Retake Photo
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
