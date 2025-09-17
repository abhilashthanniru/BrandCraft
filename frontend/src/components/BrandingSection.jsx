import React from "react";
import { motion } from "framer-motion";
import branding from "../assets/branding.png"; 

const BrandingSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
      {/* Left Text Content */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Boost Your Brand Visibility with AI
        </h2>
        <p className="text-gray-600 text-lg mb-6">
          Our platform helps you craft your unique personal brand with AI-generated content — from
          bios and taglines to logos and templates tailored to your industry.
        </p>
        <ul className="space-y-3 text-gray-700">
          <li>🚀 Instantly generate personal branding content</li>
          <li>🎯 Stand out with tailor-made taglines and intros</li>
          <li>🎨 Choose from modern branding templates</li>
        </ul>
      </motion.div>

      {/* Right Image */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="flex justify-center"
      >
        <img
          src={branding}
          alt="AI Branding Illustration"
          className="w-full max-w-[500px] h-[300px] object-contain rounded-lg shadow-xl"
        />
      </motion.div>
    </section>
  );
};

export default BrandingSection;
