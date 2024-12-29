"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function SpinnerWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false); // Start without loading
  const pathname = usePathname(); // Tracks path changes

  useEffect(() => {
    setLoading(true); // Trigger spinner on navigation
    const timeout = setTimeout(() => {
      setLoading(false); // Simulated loading duration
    }, 1000);
    return () => clearTimeout(timeout); // Cleanup timeout
  }, [pathname]); // Re-run effect on route change

  if (loading) {
    // Show spinner only when loading
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

  return <>{children}</>;
}
