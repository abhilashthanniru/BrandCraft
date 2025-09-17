import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";

const faqs = [
  {
    question: "Is BrandCraft free to use?",
    answer:
      "Yes! You can get started with our free tools to generate logos, taglines, and business names instantly. Premium tools are optional.",
  },
  {
    question: "Can I use the AI-generated content commercially?",
    answer:
      "Absolutely. All content you generate — logos, bios, taglines — are yours to use in personal or commercial projects.",
  },
  {
    question: "Do I need to know design or branding?",
    answer:
      "Nope! Just describe your idea. Our AI handles the design and wording professionally for you.",
  },
  {
    question: "Will my data be safe?",
    answer:
      "Yes, we take privacy seriously. Your data is encrypted and never shared without your consent.",
  },
  {
    question: "Can I customize the generated logos?",
    answer:
      "Yes, you can choose from styles and refine them based on your preferences and industry.",
  },
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="px-6 py-20 bg-gray-50 text-gray-800">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-center mb-10"
        >
          Frequently Asked Questions
        </motion.h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-xl shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-6 py-4 text-left font-medium text-lg hover:bg-gray-50 transition"
              >
                {faq.question}
                <motion.span
                  animate={{ rotate: activeIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiChevronDown className="text-xl" />
                </motion.span>
              </button>

              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4 }}
                    className="px-6 pb-4 text-gray-600 text-base"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
