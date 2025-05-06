'use client';

import React, { useEffect, useState } from 'react';
import { auth } from '../../firebaseConfig';
import { useRouter } from 'next/navigation';
import { sendEmailVerification, reload } from 'firebase/auth';

export default function VerifyEmailPage() {
  const router = useRouter();
  const user = auth.currentUser;
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push('/auth/signin');
    }
  }, [user, router]);

  const handleResend = async () => {
    if (!user) return;
    try {
      await sendEmailVerification(user);
      setMessage({ type: 'success', text: 'Verification email resent! Please check your inbox.' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to resend verification email. Please try again.' });
    }
  };

  const handleCheckVerification = async () => {
    if (!user) return;
    setIsVerifying(true);
    try {
      await reload(user);
      if (user.emailVerified) {
        router.push('/dashboard');
      } else {
        setMessage({ type: 'error', text: 'Email not yet verified. Please check again.' });
      }
    } catch {
      setMessage({ type: 'error', text: 'Something went wrong. Please try again.' });
    } finally {
      setIsVerifying(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-md shadow-md text-center">
        <img src="/logo.png" alt="Logo" className="w-20 h-20 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-black">Verify Your Email</h1>
        <p className="text-sm text-gray-700 mt-2 mb-6">
          We've sent a verification email to <strong>{user?.email}</strong>. Please check your inbox and click the verification link.
        </p>

        <button
          onClick={handleResend}
          className="bg-blue-600 text-white py-2 px-6 rounded-full hover:opacity-80 transition mb-3"
        >
          Resend Email
        </button>

        <button
          onClick={handleCheckVerification}
          className="bg-green-600 text-white py-2 px-6 rounded-full hover:opacity-80 transition"
          disabled={isVerifying}
        >
          {isVerifying ? 'Checking...' : 'Continue'}
        </button>

        {message && (
          <p
            className={`mt-4 text-sm font-semibold ${
              message.type === 'success' ? 'text-green-500' : 'text-red-500'
            }`}
          >
            {message.text}
          </p>
        )}
      </div>
    </main>
  );
}
