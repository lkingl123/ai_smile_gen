'use client';

import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useRouter } from "next/navigation";
import Header from "../../components/Header";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Confirm password field
  const [isSignIn, setIsSignIn] = useState(false); // Toggle for Sign In
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleAuth = async () => {
    try {
      setErrorMessage(""); // Clear any previous error messages

      if (isSignIn) {
        // Sign In Logic
        await signInWithEmailAndPassword(auth, email, password);
        alert("Logged in successfully!");
        router.push("/dashboard"); // Redirect to the dashboard
      } else {
        // Sign Up Logic
        if (password !== confirmPassword) {
          setErrorMessage("Passwords do not match!");
          return;
        }
        await createUserWithEmailAndPassword(auth, email, password);
        alert("User created successfully!");
        router.push("/auth/signin"); // Redirect to Sign In after successful Sign Up
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message); // Display the error message
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {isSignIn ? "Sign In to Your Account" : "Create an Account"}
        </h1>

        <div className="flex flex-col space-y-4">
          {/* Email Input */}
          <input
            type="email"
            placeholder={isSignIn ? "Email" : "Enter your email"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder={isSignIn ? "Password" : "Create a password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Confirm Password Input (Only for Sign Up) */}
          {!isSignIn && (
            <input
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
          )}

          {/* Auth Button */}
          <button
            onClick={handleAuth}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            {isSignIn ? "Sign In" : "Sign Up"}
          </button>

          {/* Toggle Sign In / Sign Up */}
          <button
            onClick={() => {
              setIsSignIn(!isSignIn);
              setErrorMessage(""); // Clear error message when toggling
            }}
            className="text-blue-600 underline text-sm text-center"
          >
            {isSignIn ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
          </button>
        </div>
      </div>
    </main>
  );
}
