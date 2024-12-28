'use client';

import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/signin'); // Redirect to sign-in page
    }
  }, [isAuthenticated, router]);

  return isAuthenticated ? <>{children}</> : null;
}
