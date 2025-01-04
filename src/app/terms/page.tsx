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
            At AI Smile Gen, we are committed to protecting your privacy and ensuring the
            security of your personal information. This Privacy Policy outlines how we collect,
            use, and safeguard your data when you use our services.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">1. Information We Collect</h2>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4">
            <li>
              <strong>Personal Information:</strong> When you create an account or upload an image,
              we may collect your name, email address, and other relevant details.
            </li>
            <li>
              <strong>Uploaded Images:</strong> Images you upload to our platform are securely
              stored and processed for the purpose of generating your simulations.
            </li>
            <li>
              <strong>Usage Data:</strong> We may collect data on how you interact with our
              platform, including page visits, clicks, and session durations.
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">2. How We Use Your Information</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We use the information we collect to improve our services, provide accurate
            simulations, and deliver a seamless experience. Specifically, we use your data to:
          </p>
          <ul className="list-disc list-inside text-gray-700 leading-relaxed mb-4">
            <li>Generate and display smile simulations based on uploaded photos.</li>
            <li>Respond to your inquiries and provide customer support.</li>
            <li>Enhance our platform through analytics and user feedback.</li>
          </ul>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">3. Data Protection</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            We implement industry-standard security measures to protect your data. Your uploaded
            images are processed securely and are not shared with third parties without your
            consent.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">4. Your Rights</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            You have the right to access, update, or delete your personal data at any time. To
            exercise these rights, please contact us through the support section on our website.
          </p>

          <h2 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">5. Contact Us</h2>
          <p className="text-gray-700 leading-relaxed">
            If you have any questions or concerns about our Privacy Policy or how your data is
            handled, feel free to contact us at{" "}
            <a href="mailto:support@dentalsimulator.com" className="text-blue-600 underline">
              support@dentalsimulator.com
            </a>
            .
          </p>
        </div>
      <Footer />
      </main>
    </>
  );
}
