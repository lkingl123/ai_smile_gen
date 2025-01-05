"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false); // Menu starts closed

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="w-full mx-auto p-4 flex items-center justify-between">
        {/* Logo completely left-aligned */}
        <div className="flex-shrink-0">
          <Link href="/">
            <Image
              src="/logo_words.png"
              alt="AI Smile Generator Logo"
              width={170}
              height={60}
              className="cursor-pointer"
            />
          </Link>
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/"
            className="relative font-semibold text-gray-700 px-4 py-2 transition-transform transform group hover:scale-110 hover:text-blue-600"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="relative font-semibold text-gray-700 px-4 py-2 transition-transform transform group hover:scale-110 hover:text-blue-600"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="relative font-semibold text-gray-700 px-4 py-2 transition-transform transform group hover:scale-110 hover:text-blue-600"
          >
            Contact
          </Link>
        </nav>

        {/* Right-aligned Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            href="/auth/signin"
            className="bg-blue-dark hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-md transition duration-300 ease-in-out"
          >
            Sign In
          </Link>
          <Link
            href="/auth/signup"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-5 rounded-md transition duration-300 ease-in-out"
          >
            Sign Up
          </Link>
        </div>

        {/* Hamburger Menu Icon for Mobile */}
        <button
          className="md:hidden text-gray-700 text-3xl focus:outline-none z-50"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      <nav
        className={`absolute top-[64px] left-0 w-full bg-white z-40 flex flex-col items-center space-y-4 p-6 shadow-lg md:hidden transition-transform duration-300 ease-in-out ${
          menuOpen ? "translate-y-0 opacity-100 visible" : "-translate-y-full opacity-0 invisible"
        }`}
      >
        <Link
          href="/"
          className="w-full text-lg font-medium text-gray-700 bg-blue-50 px-4 py-2 rounded-md shadow-md hover:bg-blue-100 text-center"
          onClick={() => setMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          href="/about"
          className="w-full text-lg font-medium text-gray-700 bg-blue-50 px-4 py-2 rounded-md shadow-md hover:bg-blue-100 text-center"
          onClick={() => setMenuOpen(false)}
        >
          About
        </Link>
        <Link
          href="/contact"
          className="w-full text-lg font-medium text-gray-700 bg-blue-50 px-4 py-2 rounded-md shadow-md hover:bg-blue-100 text-center"
          onClick={() => setMenuOpen(false)}
        >
          Contact
        </Link>
        <Link
          href="/auth/signin"
          className="w-full text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-md text-center"
          onClick={() => setMenuOpen(false)}
        >
          Sign In
        </Link>
        <Link
          href="/auth/signup"
          className="w-full text-lg font-medium bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md shadow-md text-center"
          onClick={() => setMenuOpen(false)}
        >
          Sign Up
        </Link>
      </nav>
    </header>
  );
}
