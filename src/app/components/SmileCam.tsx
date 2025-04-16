import { useEffect, useRef, useState } from "react";
import { getIdToken, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { getDownloadURL } from "firebase/storage"; // Import getDownloadURL separately

export default function SmileCam() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [user, setUser] = useState<any>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [viewed, setViewed] = useState(false);

  const storage = getStorage(); // Initialize Firebase Storage

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
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Camera error", err);
      });
  }, []);

  // 📸 Capture Photo and Send to Firebase
  const captureAndProcess = async () => {
    if (!videoRef.current || !canvasRef.current || !authToken) return;

    setLoading(true);

    const ctx = canvasRef.current.getContext("2d");
    canvasRef.current.width = videoRef.current.videoWidth;
    canvasRef.current.height = videoRef.current.videoHeight;
    ctx?.drawImage(videoRef.current, 0, 0);

    canvasRef.current.toBlob(async (blob) => {
      if (!blob) return;

      // Generate unique filename for the image (teeth-<timestamp>.jpg)
      const filename = `teeth-${Date.now()}.jpg`;
      
      // Upload the captured image directly to Firebase Storage
      const storageRef = ref(storage, `uploads/${filename}`); // Store with unique filename
      const uploadTask = uploadBytesResumable(storageRef, blob);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Monitor upload progress if needed
        },
        (error: unknown) => {
          if (error instanceof Error) {
            console.error("Upload error:", error.message);
          } else {
            console.error("Unknown upload error");
          }
        },
        () => {
          console.log("Upload successful");

          // Fetch the download URL using getDownloadURL from the modular SDK
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL: string) => {
            setEnhancedImage(downloadURL); // Set the uploaded image URL
          }).catch((error) => {
            console.error("Error getting download URL:", error);
          });
        }
      );
    }, "image/jpeg");
  };

  const handleImageViewed = () => setViewed(true);

  return (
    <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-md w-full">
      {!user ? (
        <p className="text-red-600">Please log in to take a photo.</p>
      ) : (
        <>
          {!enhancedImage && (
            <>
              <div className="relative w-full max-w-md aspect-[3/4] rounded-xl overflow-hidden border border-gray-300 shadow-md">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
                {/* ✅ Overlay Framing Guide with Image */}
                <div className="absolute inset-x-0 top-[0%] flex items-center justify-center pointer-events-none">
                  <img
                    src="silhouette.png" // Ensure the correct path to your silhouette image
                    alt="Silhouette Overlay"
                  />
                </div>
              </div>

              <p className="text-xs text-center text-gray-500 mt-3">
                Align your face within the guide. Stand 3 feet away.
              </p>

              <button
                onClick={captureAndProcess}
                className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition"
                disabled={loading}
              >
                {loading ? "Processing..." : "Capture & Enhance"}
              </button>

              <canvas ref={canvasRef} className="hidden" />
            </>
          )}

          {enhancedImage && !viewed && (
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 mb-2">This smile will disappear in 10 minutes.</p>
              <img
                src={enhancedImage}
                alt="Enhanced Smile"
                className="max-w-full rounded border"
                onLoad={handleImageViewed}
              />
              <button
                className="mt-4 text-sm text-red-500 underline"
                onClick={() => setEnhancedImage(null)}
              >
                Delete now
              </button>
            </div>
          )}

          {viewed && (
            <p className="text-gray-500 mt-4 text-sm">
              You’ve already viewed this smile. Please take another one.
            </p>
          )}
        </>
      )}
    </div>
  );
}
