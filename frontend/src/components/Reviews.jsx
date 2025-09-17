import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { motion } from "framer-motion";
import "swiper/css";
import "swiper/css/pagination";

const reviews = [
  {
    name: "Priya Desai",
    title: "Co-Founder, EcoSavor",
    feedback:
      "Absolutely amazing! We were struggling with our brand identity until we discovered BrandCraft. The AI suggestions were spot on.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Rohit Verma",
    title: "CEO, HealthSphere India",
    feedback:
      "BrandCraft helped us revamp our startup's branding in less than an hour. The tagline generator is super creative!",
    image: "https://randomuser.me/api/portraits/men/54.jpg",
  },
  {
    name: "Anjali Nair",
    title: "Marketing Head, TasteRoute",
    feedback:
      "The logo library is fantastic. We found a design that perfectly matches our brand voice. I’d recommend it to every Indian startup.",
    image: "https://randomuser.me/api/portraits/women/32.jpg",
  },
  {
    name: "Manish Agarwal",
    title: "Founder, SkillHive",
    feedback:
      "Very professional output! We used the AI-generated bios and taglines directly in our investor pitch and got great feedback.",
    image: "https://randomuser.me/api/portraits/men/67.jpg",
  },
  {
    name: "Neha Reddy",
    title: "Design Lead, UrbanBloom",
    feedback:
      "As a designer, I was impressed by the branding quality. The platform feels premium and polished, even on the free plan.",
    image: "https://randomuser.me/api/portraits/women/15.jpg",
  },
];

const Reviews = () => {
  return (
    <section className="relative bg-white py-20 px-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-4 relative z-10"
      >
        What People Are Saying
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        viewport={{ once: true }}
        className="text-center text-gray-600 max-w-xl mx-auto mb-12 relative z-10"
      >
        Trusted by founders, designers, and marketers across India’s startup ecosystem.
      </motion.p>

      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000 }}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="max-w-6xl mx-auto relative z-10"
      >
        {reviews.map((item, index) => (
          <SwiperSlide key={index}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 h-full border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-md font-semibold text-gray-800">{item.name}</h4>
                  <p className="text-sm text-gray-500">{item.title}</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm leading-relaxed">“{item.feedback}”</p>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Reviews;

