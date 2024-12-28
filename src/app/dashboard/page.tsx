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

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center p-6">
      {/* Header Section */}
      <h1 className="text-4xl font-bold text-gray-800 mb-8">
        Welcome to Your Dashboard
      </h1>

      <p className="text-lg text-gray-600 mb-12">
        Upload your photo to visualize your perfect smile!
      </p>

      {/* Photo Upload Component */}
      <section className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Upload Photo
        </h2>
        <PhotoUpload />
      </section>
    </main>
  );
}
