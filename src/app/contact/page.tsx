'use client';

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function ContactPage() {
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

        {/* Contact Us Content */}
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl relative z-10 mt-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Contact Us</h1>
          <p className="text-gray-700 leading-relaxed mb-6 text-center">
            Got questions? Need help? We’re here for you! Reach out to us using the form below or through our contact details.
          </p>

          {/* Contact Form */}
          <form className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Your Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">Your Message</label>
              <textarea
                placeholder="Type your message here"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 h-32 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-md transition duration-300 ease-in-out"
            >
              Send Message
            </button>
          </form>

          {/* Direct Contact Info */}
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Reach Us Directly</h2>
            <p className="text-gray-700 mb-2">
              <strong>Email:</strong>{" "}
              <a href="mailto:support@dentalsimulator.com" className="text-blue-600 underline">
                support@dentalsimulator.com
              </a>
            </p>
            <p className="text-gray-700 mb-2">
              <strong>Phone:</strong>{" "}
              <a href="tel:+1234567890" className="text-blue-600 underline">
                +1 (234) 567-890
              </a>
            </p>
            <p className="text-gray-700">
              <strong>Address:</strong> 123 Smile Avenue, Suite 456, Dental City, USA
            </p>
          </div>
        </div>

        <Footer />
      </main>
    </>
  );
}
