'use client';

import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig'; // Adjust path as needed
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { FaHome } from 'react-icons/fa';

function SignInPageContent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // Confirm password field
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );

  const router = useRouter();
  const searchParams = useSearchParams();

  // Check query parameter to toggle Sign Up mode
  useEffect(() => {
    const signupParam = searchParams.get('signup');
    setIsSignUp(signupParam === 'true');
  }, [searchParams]);

  const handleAuth = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault(); // Prevent form submission refresh

    try {
      setMessage(null); // Clear any previous messages

      if (isSignUp) {
        // Sign Up Logic
        if (password !== confirmPassword) {
          setMessage({ type: 'error', text: 'Passwords do not match!' });
          return;
        }
        await createUserWithEmailAndPassword(auth, email, password);
        setMessage({ type: 'success', text: 'User created successfully! Redirecting...' });
        setTimeout(() => router.push('/auth/signin'), 2000); // Redirect to Sign In after 2 seconds
      } else {
        // Sign In Logic
        await signInWithEmailAndPassword(auth, email, password);
        setMessage({ type: 'success', text: 'Logged in successfully! Redirecting...' });
        setTimeout(() => router.push('/dashboard'), 2000); // Redirect to the dashboard after 2 seconds
      }
    } catch (error) {
      if (error instanceof Error) {
        setMessage({ type: 'error', text: error.message });
      } else {
        setMessage({ type: 'error', text: 'An unexpected error occurred.' });
      }
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={isSignUp ? 'signUp' : 'signIn'}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
              {isSignUp ? 'Create an Account' : 'Sign In to Your Account'}
            </h1>

            {/* Wrap inputs and button in a form */}
            <form className="flex flex-col space-y-4" onSubmit={handleAuth}>
              {/* Email Input */}
              <input
                type="email"
                placeholder={isSignUp ? 'Enter your email' : 'Email'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {/* Password Input */}
              <input
                type="password"
                placeholder={isSignUp ? 'Create a password' : 'Password'}
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
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
              >
                {isSignUp ? 'Sign Up' : 'Sign In'}
              </button>
            </form>
          </motion.div>
        </AnimatePresence>

        {/* Toggle Switch for Sign In/Sign Up */}
        <div className="flex items-center justify-center gap-4 mt-6">
          <span className="text-gray-700">{isSignUp ? 'Sign Up' : 'Sign In'}</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isSignUp}
              onChange={() => setIsSignUp(!isSignUp)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-blue-600 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-500 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600"></div>
          </label>
        </div>

        {/* Return to Home Button */}
        <div className="flex justify-center mt-6">
          <Link
            href="/"
            className="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg transition duration-300"
          >
            <FaHome size={24} />
          </Link>
        </div>

        {/* Message Box */}
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className={`mt-4 px-4 py-2 rounded-lg shadow-md text-white text-center ${
              message.type === 'success' ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {message.text}
          </motion.div>
        )}
      </div>
    </main>
  );
}

export default function SignInPage() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <SignInPageContent />
    </React.Suspense>
  );
}
