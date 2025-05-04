"use client";

import { useRouter } from "next/navigation";
import { useFirebaseAuth } from "../context/FirebaseAuthContext";
import ProtectedRoute from "../components/ProtectedRoute";
import SmileCam from "../components/SmileCam";

export default function DashboardPage() {
  const { signOut } = useFirebaseAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.replace("/auth/signin");
  };

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-blue-50 flex flex-col items-center justify-between">
        <section className="w-full max-w-lg p-6 border border-gray-200 rounded-lg bg-white mt-20 mb-8 relative">
          <div className="relative mb-4 flex items-center justify-center">
            <h2 className="text-2xl font-bold text-gray-800 text-center w-full">
              Snap a Smile
            </h2>
            <button
              onClick={handleSignOut}
              className="absolute right-0 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
            >
              Sign Out
            </button>
          </div>

          <p className="text-sm text-gray-600 font-semibold text-center mb-4">
            Make sure the face is centered and smiling clearly in the frame.
          </p>

          <SmileCam />
        </section>
      </main>
    </ProtectedRoute>
  );
}
