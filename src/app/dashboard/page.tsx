'use client';

import ProtectedRoute from '../components/ProtectedRoute';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

export default function DashboardPage() {
  const { logout } = useAuth();

  return (
    <ProtectedRoute>
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Welcome to Your Dashboard</h1>
        <Link
          href="/upload"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition mb-4"
        >
          Upload Photo
        </Link>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </main>
    </ProtectedRoute>
  );
}
