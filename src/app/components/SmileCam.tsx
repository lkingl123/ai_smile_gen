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
  const [showCamera, setShowCamera] = useState(true); // ✅ track whether camera should show

  const storage = getStorage();

  // 🔒 Monitor Firebase Auth
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

  // 📷 Setup Camera
  useEffect(() => {
    if (!showCamera) return;
  
    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: { ideal: 9999 },
          height: { ideal: 9999 },
        },
      })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
  
          videoRef.current.onloadedmetadata = () => {
            console.log(
              "[📷 Video Feed] Max resolution negotiated:",
              videoRef.current?.videoWidth,
              "x",
              videoRef.current?.videoHeight
            );
          };
        }
      })
      .catch((err) => {
        console.error("Camera error", err);
      });
  }, [showCamera]);
  

  // 📸 Capture & Upload
  const handleCapture = async () => {
    if (!videoRef.current || !canvasRef.current || !authToken) return;

    setLoading(true);
    setShowCamera(false); // hide camera after capture

    const ctx = canvasRef.current.getContext("2d");
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    ctx?.drawImage(videoRef.current, 0, 0);

    canvasRef.current.toBlob(async (blob) => {
      if (!blob) return;

      const filename = `teeth-${Date.now()}.jpg`;
      const storageRef = ref(storage, `uploads/${filename}`);
      const uploadTask = uploadBytesResumable(storageRef, blob);

      uploadTask.on(
        "state_changed",
        () => {},
        (error) => console.error("Upload error:", error),
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            setTimeout(() => {
              setCapturedImage(downloadURL);
              setLoading(false);
            }, 3000);
          } catch (err) {
            console.error("Download URL error:", err);
            setLoading(false);
          }
        }
      );
    }, "image/jpeg");
  };

  // 🔁 Reset back to camera
  const handleRetake = () => {
    setCapturedImage(null);
    setLoading(false);
    setShowCamera(true);
  };

  return (
    <div className="flex flex-col items-center">
      {!user ? (
        <p className="text-red-600">Please log in to take a photo.</p>
      ) : (
        <>
          {/* 📸 CAMERA VIEW */}
          {showCamera && !loading && (
            <>
              <div className="relative w-full max-w-md aspect-[3/4] rounded-xl overflow-hidden border border-gray-300 shadow-md">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-x-0 top-[0%] flex items-center justify-center pointer-events-none">
                  <img src="silhouette.png" alt="Silhouette Overlay" />
                </div>
              </div>

              <button
                onClick={handleCapture}
                className="mt-5 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition"
              >
                Capture
              </button>

              <canvas ref={canvasRef} className="hidden" />
            </>
          )}

          {/* 🔄 LOADING STATE */}
          {loading && (
            <div className="flex flex-col items-center justify-center h-[500px]">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
              <p className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500 mt-6">
                Uploading and preparing your photo...
              </p>
            </div>
          )}

          {/* ✅ RESULT VIEW */}
          {capturedImage && !loading && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 mb-2">
                Here's your captured smile:
              </p>
              <div className="w-full max-w-md aspect-[3/4] rounded-xl overflow-hidden border border-gray-300 shadow-md">
                <img
                  src={capturedImage}
                  alt="Captured Smile"
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
