'use client';

import { useState, useEffect, Suspense } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useRouter, useSearchParams } from "next/navigation";

function SignInPageContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm password field
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  // Check query parameter to toggle Sign Up mode
  useEffect(() => {
    const signupParam = searchParams.get("signup");
    setIsSignUp(signupParam === "true");
  }, [searchParams]);

  const handleAuth = async () => {
    try {
      setMessage(null); // Clear any previous messages

      if (isSignUp) {
        // Sign Up Logic
        if (password !== confirmPassword) {
          setMessage({ type: "error", text: "Passwords do not match!" });
          return;
        }
        await createUserWithEmailAndPassword(auth, email, password);
        setMessage({ type: "success", text: "User created successfully! Redirecting..." });
        setTimeout(() => router.push("/auth/signin"), 2000); // Redirect to Sign In after 2 seconds
      } else {
        // Sign In Logic
        await signInWithEmailAndPassword(auth, email, password);
        setMessage({ type: "success", text: "Logged in successfully! Redirecting..." });
        setTimeout(() => router.push("/dashboard"), 2000); // Redirect to the dashboard after 2 seconds
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessage({ type: "error", text: error.message });
      } else {
        setMessage({ type: "error", text: "An unexpected error occurred." });
      }
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {isSignUp ? "Create an Account" : "Sign In to Your Account"}
        </h1>

        <div className="flex flex-col space-y-4">
          {/* Email Input */}
          <input
            type="email"
            placeholder={isSignUp ? "Enter your email" : "Email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder={isSignUp ? "Create a password" : "Password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Confirm Password Input (Only for Sign Up) */}
          {isSignUp && (
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          {/* Auth Button */}
          <button
            onClick={handleAuth}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>

          {/* Toggle Sign In / Sign Up */}
          <button
            onClick={() => {
              setIsSignUp(!isSignUp);
              setMessage(null); // Clear message when toggling
            }}
            className="text-blue-600 underline text-sm text-center"
          >
            {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
          </button>
        </div>

        {/* Message Box */}
        {message && (
          <div
            className={`mt-4 px-4 py-2 rounded-lg shadow-md text-white text-center ${
              message.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {message.text}
          </div>
        )}
      </div>
    </main>
  );
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInPageContent />
    </Suspense>
  );
}
