'use client';

import React, { useState, useEffect } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig'; // Adjust path as needed
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function Footer() {
    return (
      <footer className="w-full py-6 bg-gray-100 text-center text-sm text-gray-600 border-t-2 border-gray-300">
        &copy; 2023 AI Smile. All Rights Reserved. Designed, Built & Maintained by DIG
      </footer>
    );
  }

function SignUpPageContent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );

  const router = useRouter();

  const handleAuth = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();

    if (password !== confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match!' });
      return;
    }

    try {
      setMessage(null);
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage({ type: 'success', text: 'Account created successfully! Redirecting...' });
      setTimeout(() => router.push('/auth/signin'), 2000);
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

        {/* Right Section with Sign Up Form */}
        <div className="flex-1 bg-white flex flex-col justify-center items-center bg-gray-50 pb-12">
          <div className="w-full max-w-md p-8 rounded-md">
            <div className="flex flex-col items-center mb-6">
              <img
                src="/logo.png" // Replace with your logo path
                alt="Logo"
                className="w-24 h-24 mb-2"
              />
              <h1 className="text-2xl font-bold text-black">Create an Account!</h1>
              <p className="text-sm text-black mt-2">Sign up to get started</p>
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
              <label className="text-sm text-black block" style={{ marginBottom: '-8px' }}>Create a Password</label>
              <input
                type="password"
                placeholder="Create a Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <label className="text-sm text-black block" style={{ marginBottom: '-8px' }}>Confirm Your Password</label>
              <input
                type="password"
                placeholder="Confirm Your Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                style={{ backgroundColor: '#0000FF' }}
                className="w-full text-white py-3 rounded-full hover:opacity-70 transition"
              >
                Sign Up
              </button>
            </form>
            <p className="text-center text-black text-sm mt-4">
              Already have an account?{' '}
              <Link href="/auth/signin" className="text-blue-600 hover:underline">
                Login Here!
              </Link>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}

export default function SignUpPage() {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <SignUpPageContent />
    </React.Suspense>
  );
}
