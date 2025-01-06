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
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Slider from "./components/Slider";
import { RiFolderUploadFill } from "react-icons/ri";
import { RiEmotionHappyLine } from "react-icons/ri";
import { FaQuoteRight } from "react-icons/fa";

export default function HomePage() {
  const controls = useAnimation();
  const [sliderPosition, setSliderPosition] = useState(50);

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

  const handleDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget
      .closest(".slider-container")!
      .getBoundingClientRect();
    const newPosition = ((e.clientX - rect.left) / rect.width) * 100;
    if (newPosition >= 0 && newPosition <= 100) {
      setSliderPosition(newPosition);
    }
  };

  // Animation Variants for Smooth Transitions
  const heroVariants = {
    hidden: { opacity: 0, x: -100 }, // Start off-screen to the left
    visible: {
      opacity: 1,
      x: 0, // Move into position
      transition: { duration: 1.5, ease: "easeInOut" },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, x: 100 }, // Start off-screen to the right
    visible: {
      opacity: 1,
      x: 0, // Move into position
      transition: { duration: 1.5, ease: "easeInOut" },
    },
  };

  return (
    <main className="min-h-screen flex flex-col items-center relative overflow-hidden pt-[80px] lg:pt-[180px]">
      {/* Header */}
      <Header />
      {/* Hero Section */}
      <motion.div
        className="w-full p-6 md:p-10 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-20 pt-30 md:pt-0 mb-10 lg:mb-48"
        initial="hidden"
        animate="visible"
        variants={heroVariants}
      >
        {/* Text Content */}
        <motion.div
          className="flex flex-col items-center text-center max-w-lg space-y-8 md:mt-0 md:-mt-28"
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
          <p className="text-xl text-gray-400 text-center">
            AI dental software to close patients faster
          </p>
          <ul className="space-y-3 text-center">
            <li className="flex items-center text-gray-700">
              <FaRegSmileBeam className="text-blue-dark text-4xl md:text-4xl mr-4" />
              <span className="font-bold text-m md:text-xl text-gray-500">
                Beautiful smiles in 15 seconds or less
              </span>
            </li>
            <li className="flex items-center text-gray-700">
              <FaBan className="text-blue-dark text-4xl md:text-4xl mr-4" />
              <span className="font-bold text-m md:text-xl text-gray-500">
                No training or manual editing required
              </span>
            </li>
            <li className="flex items-center text-gray-700">
              <FaCheck className="text-blue-dark text-4xl md:text-4xl mr-4" />
              <span className="font-bold text-m md:text-xl text-gray-500">
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
          <p className="text-3xl md:text-5xl font-extrabold text-gray-800 mt-4 md:mt-8">
            Watch our demo!
          </p>
        </motion.div>
      </motion.div>

      {/* Feature Section 1 */}
      <motion.section
        className="relative bg-gradient-to-r from-blue-dark to-blue-400 py-16 w-full rounded-bl-[180px] ml-6 md:ml-48 mb-28"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }} // Ensures it animates only once when in view
        variants={featureVariants}
      >
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
      </motion.section>

      {/* Features Section 2*/}
      <motion.section
        className="relative bg-gradient-to-r from-blue-dark to-blue-400 py-16 w-full rounded-r-[180px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }} // Animates when 30% of the section is in view
        variants={{
          hidden: { opacity: 0, x: -100 }, // Off-screen to the right
          visible: {
            opacity: 1,
            x: 0, // Moves into position
            transition: { duration: 1.5, ease: "easeInOut" },
          },
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-12 flex flex-col items-center">
          <h2 className="text-2xl md:text-4xl font-extrabold text-white mb-6">
            Smile generation software to increase close rates
          </h2>
          <p className="text-white text-base md:text-m max-w mb-10 text-center">
            In 15 seconds or less, our AI Smile Generator will produce a series
            of 4 renders to choose from with no manual editing needed.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-between w-full gap-8 mb-16">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center max-w-sm">
              <div className="bg-white text-blue-500 p-4 rounded-full shadow-lg mb-4">
                {/* Icon for Step 1 */}
                <RiFolderUploadFill className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-bold text-white">Upload a Picture</h3>
              <p className="text-sm text-white font-bold mt-2">
                Upload a picture directly from your phone or tablet. If using a
                camera, upload it through our desktop application.
              </p>
            </div>

            {/* Arrow 1 */}
            <div className="hidden md:flex items-center">
              <div className="flex items-center gap-2">
                <div className="h-0.5 w-20 border-t-2 border-dashed border-white" />
                <FaArrowUp className="h-6 w-6 text-white rotate-90 md:rotate-90" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center max-w-sm">
              <div className="bg-white text-blue-500 p-4 rounded-full shadow-lg mb-4">
                {/* Icon for Step 2 */}
                <FaCodeBranch className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-bold text-white">AI Generation</h3>
              <p className="text-sm text-white font-bold mt-2">
                In 15 seconds or less, our AI smile generation tool will produce
                a series of 4 renders to choose from.
              </p>
            </div>

            {/* Arrow 2 */}
            <div className="hidden md:flex items-center">
              <div className="flex items-center gap-2">
                <div className="h-0.5 w-20 border-t-2 border-dashed border-white" />
                <FaArrowUp className="h-6 w-6 text-white rotate-90 md:rotate-90" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center max-w-sm">
              <div className="bg-white text-blue-500 p-4 rounded-full shadow-lg mb-4">
                {/* Icon for Step 3 */}
                <RiEmotionHappyLine className="h-12 w-12" />
              </div>
              <h3 className="text-xl font-bold text-white">Show the Patient</h3>
              <p className="text-sm text-white font-bold mt-2">
                Show the generated before and after to the patient, increasing
                commitment to closing on a new smile.
              </p>
            </div>
          </div>
          <Slider />
        </div>
      </motion.section>

      {/* Feature Section 3 */}
      <section className="w-full bg-white py-16 px-8 flex flex-col md:flex-row justify-center items-center gap-12">
        <div className="bg-blue-dark text-white p-6 md:p-10 rounded-lg shadow-lg text-center md:text-left">
          <p className="text-xl md:text-2xl font-semibold line-through text-red-500">
            $99.99/mo
          </p>
          <p className="text-3xl md:text-5xl font-extrabold">$64.99/mo</p>
          <p className="mt-2 text-sm md:text-base font-bold">
            Early Bird Pricing
          </p>
          <p className="text-gray-400 mt-4 font-bold">
            Our exclusive, early-bird pricing when you join our waitlist
          </p>
          <ul className="mt-4 space-y-2 text-left">
            <li className="flex items-center gap-2 font-bold">
              <FaCheck className="text-green-400" /> Beautiful smiles in 15
              seconds
            </li>
            <li className="flex items-center gap-2 font-bold">
              <FaCheck className="text-green-400" /> Close patients faster
            </li>
            <li className="flex items-center gap-2 font-bold">
              <FaCheck className="text-green-400" /> No training or manual
              editing required
            </li>
          </ul>
          <Link
            href="/waitlist"
            className="inline-block mt-6 bg-white text-blue-600 px-4 py-2 rounded-full font-bold hover:opacity-80"
          >
            Join our waitlist
          </Link>
        </div>
        <div className="text-gray-700 max-w-md text-center">
          <FaQuoteRight className="text-blue-dark text-4xl mb-4 mx-auto" />
          <p className="text-l font-bold leading-relaxed tracking-wider text-left">
            The AI Smile Generator tool has been a huge asset to our practice.
            We understand the benefit of showing a patient their potential smile
            during the initial consultation to increase close rates. Compared to
            other smile generation software, the AI Smile Generator is a no
            brainer because it saves us doctor & staff time, money, requires no
            training, and produces beautiful smiles in seconds. This has been
            perfect for consultations.
          </p>
          <p className="mt-6 font-semibold text-gray-900">
            Dental Implant Group
          </p>
          <p className="text-sm text-gray-500">DSO</p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
