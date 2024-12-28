"use client";
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
    }, 2000);
    return () => clearTimeout(timeout); // Cleanup timeout
  }, [pathname]); // Re-run effect on route change

  if (loading) {
    // Show spinner only when loading
    return (
      <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
        <div className="loader">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
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
            background-color: #FF5500;
            animation: bounce 1.5s infinite ease-in-out;
          }

          .dot:nth-child(2) {
            animation-delay: 0.3s;
          }

          .dot:nth-child(3) {
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

  return <>{children}</>;
}



// "use client";

// import { useState, useEffect } from "react";
// import { usePathname, useSearchParams } from "next/navigation";

// export default function SpinnerWrapper({ children }: { children: React.ReactNode }) {
//   const [loading, setLoading] = useState(true); // Start in loading state
//   const pathname = usePathname(); // Tracks path changes
//   const searchParams = useSearchParams(); // Tracks query param changes

//   useEffect(() => {
//     setLoading(true); // Trigger spinner on navigation
//     const timeout = setTimeout(() => {
//       setLoading(false); // Simulated loading duration
//     }, 2000);

//     return () => clearTimeout(timeout); // Cleanup timeout
//   }, [pathname, searchParams]); // Re-run effect on route change

//   if (loading) {
//     // Show spinner only when loading
//     return (
//       <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
//         <div className="loader">
//           <div className="dot"></div>
//           <div className="dot"></div>
//           <div className="dot"></div>
//         </div>
//         <style jsx>{`
//         .loader {
//             width: 50px;
//             height: 50px;
//             background-color: #2F6690;
//             animation: spinPlane 1.2s infinite ease-in-out;
//         }

//         @keyframes spinPlane {
//             0%, 100% {
//             transform: perspective(120px) rotateX(0deg) rotateY(0deg);
//             }
//             50% {
//             transform: perspective(120px) rotateX(180deg) rotateY(0deg);
//             }
//         }
//         `}</style>
//       </div>
//     );
//   }

//   return <>{children}</>;
// }
