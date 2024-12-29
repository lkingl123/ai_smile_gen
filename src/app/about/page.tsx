'use client';

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";

export default function AboutPage() {
  const controls = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      await controls.start({
        x: ["0%", "10%", "-5%", "0%"],
        y: ["0%", "-10%", "5%", "0%"],
        transition: {
          duration: 12,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "mirror",
        },
      });
    };
    sequence();
  }, [controls]);

  return (
    <>
      <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center relative overflow-hidden">
        <Header />
        {/* Floating Shapes */}
        <motion.div
          className="absolute top-20 -right-10 w-80 h-80 bg-gradient-to-tr from-blue-300 to-indigo-400 rounded-full opacity-50"
          animate={controls}
          whileHover={{ scale: 1.1 }}
        ></motion.div>
        <motion.div
          className="absolute bottom-32 -left-20 w-96 h-96 bg-gradient-to-tl from-blue-200 to-blue-500 rounded-full opacity-40"
          animate={controls}
          whileHover={{ scale: 1.1 }}
        ></motion.div>
        <motion.div
          className="absolute top-40 left-20 w-64 h-64 bg-gradient-to-tr from-indigo-400 to-purple-500 rounded-full opacity-60"
          animate={controls}
          whileHover={{ scale: 1.1 }}
        ></motion.div>
        <motion.div
          className="absolute top-60 right-40 w-72 h-72 bg-gradient-to-br from-green-300 to-blue-300 rounded-full opacity-50"
          animate={controls}
          whileHover={{ scale: 1.1 }}
        ></motion.div>
        <motion.div
          className="absolute bottom-20 right-60 w-56 h-56 bg-gradient-to-r from-pink-300 to-purple-500 rounded-full opacity-50"
          animate={controls}
          whileHover={{ scale: 1.1 }}
        ></motion.div>

        {/* About Content */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl relative z-10 mt-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">About Us</h1>
          <p className="text-gray-700 leading-relaxed mb-6 text-center">
            At DentalSimulator, our mission is to help you envision your perfect smile. Combining
            advanced technology with a user-friendly platform, we aim to empower our users to make
            confident decisions about their dental health.
          </p>

          {/* Our Story */}
          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">Our Story</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            DentalSimulator was founded with a vision to revolutionize how people approach smile
            makeovers. By providing an intuitive tool that showcases potential results, we’ve made
            it easier for individuals to explore their options and collaborate with dental
            professionals. Our journey started with a small team of passionate innovators and has
            grown to serve users worldwide.
          </p>

          {/* What We Offer */}
          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">What We Offer</h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4">
            <li>
              AI-powered smile simulations that provide accurate, natural-looking results.
            </li>
            <li>
              A secure platform where your privacy and data protection are our priorities.
            </li>
            <li>
              Easy-to-use tools designed for both individuals and dental professionals.
            </li>
          </ul>

          {/* Vision & Values */}
          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">Our Vision & Values</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            At the heart of DentalSimulator lies a commitment to innovation, integrity, and
            inclusivity. We believe in empowering individuals to take control of their dental
            health, and our platform reflects our dedication to transparency, security, and
            excellence.
          </p>

          {/* Call to Action */}
          <div className="mt-8 text-center mb-4"> {/* Added mb-24 for extra space */}
            <h3 className="text-xl font-semibold text-gray-800 mb-8">
              Ready to explore your perfect smile?
            </h3>
            <Link
              href="/upload"
              className="bg-white text-blue-600 font-semibold py-4 px-8 rounded-full shadow-md border border-blue-600 transition duration-300 ease-in-out hover:bg-blue-100 hover:text-blue-700 transform hover:-translate-y-1 hover:scale-105 z-10 relative"
            >
              Upload Your Photo
            </Link>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
