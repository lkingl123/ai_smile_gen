'use client';

import { useFirebaseAuth } from "../context/FirebaseAuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import PhotoUpload from "../components/PhotoUpload";

export default function UploadPage() {
  const { user, loading } = useFirebaseAuth();
  const router = useRouter();

  // Redirect unauthenticated users to sign-in page
  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/signin");
    }
  }, [user, loading, router]);

  // Render the upload page for authenticated users
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-gray-800 mt-12 mb-6">Upload Your Photo</h1>
      <PhotoUpload />
    </main>
  );
}
