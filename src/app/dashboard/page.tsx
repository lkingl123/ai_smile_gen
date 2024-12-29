// 'use client';

// import { useFirebaseAuth } from "../context/FirebaseAuthContext";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// export default function DashboardPage() {
//   const { user, loading } = useFirebaseAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!loading && !user) {
//       router.push("/auth/signin"); // Redirect to sign-in page if not authenticated
//     }
//   }, [user, loading, router]);

//   if (loading) {
//     return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
//   }

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center">
//       <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to Your Dashboard</h1>
//       <p className="text-gray-600">You are successfully signed in as {user?.email}</p>
//     </main>
//   );
// }


'use client';

import PhotoUpload from "../components/PhotoUpload";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  const handleSignOut = () => {
    // Clear any authentication state and redirect to the login page
    router.push("/");
  };

  return (
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
  );
}
