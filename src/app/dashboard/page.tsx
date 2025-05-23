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
<main className="fixed inset-0 overflow-hidden bg-blue-50 flex items-start justify-center px-4 pt-8">
      <section className="w-full max-w-md lg:pb-20 bg-white border border-gray-200 rounded-lg p-4 sm:p-6 pb-20 shadow-lg">
          <div className="relative mb-4 flex items-center justify-center">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 text-center w-full">
              SMILE! 😁
            </h2>
            <button
              onClick={handleSignOut}
              className="absolute right-0 bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
            >
              ❌
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
