'use client';

import { useState } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

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
      <motion.div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={isSignIn ? "signIn" : "signUp"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
          >
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
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Toggle Switch for Sign In/Sign Up */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <span className="text-gray-700">{isSignIn ? "Sign In" : "Sign Up"}</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isSignIn}
              onChange={() => setIsSignIn(!isSignIn)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-blue-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"></div>
          </label>
        </div>

        {/* Return to Home Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => router.push("/")}
            className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg transition duration-300"
          >
            <FaHome size={24} />
          </button>
        </div>
      </motion.div>
    </main>
  );
}
