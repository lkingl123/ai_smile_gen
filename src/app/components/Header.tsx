"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full max-w-6xl mx-auto p-6 flex items-center justify-between bg-white/80 backdrop-blur-md shadow-lg rounded-full mt-4">
      {/* Logo */}
      <h1 className="text-3xl font-bold text-gray-800 tracking-wide">
        Dental<span className="text-blue-600">Simulator</span>
      </h1>

      {/* Navigation */}
      <nav className="flex items-center space-x-6">
        <Link
          href="/"
          className="relative font-semibold text-gray-700 px-4 py-2 rounded-full transition-transform transform group hover:scale-110 hover:bg-blue-100 hover:shadow-lg"
        >
          Home
        </Link>
        <Link
          href="/about"
          className="relative font-semibold text-gray-700 px-4 py-2 rounded-full transition-transform transform group hover:scale-110 hover:bg-blue-100 hover:shadow-lg"
        >
          About
        </Link>
        <Link
          href="/contact"
          className="relative font-semibold text-gray-700 px-4 py-2 rounded-full transition-transform transform group hover:scale-110 hover:bg-blue-100 hover:shadow-lg"
        >
          Contact
        </Link>
        <Link
          href="/auth/signin"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-full shadow-md transition duration-300 ease-in-out"
        >
          Sign In
        </Link>
        <Link
          href="/auth/signup"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-5 rounded-full shadow-lg transition duration-300 ease-in-out"
        >
          Sign Up
        </Link>
      </nav>
    </header>
  );
}
