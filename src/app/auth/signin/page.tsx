'use client';

import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function SignInPageContent() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [inputErrors, setInputErrors] = useState({ email: false, password: false });
  const router = useRouter();

  useEffect(() => {
    const savedEmail = localStorage.getItem('rememberedEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleAuth = async (e?: React.FormEvent<HTMLFormElement>) => {
    if (e) e.preventDefault();

    let hasError = false;
    const newInputErrors = { email: false, password: false };

    if (!email) {
      newInputErrors.email = true;
      hasError = true;
    }
    if (!password) {
      newInputErrors.password = true;
      hasError = true;
    }

    setInputErrors(newInputErrors);

    if (hasError) {
      setMessage({ type: 'error', text: 'Please fill in all required fields.' });
      return;
    }

    try {
      setMessage(null);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        setMessage({
          type: 'error',
          text: 'Your email is not verified. A new verification link has been sent.',
        });
        await sendEmailVerification(user);
        await auth.signOut();
        return;
      }

      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      setMessage({ type: 'success', text: 'Successfully logged in! Redirecting...' });
      setTimeout(() => router.push('/dashboard'), 2000);
    } catch (error: any) {
      console.error("🔥 Auth Error:", error);

      const firebaseCode = error?.code || '';
      const errorMessages: Record<string, string> = {
        'auth/user-not-found': 'No account found with this email address.',
        'auth/wrong-password': 'Incorrect password. Please try again.',
        'auth/invalid-email': 'Invalid email address. Please enter a valid email.',
        'auth/too-many-requests': 'Too many attempts. Try again later or reset your password.',
        'auth/network-request-failed': 'Network error. Check your connection and try again.',
        'auth/invalid-credential': 'No account found or password is incorrect.', 
      };
      

      const fallback = 'An error occurred. Please double-check your email and password.';
      const errorMessage = errorMessages[firebaseCode] || fallback;

      setMessage({ type: 'error', text: errorMessage });
    }
  };

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        {/* Left Section with Logo */}
        <div className="hidden md:flex w-1/2 bg-blue-100 items-center justify-center">
          <div className="text-center">
            <img src="/logo.png" alt="Logo" className="w-96 h-96 mb-4" />
          </div>
        </div>

        {/* Right Section with Login Form */}
        <div className="flex-1 bg-white flex flex-col justify-center items-center bg-gray-50 pb-12">
          <div className="w-full max-w-md p-8 rounded-md">
            <div className="flex flex-col items-center mb-6">
              <img src="/logo.png" alt="Logo" className="w-24 h-24 mb-2" />
              <h1 className="text-2xl font-bold text-black">Welcome Back!</h1>
              <p className="text-sm text-black mt-2">Login to your account</p>
              <div className="border-t border-gray-300 my-4 w-full -mb-2"></div>
            </div>

            <form className="space-y-4" onSubmit={handleAuth}>
              <div>
                <label className="text-sm text-black block mb-1">Enter Your Email</label>
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    inputErrors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {inputErrors.email && (
                  <p className="text-xs text-red-500 mt-1">Email is required.</p>
                )}
              </div>

              <div>
                <label className="text-sm text-black block mb-1">Enter Your Password</label>
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    inputErrors.password ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {inputErrors.password && (
                  <p className="text-xs text-red-500 mt-1">Password is required.</p>
                )}
              </div>

              <div className="flex items-center justify-between text-sm text-black">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    className="mr-2"
                  />
                  Remember Me
                </label>
                <Link href="/recover-password" className="text-blue-600 hover:underline">
                  Recover Password
                </Link>
              </div>

              <button
                type="submit"
                className="bg-blue-dark w-full text-white py-3 rounded-full hover:opacity-70 transition"
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

            {message && (
              <div
                className={`mt-4 text-sm font-semibold text-center ${
                  message.type === 'success' ? 'text-green-500' : 'text-red-500'
                }`}
              >
                {message.text}
              </div>
            )}
          </div>
        </div>
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
