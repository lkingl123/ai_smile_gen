"use client";

import Link from "next/link";
import { FaTooth, FaRegSmileBeam, FaHeartbeat } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { FaBan, FaCheck } from "react-icons/fa";

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
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <div className="max-w-7xl w-full p-10 flex flex-col md:flex-row items-center justify-between gap-8 mt-24">
        {/* Text Content */}
        <div className="flex flex-col items-start max-w-xl">
          <h2 className="text-5xl font-extrabold text-gray-800 mb-4 leading-tight">
            Smile Generation <span className="text-blue-dark ml-24">Software</span>
          </h2>
          <p className="text-xl text-gray-500 mb-6">
            AI dental software to close patients faster
          </p>
          <ul className="space-y-6 mb-6">
            <li className="flex items-center text-gray-700 mt-4">
              <FaRegSmileBeam className="text-blue-dark text-4xl mr-4" />
              <span className="font-bold text-xl">
                Beautiful smiles in 15 seconds or less
              </span>
            </li>
            <li className="flex items-center text-gray-700 mt-4">
              <FaBan className="text-blue-dark text-4xl mr-4" />
              <span className="font-bold text-xl">
                No training or manual editing required
              </span>
            </li>
            <li className="flex items-center text-gray-700 mt-4">
              <FaCheck className="text-blue-dark text-4xl mr-4" />
              <span className="font-bold text-xl">Increased patient close rates</span>
            </li>
          </ul>

          <Link
            href="/waitlist"
            className="bg-blue-dark hover:bg-blue-700 text-white font-semibold py-4 px-8 rounded-full shadow-md transition duration-300 ease-in-out ml-8 mt-6"
          >
            Join our waitlist for early bird pricing
          </Link>
        </div>

        {/* Video Content */}
  <div className="relative w-full max-w-[700px] aspect-video">
    <iframe
      src="https://www.loom.com/embed/09077f5ebdc84a539019242330016ef9?hide_owner=true&hide_share=true&hide_title=true&hide_embed_top_bar=true"
      title="AI Teeth Video"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      className="absolute top-0 left-0 w-full h-full rounded-lg"
    ></iframe>
  </div>
</div>

      {/* Watch Demo Text */}
      <p className="text-4xl font-bold text-gray-800 mb-12 drop-shadow-lg">
        Watch our demo!
      </p>

      {/* Features Section */}
      <motion.div
        className="max-w-5xl w-full px-10 mt-24 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5 }}
      >
        <h3 className="text-4xl font-bold text-gray-800 mb-12 drop-shadow-lg">
          Why Choose Us?
        </h3>
        <div className="grid gap-10 grid-cols-1 md:grid-cols-3">
          {[
            {
              icon: (
                <FaTooth className="text-blue-500 text-6xl mb-4 drop-shadow-md" />
              ),
              title: "Advanced Technology",
              description:
                "Experience state-of-the-art AI-powered dental simulations for accurate results.",
            },
            {
              icon: (
                <FaRegSmileBeam className="text-blue-500 text-6xl mb-4 drop-shadow-md" />
              ),
              title: "Natural-Looking Results",
              description:
                "Visualize a realistic smile makeover tailored to your unique facial features.",
            },
            {
              icon: (
                <FaHeartbeat className="text-blue-500 text-6xl mb-4 drop-shadow-md" />
              ),
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
              <h4 className="text-2xl font-bold text-gray-800 mt-4">
                {feature.title}
              </h4>
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
          Join thousands of happy patients discovering their perfect smiles with
          us.
        </p>
        <Link
          href="/auth/signup"
          className="bg-white text-blue-600 font-semibold py-4 px-8 rounded-full shadow-md border border-blue-600 transition duration-300 ease-in-out hover:bg-blue-100 hover:text-blue-700 transform hover:-translate-y-1 hover:scale-105 z-10 relative"
        >
          Get Started
        </Link>
      </div>

      <Footer />
    </main>
  );
}
