'use client';

import { useRouter, usePathname } from "next/navigation";
import { useFirebaseAuth } from "../context/FirebaseAuthContext";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading: authLoading } = useFirebaseAuth();
  const router = useRouter();
  const pathname = usePathname();

  const [navLoading, setNavLoading] = useState(false);

  // Trigger navigation spinner
  useEffect(() => {
    setNavLoading(true);
    const timeout = setTimeout(() => {
      setNavLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [pathname]);

  // Redirect unauthenticated or unverified users
  useEffect(() => {
    if (!authLoading && (!user || !user.emailVerified)) {
      router.replace("/auth/signin");
    }
  }, [user, authLoading, router]);

  if (authLoading || navLoading) {
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
            background-color: #38b2ac;
          }
          .blue {
            background-color: #4299e1;
            animation-delay: 0.3s;
          }
          .white {
            background-color: #ffffff;
            animation-delay: 0.6s;
          }
          @keyframes bounce {
            0%, 80%, 100% {
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

  if (!user || !user.emailVerified) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
