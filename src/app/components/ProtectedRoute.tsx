'use client';

import { useRouter, usePathname } from "next/navigation";
import { useFirebaseAuth } from "../context/FirebaseAuthContext";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading: authLoading } = useFirebaseAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [navLoading, setNavLoading] = useState(false); // For navigation loading

  // Handle navigation loading
  useEffect(() => {
    setNavLoading(true); // Trigger spinner on navigation
    const timeout = setTimeout(() => {
      setNavLoading(false); // Simulated loading duration
    }, 1000);
    return () => clearTimeout(timeout); // Cleanup timeout
  }, [pathname]);

  useEffect(() => {
    if (!authLoading && !user) {
      // Redirect to the sign-in page if user is not authenticated
      router.replace("/auth/signin");
    }
  }, [user, authLoading, router]);

  if (authLoading || navLoading) {
    // Show spinner during authentication or navigation loading
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-teal-50 to-blue-100 z-50 flex items-center justify-center">
        <div className="loader">
          <div className="dot teal"></div>
          <div className="dot blue"></div>
          <div className="dot white"></div>
        </div>
        <style jsx>{`
          .loader {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.5rem;
          }
          .dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            animation: bounce 1.5s infinite ease-in-out;
          }
          .teal {
            background-color: #38b2ac; /* Tailwind Teal 400 */
          }
          .blue {
            background-color: #4299e1; /* Tailwind Blue 400 */
            animation-delay: 0.3s;
          }
          .white {
            background-color: #ffffff; /* White */
            animation-delay: 0.6s;
          }

          @keyframes bounce {
            0%,
            80%,
            100% {
              transform: scale(0);
            }
            40% {
              transform: scale(1);
            }
          }
        `}</style>
      </div>
    );
  }

  if (!user) {
    // Prevent rendering protected content when user is not authenticated
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
