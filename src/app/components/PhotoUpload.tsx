'use client';

import { useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebaseConfig";
import { FaCloudUploadAlt } from "react-icons/fa";

export default function PhotoUpload() {
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setLoading(true);

    try {
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
            console.log("Download URL:", downloadURL); // Debug
            setImage(downloadURL);
            setLoading(false);
          } catch (err) {
            console.error("Error fetching download URL:", err);
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
      <p className="text-gray-600 mb-6 text-center">
        Choose an image to visualize your perfect smile. Supported formats: JPG, PNG.
      </p>

      {/* File Upload Button */}
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

      {/* Loading Spinner */}
      {loading && (
        <div className="mt-6 flex justify-center items-center">
          <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Uploaded Image Preview */}
      {image && (
        <div className="mt-6">
          <p className="text-center text-gray-600 mb-2">Uploaded Photo:</p>
          <div className="flex justify-center items-center border border-gray-300 p-4 rounded-lg shadow-lg bg-white">
            <img
              src={image}
              alt="Uploaded Preview"
              className="max-w-full max-h-64 object-contain rounded"
            />
          </div>
        </div>
      )}
    </div>
  );
}
