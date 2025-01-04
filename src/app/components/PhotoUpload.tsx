import { useEffect, useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { auth, storage } from "../firebaseConfig";
import { onAuthStateChanged, getIdToken } from "firebase/auth";
import { FaCloudUploadAlt } from "react-icons/fa";

export default function PhotoUpload() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  // Monitor authentication state
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

    return () => unsubscribe(); // Cleanup on unmount
  }, []);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!authToken) {
      alert("Please log in to upload photos.");
      return;
    }

    setLoading(true);

    try {
      // Step 1: Upload original image to Firebase Storage
      const storageRef = ref(storage, `uploads/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.error("Upload error:", error);
          setLoading(false);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("Download URL:", downloadURL);
            setOriginalImage(downloadURL);

            // Step 2: Send the uploaded image URL to the backend for enhancement
            const response = await fetch("/api/process-image", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
              },
              body: JSON.stringify({ imageUrl: downloadURL }),
            });

            if (response.ok) {
              const { enhancedImageUrl } = await response.json();
              setEnhancedImage(enhancedImageUrl);
            } else {
              const errorResponse = await response.json();
              console.error("Backend Error:", errorResponse);
              alert("Failed to enhance the image.");
            }
          } catch (err) {
            console.error("Error during upload or enhancement:", err);
          } finally {
            setLoading(false);
          }
        }
      );
    } catch (error) {
      console.error("Upload failed:", error);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Upload Your Photo</h2>
      {user ? (
        <>
          <p className="text-gray-600 mb-6 text-center">
            Choose an image to visualize your perfect smile. Supported formats: JPG, PNG.
          </p>
          <label
            htmlFor="photo-upload"
            className="cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 flex items-center space-x-2"
          >
            <FaCloudUploadAlt size={20} />
            <span>{loading ? "Uploading..." : "Choose File"}</span>
          </label>
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
            disabled={loading}
          />
          {loading && (
            <div className="mt-6 flex justify-center items-center">
              <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
          {originalImage && (
            <div className="mt-6 flex justify-center items-center space-x-6">
              <div className="flex flex-col items-center">
                <p className="text-center text-gray-600 mb-2">Original Photo:</p>
                <img
                  src={originalImage}
                  alt="Original"
                  className="max-w-full max-h-64 object-contain rounded border"
                />
              </div>
              {enhancedImage && (
                <div className="flex flex-col items-center">
                  <p className="text-center text-gray-600 mb-2">Enhanced Photo:</p>
                  <img
                    src={enhancedImage}
                    alt="Enhanced"
                    className="max-w-full max-h-64 object-contain rounded border"
                  />
                </div>
              )}
            </div>
          )}
        </>
      ) : (
        <p className="text-red-600 text-center">Please log in to upload photos.</p>
      )}
    </div>
  );
}
