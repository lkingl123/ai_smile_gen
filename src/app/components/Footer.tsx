'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full py-8 px-4 md:px-6 text-center text-gray-500 text-sm shadow-inner mt-16">
      <p>
        © 2024 AI Smile Gen. All rights reserved. |{' '}
        <Link href="/privacy" className="text-blue-600 hover:underline">
          Privacy Policy
        </Link>{' '}
        |{' '}
        <Link href="/terms" className="text-blue-600 hover:underline">
          Terms of Service
        </Link>
      </p>
      <p className="mt-4 flex flex-wrap justify-center items-center gap-2">
        Follow us:{' '}
        <a href="#" className="text-blue-600 hover:text-blue-800 transition">
          Twitter
        </a>{' '}
        |{' '}
        <a href="#" className="text-blue-600 hover:text-blue-800 transition">
          LinkedIn
        </a>
      </p>
    </footer>
  );
}
