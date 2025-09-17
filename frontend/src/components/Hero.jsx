import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden mt-1 min-h-[90vh] bg-[#f4f3fb] flex flex-col justify-center items-center px-6 sm:px-10 md:px-0 max-w-7xl mx-auto text-center">
      <div className="absolute right-[-100px] top-[-100px] md:right-[-150px] md:top-[-150px] w-[300px] h-[300px] md:w-[400px] md:h-[400px]  rounded-full blur-3xl opacity-30 z-0" />

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="relative text-3xl sm:text-5xl md:text-6xl font-extrabold text-black z-10"
      >
        Build Your Brand with{" "}
        <span className="text-blue-600 inline-block">
          <Typewriter
            options={{
              strings: ["Style", "Trust", "Clarity", "Your Industry"],
              autoStart: true,
              loop: true,
              delay: 75,
              deleteSpeed: 30,
              pauseFor: 2000,
            }}
          />
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="relative mt-6 text-lg sm:text-xl text-gray-600 max-w-3xl z-10"
      >
        Create stunning logos, compelling taglines, and professional bios
        tailored to your industry. Everything you need to establish your brand
        presence.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="relative mt-10 flex flex-col sm:flex-row justify-center gap-4 max-w-md z-10"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/login")}
          className="bg-blue-600 hover:bg-blue-800 text-white font-semibold px-8 py-3 rounded-lg text-lg transition cursor-pointer"
        >
          Get Started
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold border border-gray-300 px-8 py-3 rounded-lg text-lg transition cursor-pointer"
        >
          Browse Templates
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;
