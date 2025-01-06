"use client";

import Link from "next/link";
import {
  FaRegSmileBeam,
  FaBan,
  FaCheck,
  FaArrowUp,
  FaCodeBranch,
  FaTabletAlt,
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

  // Animation Variants for Smooth Transitions
  const heroVariants = {
    hidden: { opacity: 0, x: -100 }, // Start off-screen to the left
    visible: {
      opacity: 1,
      x: 0, // Move into position
      transition: { duration: 1, ease: "easeInOut" },
    },
  };

  return (
    <main className="min-h-screen bg-blue-50 flex flex-col items-center relative overflow-hidden pt-[80px]">
      {/* Header */}
      <Header />
      {/* Hero Section */}
      <motion.div
        className="h-screen w-full p-6 md:p-10 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-20 md:-mt-20 pt-30 md:pt-0"
        initial="hidden"
        animate="visible"
        variants={heroVariants}
      >
        {/* Text Content */}
        <motion.div
          className="flex flex-col items-center text-center max-w-lg space-y-6 md:mt-0"
          initial="hidden"
          animate="visible"
          variants={heroVariants}
        >
          <div className="flex flex-col items-center">
            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-800 leading-tight">
              Smile Generation
            </h2>
            <span className="text-blue-dark text-3xl md:text-5xl font-extrabold mt-4">
              Software
            </span>
          </div>
          <p className="text-base md:text-lg text-gray-400 text-center">
            AI dental software to close patients faster
          </p>
          <ul className="space-y-3 text-center">
            <li className="flex items-center text-gray-700">
              <FaRegSmileBeam className="text-blue-dark text-2xl md:text-4xl mr-4" />
              <span className="font-bold text-sm md:text-xl text-gray-500">
                Beautiful smiles in 15 seconds or less
              </span>
            </li>
            <li className="flex items-center text-gray-700">
              <FaBan className="text-blue-dark text-2xl md:text-4xl mr-4" />
              <span className="font-bold text-sm md:text-xl text-gray-500">
                No training or manual editing required
              </span>
            </li>
            <li className="flex items-center text-gray-700">
              <FaCheck className="text-blue-dark text-2xl md:text-4xl mr-4" />
              <span className="font-bold text-sm md:text-xl text-gray-500">
                Increased patient close rates
              </span>
            </li>
          </ul>

          <Link
            href="/waitlist"
            className="bg-blue-dark hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full shadow-md transition duration-300 ease-in-out hover:scale-110"
          >
            Join our waitlist for early bird pricing
          </Link>
        </motion.div>

        {/* Video Content with Watch Demo Text */}
        <motion.div
          className="relative w-full max-w-[500px] md:max-w-[700px] flex flex-col items-center"
          initial="hidden"
          animate="visible"
          variants={heroVariants}
        >
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
          <p className="text-xl md:text-4xl font-bold text-gray-800 mt-4 md:mt-8">
            Watch our demo!
          </p>
        </motion.div>
      </motion.div>

      {/* Feature Section 1 */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-400 py-16 w-full">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center text-white">
            {/* Feature 1 */}
            <div className="flex flex-col items-center">
              <div className="bg-white text-blue-600 p-4 rounded-full mb-4 shadow-lg">
                <FaArrowUp className="text-2xl" />
              </div>
              <h3 className="text-lg font-bold mb-2">
                Improve your consultations
              </h3>
              <p className="text-sm">Show patients what's possible</p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center">
              <div className="bg-white text-blue-600 p-4 rounded-full mb-4 shadow-lg">
                <FaCodeBranch className="text-2xl" />
              </div>
              <h3 className="text-lg font-bold mb-2">Easy application</h3>
              <p className="text-sm">Upload a picture and let AI do the rest</p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center">
              <div className="bg-white text-blue-600 p-4 rounded-full mb-4 shadow-lg">
                <FaTabletAlt className="text-2xl" />
              </div>
              <h3 className="text-lg font-bold mb-2">
                Cross platform capabilities
              </h3>
              <p className="text-sm">Use your phone, tablet, or desktop</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
