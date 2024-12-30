'use client';

import Link from "next/link";
import { FaTooth, FaRegSmileBeam, FaHeartbeat } from "react-icons/fa";
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
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center relative overflow-hidden">
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

      {/* Header */}
      <Header />

{/* Hero Section */}
<motion.div
  className="max-w-5xl w-full p-10 text-center flex flex-col items-center mt-12"
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
>
  <h2 className="text-6xl font-extrabold text-gray-800 mb-6 leading-tight drop-shadow-lg">
    Upload Your <span className="text-blue-600">Photo</span> to See Your Perfect Smile
  </h2>
  <p className="text-xl text-gray-700 mb-8 max-w-3xl">
    Transform your confidence with a new smile! Simply upload your photo, and
    we’ll show you a realistic preview of your perfect teeth in seconds.
  </p>
  <div className="flex flex-wrap justify-center gap-6">
    <Link
      href="/dashboard"
      className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-full shadow-lg transform transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105"
    >
      Upload Photo
    </Link>
  </div>
</motion.div>


      {/* Features Section */}
      <motion.div
        className="max-w-5xl w-full px-10 mt-24 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        <h3 className="text-4xl font-bold text-gray-800 mb-12 drop-shadow-lg">Why Choose Us?</h3>
        <div className="grid gap-10 grid-cols-1 md:grid-cols-3">
          {[
            {
              icon: <FaTooth className="text-blue-500 text-6xl mb-4 drop-shadow-md" />,
              title: "Advanced Technology",
              description:
                "Experience state-of-the-art AI-powered dental simulations for accurate results.",
            },
            {
              icon: <FaRegSmileBeam className="text-blue-500 text-6xl mb-4 drop-shadow-md" />,
              title: "Natural-Looking Results",
              description:
                "Visualize a realistic smile makeover tailored to your unique facial features.",
            },
            {
              icon: <FaHeartbeat className="text-blue-500 text-6xl mb-4 drop-shadow-md" />,
              title: "Trusted by Professionals",
              description:
                "Used by dentists worldwide to help patients make informed decisions about their smile.",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.05, rotate: 1 }}
            >
              <div className="flex justify-center">{feature.icon}</div>
              <h4 className="text-2xl font-bold text-gray-800 mt-4">{feature.title}</h4>
              <p className="text-gray-600 mt-2">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Testimonials Section */}
      <motion.div
        className="mt-24 max-w-5xl mx-auto grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <h3 className="text-4xl font-bold text-gray-800 mb-8 text-center w-full col-span-1 md:col-span-3 drop-shadow-lg">
          What Our Patients Say
        </h3>
        {[
          {
            text: "I never imagined how much a new smile could change my confidence until I saw my preview here. The results were exactly as promised!",
            name: "Sarah Thompson",
          },
          {
            text: "Being able to see my perfect teeth before the procedure gave me so much peace of mind. Thank you for this amazing tool!",
            name: "James Carter",
          },
          {
            text: "The simulation was so accurate! It helped me make the right decision for my smile makeover. Highly recommend this service.",
            name: "Emily Rivera",
          },
        ].map((testimonial, index) => (
          <motion.div
            key={index}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
            whileHover={{ scale: 1.15, rotate: 1.8 }}
          >
            <p className="text-gray-600 italic mb-4">"{testimonial.text}"</p>
            <p className="text-blue-600 font-semibold">{testimonial.name}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 py-16 w-full text-center mt-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-indigo-700 opacity-20 mix-blend-overlay"></div>
        <h3 className="text-4xl font-bold text-white mb-4 drop-shadow-lg">
          Ready to Transform Your Smile?
        </h3>
        <p className="text-white mb-8">
          Join thousands of happy patients discovering their perfect smiles with us.
        </p>
        <Link
          href="/auth/signin"
          className="bg-white text-blue-600 font-semibold py-4 px-8 rounded-full shadow-md border border-blue-600 transition duration-300 ease-in-out hover:bg-blue-100 hover:text-blue-700 transform hover:-translate-y-1 hover:scale-105 z-10 relative"
        >
          Get Started
        </Link>
      </div>

      <Footer />
    </main>
  );
}
