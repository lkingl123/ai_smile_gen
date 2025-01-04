"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFirebaseAuth } from "../context/FirebaseAuthContext";
import ProtectedRoute from "../components/ProtectedRoute";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { AiOutlineLoading3Quarters, AiOutlineDelete } from "react-icons/ai"; // Import spinner and delete icons

function Footer() {
  return (
    <footer className="w-full py-6 bg-gray-100 text-center text-sm text-gray-600 border-t-2 border-gray-300">
      &copy; 2023 AI Smile. All Rights Reserved. Designed, Built & Maintained by
      DIG
    </footer>
  );
}

export default function DashboardPage() {
  const { user, signOut } = useFirebaseAuth();
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null); // Explicit type for file
  const [isProcessing, setIsProcessing] = useState(false); // Track processing state

  const handleSignOut = async () => {
    await signOut(); // Sign out the user
    router.replace("/auth/signin"); // Redirect to the sign-in page after sign-out
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0]; // Optional chaining for safety
    if (uploadedFile) {
      setFile(uploadedFile);
      console.log("File selected:", uploadedFile.name);
    }
  };

  const handleFileRemove = () => {
    setFile(null);
    console.log("File removed");
  };

  const handleFileUpload = () => {
    if (file) {
      setIsProcessing(true); // Show processing UI

      // Simulate file upload
      setTimeout(() => {
        alert(`File "${file.name}" uploaded successfully!`);
        setFile(null); // Reset file input after upload
        setIsProcessing(false); // Hide processing UI
      }, 3000); // Simulated delay of 3 seconds
    } else {
      alert("No file selected!");
    }
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-blue-50 flex flex-col items-center justify-between">
        {/* Instruction Section */}
        {isProcessing ? (
          <section className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg flex flex-col items-center justify-center relative mt-20 mb-8">
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
              Processing...
            </h2>
            <AiOutlineLoading3Quarters
              className="text-blue-500 animate-spin"
              size={64}
            />
            <p className="text-sm text-gray-600 font-semibold text-center mt-4">
              This will just take a moment!
            </p>
          </section>
        ) : (
          <section className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg relative mt-20 mb-8">
            <div className="absolute top-0 right-0">
              <button
                onClick={handleSignOut}
                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition mt-4 mr-4"
              >
                Sign Out
              </button>
            </div>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
              Upload
            </h2>
            <p className="text-sm text-gray-600 font-semibold text-center mb-6">
              When taking a picture of the patient, please follow the
              recommended guidelines:
            </p>
            <ol className="text-sm text-gray-600 space-y-2 mb-6 list-decimal list-inside">
              <li>Take photo on a light background.</li>
              <li>
                Center the patient's head in the middle of the camera. Avoid
                tilt.
              </li>
              <li>Have the patient smile wide to capture all teeth.</li>
            </ol>

            {/* File Upload Component */}
            <div
              className="border-2 border-dashed border-gray-300 rounded-lg p-20 text-center bg-purple-50"
              onDragOver={(e) => e.preventDefault()} // Allow drop by preventing default behavior
              onDrop={(e) => {
                e.preventDefault(); // Prevent the default drop behavior
                const droppedFile = e.dataTransfer.files[0]; // Get the first dropped file
                if (droppedFile) {
                  setFile(droppedFile); // Update the state with the dropped file
                  console.log("File dropped:", droppedFile.name);
                }
              }}
            >
              <div className="flex flex-col items-center">
                <div className="mb-4">
                  <AiOutlineCloudUpload className="text-blue-500" size={64} />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="text-sm text-gray-500 mt-4 font-bold cursor-pointer"
                >
                  Drag & drop files or{" "}
                  <span className="text-blue-600 underline">Browse</span>
                </label>
                <p className="text-xs text-gray-400 mt-2">
                  Supported formats: JPEG, PNG
                </p>
              </div>
            </div>
            {/* Uploaded File Display */}
            {file && (
              <div className="mt-6 w-full max-w-lg">
                <p className="text-sm font-bold text-green-600 mb-2">
                  Uploaded
                </p>
                <div className="border-2 border-green-500 rounded-lg p-4 bg-white">
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 flex-grow truncate">
                      {file.name}
                    </span>
                    <button
                      onClick={handleFileRemove}
                      className="text-red-500 hover:text-red-700"
                    >
                      <AiOutlineDelete size={20} />
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* Upload Button */}
            <div className="mt-6 flex justify-center">
              <button
                type="button"
                onClick={handleFileUpload}
                style={{ backgroundColor: "#0000FF" }}
                className="w-full text-white py-3 rounded hover:opacity-70 transition"
              >
                UPLOAD FILE
              </button>
            </div>
          </section>
        )}

        {/* Footer */}
        <Footer />
      </main>
    </ProtectedRoute>
  );
}
