import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const Working = () => {
  const [logos, setLogos] = useState([]);

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const res = await axios.get(
          "https://685ce972769de2bf085e607d.mockapi.io/logos"
        );
        setLogos(res.data);
      } catch (error) {
        console.error("Error fetching logos:", error);
      }
    };

    fetchLogos();
  }, []);

  // Duplicate logos to simulate infinite scroll loop
  const repeatedLogos = [...logos, ...logos];

  return (
    <section className="bg-white py-16 px-6 max-w-7xl mx-auto overflow-hidden">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-10">
        Trusted by Top Companies
      </h2>

      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex gap-10 w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 60, // 👈 slow scroll duration (seconds)
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {repeatedLogos.map((logo, idx) => (
            <div
              key={`${logo.id}-${idx}`}
              className="min-w-[120px] h-24 bg-[#f4f3fb] rounded-lg shadow flex items-center justify-center"
            >
              <img
                src={logo.imageUrl}
                alt={`Logo ${logo.id}`}
                className="max-h-20 max-w-full object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Working;
