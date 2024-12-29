"use client";

import { useState } from "react";
import Link from "next/link";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false); // Menu starts closed

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <header className="relative z-50 w-full max-w-6xl mx-auto p-4 flex items-center justify-between bg-white/80 backdrop-blur-md shadow-lg rounded-full mt-4">
      {/* Logo */}
      <h1 className="text-3xl font-bold text-gray-800 tracking-wide">
        Dental<span className="text-blue-600">Simulator</span>
      </h1>

      {/* Hamburger Menu Icon for Mobile */}
      <button
        className="md:hidden text-gray-700 text-3xl focus:outline-none z-50"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center space-x-6">
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
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-5 rounded-full shadow-md transition duration-300 ease-in-out"
        >
          Sign Up
        </Link>
      </nav>

      {/* Mobile Menu */}
      <nav
        className={`absolute top-16 left-0 w-[100%] mx-auto bg-white z-40 flex flex-col items-center space-y-4 p-6 rounded-3xl shadow-lg md:hidden transition-transform duration-300 ease-in-out ${
          menuOpen
            ? "translate-y-0 opacity-95 visible"
            : "-translate-x-full opacity-0 invisible"
        }`}
      >
        <Link
          href="/"
          className="w-full text-lg font-medium text-gray-700 bg-blue-50 px-4 py-2 rounded-lg shadow-md hover:bg-blue-100 text-center"
          onClick={() => setMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          href="/about"
          className="w-full text-lg font-medium text-gray-700 bg-blue-50 px-4 py-2 rounded-lg shadow-md hover:bg-blue-100 text-center"
          onClick={() => setMenuOpen(false)}
        >
          About
        </Link>
        <Link
          href="/contact"
          className="w-full text-lg font-medium text-gray-700 bg-blue-50 px-4 py-2 rounded-lg shadow-md hover:bg-blue-100 text-center"
          onClick={() => setMenuOpen(false)}
        >
          Contact
        </Link>
        <Link
          href="/auth/signin"
          className="w-full text-lg font-medium bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md text-center"
          onClick={() => setMenuOpen(false)}
        >
          Sign In
        </Link>
        <Link
          href="/auth/signup"
          className="w-full text-lg font-medium bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md text-center"
          onClick={() => setMenuOpen(false)}
        >
          Sign Up
        </Link>
      </nav>
    </header>
  );
}
