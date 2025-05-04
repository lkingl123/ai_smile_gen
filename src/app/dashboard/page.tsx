import { useRouter } from "next/navigation";
import { useFirebaseAuth } from "../context/FirebaseAuthContext";
import ProtectedRoute from "../components/ProtectedRoute";
import SmileCam from "../components/SmileCam";

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
        <section className="w-full max-w-lg p-6 border border-gray-200 rounded-lg bg-white mt-20 mb-8 relative">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Snap a Smile</h2>
            <button
              onClick={handleSignOut}
              className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-600 transition"
            >
              Sign Out
            </button>
          </div>

          <p className="text-sm text-gray-600 font-semibold text-center mb-4">
            Make sure the face is centered and smiling clearly in the frame.
          </p>

          <SmileCam />
        </section>
        <Footer />
      </main>
    </ProtectedRoute>
  );
}
