import React from "react";
import { motion } from "framer-motion";

const Premium = () => {
  const tools = [
    {
      title: "Free Tools",
      emoji: "🧠",
      description: "Generate logos, taglines, and business name ideas for free.",
      price: "Free",
      badge: "Free",
      features: [
        "AI Logo Generator",
        "Business Name Generator",
        "Tagline Suggestions",
      ],
    },
    {
      title: "LinkedIn Bio Generator",
      emoji: "🔥",
      description: "Craft a professional, AI-generated LinkedIn bio tailored to your tone.",
      price: "₹49",
      badge: "Pro",
      features: [
        "Tone-based Bio Options",
        "Multiple Formats",
        "Ready for Copy-Paste",
      ],
    },
    {
      title: "AI Portfolio Website",
      emoji: "🌐",
      description: "Get a complete personal brand website with content generated in minutes.",
      price: "₹199",
      badge: "Premium",
      features: [
        "One-click AI Profile Builder",
        "Fully Responsive Website",
        "Custom Domain Support",
      ],
    },
  ];

  return (
    <div className="px-6 py-16" style={{ backgroundColor: "#f4f3fb" }}>
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-900">
        Start Free. Upgrade Your Brand Later.
      </h2>
      <div className="flex flex-col md:flex-row justify-center items-start gap-6">
        {tools.map((tool, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-white border border-gray-200 rounded-2xl shadow-lg p-6 w-full md:w-1/3 hover:scale-105 transition-transform cursor-pointer"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-gray-800">
                {tool.title}
              </h3>
              <span className="text-xs bg-indigo-600 text-white px-2 py-1 rounded-full">
                {tool.badge}
              </span>
            </div>
            <div className="text-4xl mb-4">{tool.emoji}</div>
            <p className="text-gray-600 mb-4">{tool.description}</p>
            <ul className="text-sm text-gray-700 list-disc list-inside mb-4">
              {tool.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            <div className="font-bold text-indigo-600">{tool.price}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Premium;
