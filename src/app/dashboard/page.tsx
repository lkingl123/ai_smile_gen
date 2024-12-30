'use client';

import PhotoUpload from "../components/PhotoUpload";
import { useRouter } from "next/navigation";
import { useFirebaseAuth } from "../context/FirebaseAuthContext";
import ProtectedRoute from "../components/ProtectedRoute";

export default function DashboardPage() {
  const { user, signOut } = useFirebaseAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut(); // Sign out the user
    router.replace("/auth/signin"); // Redirect to the sign-in page after sign-out
  };

  return (
    <ProtectedRoute> {/* Wrap with ProtectedRoute */}
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center p-6">
        {/* Header Section */}
        <div className="w-full max-w-3xl flex items-center justify-center relative mb-8">
          <h1 className="text-4xl font-bold text-gray-800 text-center">
            Welcome to Your Dashboard
          </h1>
          <button
            onClick={handleSignOut}
            className="absolute right-0 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
          >
            Sign Out
          </button>
        </div>

        <p className="text-lg text-gray-600 mb-12">
          Upload your photo to visualize your perfect smile!
        </p>

        {/* Photo Upload Component */}
        <section className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
          <PhotoUpload />
        </section>
      </main>
    </ProtectedRoute>
  );
}
