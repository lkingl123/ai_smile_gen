'use client';

import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig'; // Adjust path as needed
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

function Footer() {
    return (
      <footer className="w-full py-6 bg-gray-100 text-center text-sm text-gray-600 border-t-2 border-gray-300">
        &copy; 2023 AI Smile. All Rights Reserved. Designed, Built & Maintained by DIG
      </footer>
    );
  }

function SignInPageContent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );

  const router = useRouter();

  const handleAuth = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();

    try {
      setMessage(null);
      await signInWithEmailAndPassword(auth, email, password);
      setMessage({ type: 'success', text: 'Logged in successfully! Redirecting...' });
      setTimeout(() => router.push('/dashboard'), 2000);
    } catch (error) {
      if (error instanceof Error) {
        setMessage({ type: 'error', text: error.message });
      } else {
        setMessage({ type: 'error', text: 'An unexpected error occurred.' });
      }
    }
  };

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        {/* Left Section with Logo */}
        <div className="hidden md:flex w-1/2 bg-blue-100 items-center justify-center">
          <div className="text-center">
            <img
              src="/logo.png" // Replace with your logo path
              alt="Logo"
              className="w-96 h-96 mb-4"
            />
          </div>
        </div>

        {/* Right Section with Login Form */}
        <div className="flex-1 bg-white flex flex-col justify-center items-center bg-gray-50 pb-12">
          <div className="w-full max-w-md p-8 rounded-md">
            <div className="flex flex-col items-center mb-6">
              <img
                src="/logo.png" // Replace with your logo path
                alt="Logo"
                className="w-24 h-24 mb-2"
              />
              <h1 className="text-2xl font-bold text-black">Welcome Back!</h1>
              <p className="text-sm text-black mt-2">Login to your account</p>
              <div className="border-t border-gray-300 my-4 w-full -mb-2"></div>
            </div>
            <form className="space-y-4" onSubmit={handleAuth}>
            <label className="text-sm text-black block -mb-2">Enter Your Email</label>
              <input
                type="email"
                placeholder="Enter Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="text-sm text-black block" style={{ marginBottom: '-8px' }}>Enter Your Password</label>
              <input
                type="password"
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <div className="flex items-center justify-between text-sm text-black">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" /> Remember Me
                </label>
                <Link href="/recover-password" className="text-blue-600 hover:underline">
                  Recover Password
                </Link>
              </div>
              <button
                type="submit"
                style={{ backgroundColor: '#0000FF' }}
                className="w-full text-white py-3 rounded-full hover:opacity-70 transition"
              >
                Login
              </button>
            </form>
            <p className="text-center text-black text-sm mt-4">
              Don’t have an account?{' '}
              <Link href="/auth/signup" className="text-blue-600 hover:underline">
                Register Now!
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
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
