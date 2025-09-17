

import React, { useState } from "react";
import { Lightbulb, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

// --- Framer Motion Variants for a Clean, Professional Aesthetic ---

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
};

const sectionRevealVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      damping: 15,
      stiffness: 120,
      mass: 0.8,
    },
  },
};

const buttonHoverTapVariants = {
  hover: {
    scale: 1.02,
    boxShadow: "0px 6px 15px rgba(66, 133, 244, 0.3)",
    transition: { duration: 0.2, ease: "easeOut" },
  },
  tap: { scale: 0.98 },
};

const taglineItemSlideIn = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      damping: 18,
      stiffness: 100,
      delay: 0.05,
    },
  },
};

function TaglineGenerator() {
  const [companyName, setCompanyName] = useState("");
  const [industry, setIndustry] = useState("");
  const [taglines, setTaglines] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateTagline = async () => {
    if (!companyName.trim() || !industry.trim()) {
      setError("Please enter both company name and industry.");
      setTaglines([]);
      return;
    }

    setLoading(true);
    setError(null);
    setTaglines([]);

    try {
      const response = await fetch("https://brandcraft-4421.onrender.com/api/tagline", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ companyName, industry }),
      });

      const data = await response.json();

      if (response.ok) {
        const splitLines = data.tagline
          .split(/\d+\.\s+/)
          .filter((line) => line.trim() !== "");
        setTaglines(splitLines);
      } else {
        setError(data.error || "An unknown error occurred.");
      }
    } catch (err) {
      setError(
        "Could not connect to the server. Please ensure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 px-4 py-20 flex flex-col items-center relative overflow-hidden font-sans text-gray-800"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Subtle Background Elements for depth and style */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-slow-fade-in-out"></div>
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-2xl opacity-40 animate-slow-fade-in-out animation-delay-3000"></div>

      {/* Hero Section */}
      <motion.div
        className="text-center max-w-3xl relative z-10"
        variants={sectionRevealVariants}
      >
        <motion.div
          className="w-16 h-16 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-5 shadow-md"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 150, damping: 15, delay: 0.2 }}
        >
          <Lightbulb className="w-8 h-8 text-white" />
        </motion.div>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight">
          Craft Your Brand's Perfect{" "}
          <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
            Tagline
          </span>
        </h1>
        <p className="mt-4 text-gray-600 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto font-light">
          Generate compelling and concise slogans that resonate with your
          audience and define your brand identity.
        </p>
      </motion.div>

      {/* Input Section */}
      <motion.div
        className="mt-20 w-full max-w-2xl bg-white shadow-xl border border-gray-100 rounded-2xl p-8 sm:p-10 space-y-7 relative z-10"
        variants={sectionRevealVariants}
      >
        <div className="flex flex-col gap-5">
          <input
            type="text"
            placeholder="Enter your company name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            disabled={loading}
            className="w-full px-5 py-3 text-lg rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all placeholder-gray-400 font-medium text-gray-700"
          />
          <input
            type="text"
            placeholder="Enter your industry (e.g., technology, finance, healthcare)"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            disabled={loading}
            className="w-full px-5 py-3 text-lg rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition-all placeholder-gray-400 font-medium text-gray-700"
          />
        </div>

        <div className="flex justify-center">
          <motion.button
            onClick={handleGenerateTagline}
            disabled={loading}
            className="inline-flex items-center gap-2 px-7 py-3 bg-blue-600 text-white font-semibold text-lg rounded-full shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-98"
            variants={buttonHoverTapVariants}
            whileHover="hover"
            whileTap="tap"
          >
            {loading ? ( // Conditionally render spinner or text
              <div className="spinner-border w-5 h-5 border-2 rounded-full animate-spin border-white border-r-transparent"></div>
            ) : (
              <Lightbulb className="w-5 h-5" />
            )}
            {loading ? "Generating Ideas..." : "Generate Taglines"}
            {!loading && (
              <motion.span
                initial={{ x: -5, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <ChevronRight className="w-5 h-5" />
              </motion.span>
            )}
          </motion.button>
        </div>

        {error && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-red-600 font-medium mt-4 text-sm"
          >
            {error}
          </motion.p>
        )}
      </motion.div>

      {/* Tagline List */}
      {taglines.length > 0 && (
        <motion.div
          className="mt-16 w-full max-w-2xl bg-white border border-gray-100 p-8 sm:p-10 rounded-2xl shadow-xl space-y-6 relative z-10"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <h2 className="text-center text-2xl sm:text-3xl font-bold text-gray-800">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
              Your Suggested Taglines
            </span>
          </h2>
          <ul className="space-y-4">
            {taglines.map((line, index) => (
              <motion.li
                key={index}
                className="relative pl-6 text-gray-700 text-lg sm:text-xl font-medium leading-relaxed italic border-l-4 border-blue-400 pl-6 py-3 bg-blue-50 rounded-lg shadow-sm"
                variants={taglineItemSlideIn}
              >
                <span className="absolute left-0 top-1/2 -translate-y-1/2 text-blue-500 text-3xl font-serif leading-none">
                  &ldquo;
                </span>
                <span className="ml-2 mr-2">{line.trim()}</span>
                <span className="text-blue-500 text-3xl font-serif leading-none">
                  &rdquo;
                </span>
              </motion.li>
            ))}
          </ul>
          <div className="text-center pt-6 text-gray-500 text-sm italic">
            Select the one that best captures your brand's essence.
          </div>
        </motion.div>
      )}

      {/* Tailwind CSS keyframes for subtle background animation and SPINNER */}
      <style jsx>{`
        @keyframes slowFadeInOut {
          0%, 100% { opacity: 0.4; transform: scale(1) translate(0, 0); }
          50% { opacity: 0.6; transform: scale(1.05) translate(10px, -10px); }
        }
        .animate-slow-fade-in-out {
          animation: slowFadeInOut 8s infinite ease-in-out;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }

        /* Spinner CSS */
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </motion.div>
  );
}

export default TaglineGenerator;