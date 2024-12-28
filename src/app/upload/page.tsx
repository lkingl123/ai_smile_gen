'use client';

import ProtectedRoute from '../components/ProtectedRoute';
import PhotoUpload from '../components/PhotoUpload';

export default function UploadPage() {
  return (
    <ProtectedRoute>
      <main className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <h1 className="text-4xl font-bold text-gray-800 mt-12 mb-6">Upload Your Photo</h1>
        <PhotoUpload />
      </main>
    </ProtectedRoute>
  );
}
