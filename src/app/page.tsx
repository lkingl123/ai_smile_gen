"use client";

import Link from "next/link";
import {
  FaTooth,
  FaRegSmileBeam,
  FaHeartbeat,
  FaBan,
  FaCheck,
} from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function HomePage() {
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
    <main className="min-h-screen flex flex-col items-center relative overflow-hidden">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <div className="max-w-7xl w-full p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-8 mt-24">
        {/* Text Content */}
        <div className="flex flex-col items-center text-center max-w-lg space-y-6">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-800 leading-tight">
              Smile Generation
            </h2>
            <span className="text-blue-dark text-3xl md:text-5xl font-extrabold mt-4">
              Software
            </span>
          </div>
          <p className="text-base md:text-lg text-gray-500">
            AI dental software to close patients faster
          </p>
          <ul className="space-y-3">
            <li className="flex items-center text-gray-700">
              <FaRegSmileBeam className="text-blue-dark text-3xl md:text-4xl mr-3" />
              <span className="font-bold text-base md:text-xl text-gray-600">
                Beautiful smiles in 15 seconds or less
              </span>
            </li>
            <li className="flex items-center text-gray-700">
              <FaBan className="text-blue-dark text-3xl md:text-4xl mr-3" />
              <span className="font-bold text-base md:text-xl text-gray-600">
                No training or manual editing required
              </span>
            </li>
            <li className="flex items-center text-gray-700">
              <FaCheck className="text-blue-dark text-3xl md:text-4xl mr-3" />
              <span className="font-bold text-base md:text-xl text-gray-600">
                Increased patient close rates
              </span>
            </li>
          </ul>

          <Link
            href="/waitlist"
            className="bg-blue-dark hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full shadow-md transition duration-300 ease-in-out"
          >
            Join our waitlist for early bird pricing
          </Link>
        </div>

        {/* Video Content with Watch Demo Text */}
        <div className="relative w-full max-w-[700px] flex flex-col items-center">
          <div className="relative w-full aspect-[16/9] md:aspect-[16/10]">
            <iframe
              src="https://www.loom.com/embed/09077f5ebdc84a539019242330016ef9?hide_owner=true&hide_share=true&hide_title=true&hide_embed_top_bar=true"
              title="AI Teeth Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute top-0 left-0 w-full h-full rounded-lg"
            ></iframe>
          </div>
          {/* Watch Demo Text */}
          <p className="text-4xl font-bold text-gray-800 mt-8">
            Watch our demo!
          </p>
        </div>
      </div>

      {/* Features Section */}
      <motion.div
        className="max-w-5xl w-full px-6 md:px-10 mt-12 md:mt-24 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        <h3 className="text-2xl md:text-4xl font-bold text-gray-800 mb-8 md:mb-12 drop-shadow-lg">
          Why Choose Us?
        </h3>
        <div className="grid gap-6 md:gap-10 grid-cols-1 md:grid-cols-3">
          {[
            {
              icon: (
                <FaTooth className="text-blue-500 text-5xl md:text-6xl mb-4 drop-shadow-md" />
              ),
              title: "Advanced Technology",
              description:
                "Experience state-of-the-art AI-powered dental simulations for accurate results.",
            },
            {
              icon: (
                <FaRegSmileBeam className="text-blue-500 text-5xl md:text-6xl mb-4 drop-shadow-md" />
              ),
              title: "Natural-Looking Results",
              description:
                "Visualize a realistic smile makeover tailored to your unique facial features.",
            },
            {
              icon: (
                <FaHeartbeat className="text-blue-500 text-5xl md:text-6xl mb-4 drop-shadow-md" />
              ),
              title: "Trusted by Professionals",
              description:
                "Used by dentists worldwide to help patients make informed decisions about their smile.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 md:p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05, rotate: 1 }}
            >
              <div className="flex justify-center">{feature.icon}</div>
              <h4 className="text-xl md:text-2xl font-bold text-gray-800 mt-4">
                {feature.title}
              </h4>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <Footer />
    </main>
  );
}
