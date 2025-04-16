"use client";

import { useRouter } from "next/navigation";
import { useFirebaseAuth } from "../context/FirebaseAuthContext";
import ProtectedRoute from "../components/ProtectedRoute";
import SmileCam from "../components/SmileCam";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

function Footer() {
  return (
    <footer className="w-full py-6 bg-gray-100 text-center text-sm text-gray-600 border-t-2 border-gray-300">
      &copy; 2023 AI Smile. All Rights Reserved. Designed, Built & Maintained by DIG
    </footer>
  );
}

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
            Snap a Smile
          </h2>
          <p className="text-sm text-gray-600 font-semibold text-center mb-6">
            Make sure the patient's face is centered and smiling clearly in the frame.
          </p>

          <SmileCam />
        </section>

        <Footer />
      </main>
    </ProtectedRoute>
  );
}
