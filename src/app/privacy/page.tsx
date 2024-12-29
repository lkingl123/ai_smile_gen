'use client';

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PrivacyPage() {
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

        {/* Privacy Policy Content */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative z-10 mt-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Privacy Policy</h1>
          <p className="text-gray-700 leading-relaxed mb-4">
            Welcome to the DentalSimulator Privacy Policy. Your trust is important to us, and we are committed to protecting your personal information. This policy explains how we collect, use, and protect your data when you use our services.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">1. Data We Collect</h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4">
            <li>
              <strong>Personal Information:</strong> Includes your name, email, and account details collected during registration.
            </li>
            <li>
              <strong>Uploaded Images:</strong> Photos uploaded for simulation purposes, processed securely on our platform.
            </li>
            <li>
              <strong>Technical Data:</strong> IP addresses, browser types, and session data to improve our platform’s performance.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">2. How We Use Your Data</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Your data is used to enhance your experience with DentalSimulator. Key uses include:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4">
            <li>Generating accurate smile simulations based on uploaded photos.</li>
            <li>Improving customer support and addressing inquiries effectively.</li>
            <li>Conducting analytics to optimize website performance and user experience.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">3. Data Security</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We employ advanced security measures to safeguard your information. All uploads and personal data are encrypted during transit and storage.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">4. Data Sharing</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We do not sell or rent your data to third parties. Data is only shared in limited cases, such as:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4">
            <li>To comply with legal obligations or law enforcement requests.</li>
            <li>With trusted service providers necessary for platform functionality (e.g., cloud storage).</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">5. Your Rights</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            You have full control over your data, including the right to access, update, and delete your personal information. Contact us to make a request.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">6. Cookies Policy</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Our website uses cookies to enhance functionality and monitor usage patterns. You can control cookie settings through your browser preferences.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">7. Contact Us</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            If you have any questions about this policy or how we handle your data, reach out to us at:
          </p>
          <p className="text-gray-700">
            Email:{" "}
            <a href="mailto:support@dentalsimulator.com" className="text-blue-600 underline">
              support@dentalsimulator.com
            </a>
          </p>
          <p className="text-gray-700">
            Phone:{" "}
            <a href="tel:+1234567890" className="text-blue-600 underline">
              +1 (234) 567-890
            </a>
          </p>
        </div>

        <Footer />
      </main>
    </>
  );
}
