'use client';

import { useRouter } from "next/navigation";
import { useFirebaseAuth } from "../context/FirebaseAuthContext";
import { useEffect } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useFirebaseAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      // Redirect to the sign-in page if user is not authenticated
      router.replace("/auth/signin");
    }
  }, [user, loading, router]);

  if (loading) {
    // Show a loading spinner or placeholder while checking authentication state
    return <div>Loading...</div>;
  }

  if (!user) {
    // Prevent rendering protected content when user is not authenticated
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
