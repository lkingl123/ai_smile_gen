'use client';

import { useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig"; // Firebase Storage instance

export default function PhotoUpload() {
  const [image, setImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true); // Start loading state

    try {
      const storageRef = ref(storage, `uploads/${file.name}`); // Firebase Storage reference
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        null,
        (error) => {
          console.error("Upload error:", error);
          setLoading(false);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setImage(downloadURL); // Save uploaded image URL
          simulateProcessing(downloadURL); // Simulate processing for now
        }
      );
    } catch (error) {
      console.error("Upload failed:", error);
      setLoading(false);
    }
  };

  // Simulate processing the uploaded image
  const simulateProcessing = (uploadedImageUrl: string) => {
    setTimeout(() => {
      setResultImage(uploadedImageUrl); // Simulate result with the uploaded image itself
      setLoading(false); // Stop loading state
    }, 3000); // Simulate a delay for processing
  };

  return (
    <div className="flex flex-col items-center">
      <label
        htmlFor="photo-upload"
        className="cursor-pointer bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        {loading ? "Uploading..." : "Choose File"}
      </label>
      <input
        id="photo-upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
        disabled={loading}
      />

      {/* Spinner for loading state */}
      {loading && (
        <div className="mt-6 flex justify-center items-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Uploaded Image Preview */}
      {image && !loading && (
        <div className="mt-6">
          <p className="text-center text-gray-600 mb-2">Uploaded Photo:</p>
          <div className="flex justify-center items-center border border-gray-300 p-4 rounded-lg shadow-md">
            <img
              src={image}
              alt="Uploaded Preview"
              className="max-w-full max-h-64 object-contain"
            />
          </div>
        </div>
      )}

      {/* Simulated Result Image */}
      {resultImage && (
        <div className="mt-6">
          <p className="text-center text-gray-600 mb-2">Your Perfect Smile:</p>
          <div className="flex justify-center items-center border border-gray-300 p-4 rounded-lg shadow-md">
            <img
              src={resultImage}
              alt="Result Preview"
              className="max-w-full max-h-64 object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
