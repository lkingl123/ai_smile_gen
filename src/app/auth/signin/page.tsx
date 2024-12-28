'use client';

import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { login } = useAuth(); // Custom auth context
  const router = useRouter();

  const handleAuth = async () => {
    try {
      setErrorMessage(""); // Clear any previous error messages

      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
        alert("User created successfully!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Logged in successfully!");
        login(); // Update custom auth context
        router.push('/dashboard'); // Redirect to the dashboard
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
          {isSignUp ? "Create an Account" : "Sign In to Your Account"}
        </h1>

        <div className="flex flex-col space-y-4">
          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Error Message */}
          {errorMessage && (
            <p className="text-red-500 text-sm text-center">{errorMessage}</p>
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
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-600 underline text-sm text-center"
          >
            {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </main>
  );
}
