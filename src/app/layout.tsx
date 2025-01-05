import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FirebaseAuthProvider } from "./context/FirebaseAuthContext";
import SpinnerWrapper from "./components/SpinnerWrapper";

// Font imports
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Metadata
export const metadata: Metadata = {
  title: "Smile Generation Software - AI Smile Gen",
  description: "Visualize your perfect smile with our cutting-edge dental simulation tool.",
  keywords: "dental simulator, perfect teeth, smile preview, dental AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning // Suppresses hydration mismatch warning during development
      >
        {/* Wrap the application with AuthProvider */}
        <SpinnerWrapper><FirebaseAuthProvider>{children}</FirebaseAuthProvider></SpinnerWrapper>
      </body>
    </html>
  );
}
