import React from "react";
import { motion } from "framer-motion";

const features = [
  {
    icon: "🧠",
    title: "AI-Generated Branding",
    desc: "Instantly get logos, bios, and taglines tailored to your niche.",
  },
  {
    icon: "🎨",
    title: "Ready-to-Use Templates",
    desc: "Download professionally designed branding assets in seconds.",
  },
  {
    icon: "💼",
    title: "Professional Grade",
    desc: "Stand out with output good enough for investors and clients.",
  },
  {
    icon: "🔐",
    title: "Secure & Private",
    desc: "We value your data. Your brand info stays safe and encrypted.",
  },
  {
    icon: "🖼️",
    title: "Logo Library",
    desc: "Explore over 500+ logo styles across 20+ industries.",
  },
  {
    icon: "🌍",
    title: "Industry-Specific Support",
    desc: "Fashion, food, fitness, tech — we cover them all.",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: { opacity: 1, scale: 1 },
};

const BrandBenefits = () => {
  return (
    <section className="bg-gradient-to-br from-[#f4f3fb] to-white py-20 px-6 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl sm:text-5xl font-bold text-gray-800 mb-2 drop-shadow-sm"
      >
        Why BrandCraft?
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="w-16 h-1 bg-blue-600 mx-auto mb-6 rounded-full origin-left"
      />

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-gray-600 mb-12 max-w-2xl mx-auto text-base sm:text-lg"
      >
        Everything you need to build your brand — in one place.
      </motion.p>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 max-w-6xl mx-auto"
      >
        {features.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="backdrop-blur-lg bg-white/60 border border-white/30 p-6 rounded-xl shadow-lg hover:shadow-2xl transition duration-300"
          >
            <div className="text-4xl mb-4 transition duration-300 hover:scale-110 hover:text-blue-600">
              {item.icon}
            </div>
            <h4 className="text-lg font-semibold text-gray-800 mb-2">
              {item.title}
            </h4>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default BrandBenefits;
