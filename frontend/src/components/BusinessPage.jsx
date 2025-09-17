import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const templates = [
  {
    id: 1,
    name: "Modern Clean",
    cardClass: "bg-white text-gray-900 border border-gray-200",
    nameClass: "font-sans",
    titleClass: "font-sans text-sm text-gray-600",
    contactClass: "font-sans text-xs text-gray-700",
    logoPosition: "right",
    designElements: (
      <>
        <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500"></div>
        <div className="absolute bottom-0 right-0 w-1/4 h-1 bg-indigo-500"></div>
      </>
    ),
  },
  {
    id: 2,
    name: "Professional Dark",
    cardClass: "bg-gray-800 text-white border border-gray-700",
    nameClass: "font-serif", // Base font for name, adjusted in renderCardContent
    titleClass: "font-serif text-sm text-gray-300",
    contactClass: "font-serif text-xs text-gray-400",
    logoPosition: "left",
    designElements: (
      <>
        <div className="absolute bottom-0 left-0 w-full h-px bg-purple-500 opacity-50"></div>
        <div className="absolute top-0 right-0 w-px h-full bg-purple-500 opacity-50"></div>
      </>
    ),
  },
  {
    id: 3,
    name: "Vibrant Gradient",
    cardClass:
      "bg-gradient-to-br from-blue-600 to-purple-700 text-white shadow-lg",
    nameClass: "font-sans", // Base font for name, adjusted in renderCardContent
    titleClass: "font-sans text-sm text-blue-200",
    contactClass: "font-sans text-xs text-blue-100",
    logoPosition: "top-center", // New position
    designElements: (
      <>
        {/* -inset-1 with blur creates the slight bleed, which overflow-hidden should clip */}
        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 rounded-lg blur opacity-75"></div>
      </>
    ),
  },
  {
    id: 4,
    name: "Minimalist Grid",
    cardClass: "bg-white text-gray-800 border-2 border-dashed border-gray-300",
    nameClass: "font-mono", // Base font for name, adjusted in renderCardContent
    titleClass: "font-mono text-xs text-gray-500",
    contactClass: "font-mono text-xs text-gray-600",
    logoPosition: "bottom-left",
    designElements: (
      <>
        <div className="absolute inset-0 grid grid-cols-5 grid-rows-3 gap-0.5 opacity-10">
          {Array(15)
            .fill()
            .map((_, i) => (
              <div key={i} className="bg-gray-200"></div>
            ))}
        </div>
      </>
    ),
  },
  {
    id: 5,
    name: "Elegant Serif",
    cardClass: "bg-cream-100 text-brown-900 border border-brown-300", // Assuming custom Tailwind colors or similar
    nameClass: "font-serif italic", // Base font for name, adjusted in renderCardContent
    titleClass: "font-serif text-sm text-gray-700",
    contactClass: "font-serif text-xs text-gray-600",
    logoPosition: "right",
    designElements: (
      <>
        <svg
          className="absolute top-0 left-0 w-1/4 h-1/4 opacity-10 text-indigo-500"
          viewBox="0 0 100 100"
        >
          <path fill="currentColor" d="M0,0 L100,0 L0,100 Z" />
        </svg>
        <svg
          className="absolute bottom-0 right-0 w-1/4 h-1/4 opacity-10 text-indigo-500"
          viewBox="0 0 100 100"
        >
          <path fill="currentColor" d="M100,100 L0,100 L100,0 Z" />
        </svg>
      </>
    ),
  },
  {
    id: 6,
    name: "Vivid Abstract",
    cardClass: "bg-purple-900 text-white relative overflow-hidden",
    nameClass: "font-sans", // Base font for name, adjusted in renderCardContent
    titleClass: "font-sans text-sm text-lime-100",
    contactClass: "font-sans text-xs text-lime-200",
    logoPosition: "left",
    designElements: (
      <>
        {/* These elements are intended to be large and partially hidden by overflow-hidden */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-500 rounded-full mix-blend-screen opacity-50 blur-lg"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-cyan-400 rounded-full mix-blend-screen opacity-50 blur-lg"></div>
      </>
    ),
  },
  // --- Templates with potentially complex layouts for main view, adjusted designElements ---
  {
    id: 7,
    name: "Corporate Blue",
    cardClass: "bg-blue-800 text-white border border-blue-900",
    nameClass: "font-sans",
    titleClass: "font-sans text-sm text-blue-200",
    contactClass: "font-sans text-xs text-blue-300",
    logoPosition: "top-left",
    designElements: (
      <>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white opacity-20"></div>
        {/* Adjusted size to ensure it doesn't push content out, relying on overflow-hidden */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-700 opacity-30 skew-x-12 transform origin-top-left"></div>
      </>
    ),
  },
  {
    id: 8,
    name: "Geometric Modern",
    cardClass:
      "bg-gray-100 text-gray-900 border border-gray-300 overflow-hidden",
    nameClass: "font-sans",
    titleClass: "font-sans text-sm text-gray-600",
    contactClass: "font-sans text-xs text-gray-700",
    logoPosition: "right",
    designElements: (
      <>
        {/* Relying on overflow-hidden for these skewed elements */}
        <div className="absolute top-0 left-0 w-1/3 h-full bg-indigo-500 opacity-10 transform -skew-x-12"></div>
        <div className="absolute bottom-0 right-0 w-2/3 h-1/2 bg-teal-400 opacity-10 transform skew-x-12"></div>
      </>
    ),
  },
  {
    id: 9,
    name: "Creative Brushstroke",
    cardClass:
      "bg-gray-50 text-gray-800 border border-gray-200 overflow-hidden",
    nameClass: "font-display",
    titleClass: "font-sans text-sm text-gray-600",
    contactClass: "font-sans text-xs text-gray-700",
    logoPosition: "top-right",
    designElements: (
      <>
        {/* Adjusting sizes/positions slightly to be contained or gracefully clipped */}
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-red-400 rounded-full mix-blend-multiply opacity-60 transform translate-x-[-20%] translate-y-[20%]"></div>
        <div className="absolute top-0 right-0 w-24 h-24 bg-blue-400 rounded-full mix-blend-multiply opacity-60 transform translate-x-[20%] translate-y-[-20%]"></div>
        <div className="absolute bottom-0 right-0 w-1/2 h-1/4 bg-yellow-300 opacity-70 transform rotate-3 origin-bottom-right"></div>
      </>
    ),
  },
  {
    id: 10,
    name: "Earthy Tone",
    cardClass: "bg-stone-100 text-stone-800 border border-stone-300",
    nameClass: "font-serif",
    titleClass: "font-sans text-sm text-stone-600",
    contactClass: "font-sans text-xs text-stone-700",
    logoPosition: "left",
    designElements: (
      <>
        <div className="absolute inset-0 bg-gradient-to-tr from-stone-200 to-amber-100 opacity-50"></div>
        {/* This element is small enough and positioned to be generally safe */}
        <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-lime-700 opacity-10 rounded-tl-full"></div>
      </>
    ),
  },
  {
    id: 11,
    name: "Bold Monochromatic",
    cardClass: "bg-black text-white border-2 border-white",
    nameClass: "font-mono uppercase tracking-wide",
    titleClass: "font-mono text-xs text-gray-400",
    contactClass: "font-mono text-xs text-gray-300",
    logoPosition: "bottom-right",
    designElements: (
      <>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-80"></div>
        {/* These thin lines should be fine with overflow-hidden */}
        <div className="absolute bottom-0 left-0 w-1/4 h-1 bg-white"></div>
        <div className="absolute top-0 right-0 w-1/4 h-1 bg-white"></div>
      </>
    ),
  },
  {
    id: 12,
    name: "Soft Organic",
    cardClass: "bg-emerald-50 text-emerald-900 border border-emerald-200",
    nameClass: "font-serif italic",
    titleClass: "font-sans text-sm text-emerald-700",
    contactClass: "font-sans text-xs text-emerald-800",
    logoPosition: "top-left",
    designElements: (
      <>
        {/* Adjusting sizes and translating to keep centers within bounds, let edges be clipped */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-emerald-200 rounded-full opacity-50 blur-md transform translate-x-[-30%] translate-y-[-30%]"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-yellow-100 rounded-full opacity-60 blur-md transform translate-x-[30%] translate-y-[30%]"></div>
      </>
    ),
  },
];

const BusinessCardCreator = () => {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    email: "",
    phone: "",
    company: "",
    logo: "", // Base64 encoded image
  });
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "logo" && files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, logo: reader.result });
      };
      reader.readAsDataURL(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const defaultPreviewData = {
    name: "John Doe",
    title: "Professional Title",
    company: "Your Company",
    email: "email@example.com",
    phone: "+123456789",
    logo: "https://via.placeholder.com/60x60?text=Logo", // Updated placeholder logo size
  };

  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, delay: 0.5, ease: "easeOut" },
    },
    hover: { scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" },
    tap: { scale: 0.95 },
  };

  const templateCardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.15)",
      transition: { duration: 0.2 },
    },
    selected: {
      scale: 1.05,
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.25)",
      transition: { duration: 0.3 },
    },
  };

  // Helper function to render logo and text based on position
  const renderCardContent = (data, template, isFullCard = true) => {
    const { name, title, company, email, phone, logo } = data;
    const { nameClass, titleClass, contactClass, logoPosition } = template;
    const currentLogo = isFullCard ? formData.logo : logo;

    // Conditionally adjust logo size for small preview cards
    const previewLogoSizeClass = isFullCard ? "w-20 h-20" : "w-12 h-12";

    const logoElement = currentLogo ? (
      <img
        src={currentLogo}
        alt="Logo"
        className={`${previewLogoSizeClass} object-contain self-center`}
      />
    ) : (
      <div
        className={`${previewLogoSizeClass} bg-gray-300 rounded-lg flex items-center justify-center text-xs text-gray-600`}
      >
        Logo
      </div>
    );

    // --- RESPONSIVENESS ADJUSTMENT FOR SMALL PREVIEW CARDS ---
    // If it's a small preview card (isFullCard is false), use a simplified layout.
    // This prevents complex positioning from breaking the smaller fixed-size containers.
    if (!isFullCard) {
      return (
        <div className="relative z-10 flex flex-col justify-between items-center text-center p-2">
          {logoElement}
          <div className="mt-2">
            <h3 className={`text-sm font-semibold ${nameClass} leading-tight`}>
              {name}
            </h3>
            <p className={`text-xs ${titleClass} leading-tight`}>{title}</p>
            <p className={`text-[10px] ${contactClass} mt-1 leading-tight`}>
              {company}
            </p>
          </div>
        </div>
      );
    }

    // --- FULL CARD LAYOUT LOGIC (Only for the large live preview) ---
    // Dynamic layout based on logoPosition for the main preview card
    if (logoPosition === "right") {
      return (
        <div className="relative z-10 flex w-full h-full flex-row-reverse justify-between items-start">
          <div className="flex-none">{logoElement}</div>
          <div className="flex flex-col justify-between h-full items-start pr-4">
            <div className="flex flex-col flex-grow items-start text-left">
              <h2
                className={`break-words max-w-full font-serif font-bold text-xl md:text-2xl ${nameClass}`}
              >
                {name}
              </h2>
              <p className={`mt-1 break-words max-w-full ${titleClass}`}>
                {title}
              </p>
            </div>
            <div className="text-right w-full mt-auto">
              <p className={`text-base font-semibold ${contactClass}`}>
                {company}
              </p>
              <p className={`text-sm ${contactClass}`}>{email}</p>
              <p className={`text-sm ${contactClass}`}>{phone}</p>
            </div>
          </div>
        </div>
      );
    } else if (logoPosition === "left") {
      return (
        <div className="relative z-10 flex w-full h-full justify-between items-start">
          <div className="flex-none">{logoElement}</div>
          <div className="flex flex-col justify-between h-full items-start pl-4">
            <div className="flex flex-col flex-grow items-start text-left">
              <h2
                className={`break-words max-w-full font-serif font-bold text-xl md:text-2xl ${nameClass}`}
              >
                {name}
              </h2>
              <p className={`mt-1 break-words max-w-full ${titleClass}`}>
                {title}
              </p>
            </div>
            <div className="text-right w-full mt-auto">
              <p className={`text-base font-semibold ${contactClass}`}>
                {company}
              </p>
              <p className={`text-sm ${contactClass}`}>{email}</p>
              <p className={`text-sm ${contactClass}`}>{phone}</p>
            </div>
          </div>
        </div>
      );
    } else if (logoPosition === "top-center") {
      return (
        <div className="relative z-10 flex flex-col w-full h-full items-center text-center">
          <div className="flex-none mb-2">{logoElement}</div>
          <div className="flex flex-col flex-grow items-center text-center">
            <h2
              className={`break-words max-w-full font-serif font-bold text-xl md:text-2xl ${nameClass}`}
            >
              {name}
            </h2>
            <p className={`mt-1 break-words max-w-full ${titleClass}`}>
              {title}
            </p>
          </div>
          <div className="text-center w-full mt-auto">
            <p className={`text-base font-semibold ${contactClass}`}>
              {company}
            </p>
            <p className={`text-sm ${contactClass}`}>{email}</p>
            <p className={`text-sm ${contactClass}`}>{phone}</p>
          </div>
        </div>
      );
    } else if (logoPosition === "bottom-left") {
      return (
        <div className="relative z-10 flex flex-col w-full h-full justify-between items-start">
          <div className="flex flex-col items-start text-left flex-grow">
            <h2
              className={`break-words max-w-full font-serif font-bold text-xl md:text-2xl ${nameClass}`}
            >
              {name}
            </h2>
            <p className={`mt-1 break-words max-w-full ${titleClass}`}>
              {title}
            </p>
          </div>
          <div className="w-full flex justify-between items-end">
            <div className="flex-none">{logoElement}</div>
            <div className="flex-grow pl-4 text-right">
              <p className={`text-base font-semibold ${contactClass}`}>
                {company}
              </p>
              <p className={`text-sm ${contactClass}`}>{email}</p>
              <p className={`text-sm ${contactClass}`}>{phone}</p>
            </div>
          </div>
        </div>
      );
    } else if (logoPosition === "top-left") {
      return (
        <div className="relative z-10 flex flex-col w-full h-full justify-between items-start">
          <div className="flex w-full justify-start items-center mb-2">
            <div className="flex-none mr-4">{logoElement}</div>
            <div className="flex flex-col items-start text-left flex-grow">
              <h2
                className={`break-words max-w-full font-serif font-bold text-xl md:text-2xl ${nameClass}`}
              >
                {name}
              </h2>
              <p className={`mt-1 break-words max-w-full ${titleClass}`}>
                {title}
              </p>
            </div>
          </div>
          <div className="w-full mt-auto text-left">
            <p className={`text-base font-semibold ${contactClass}`}>
              {company}
            </p>
            <p className={`text-sm ${contactClass}`}>{email}</p>
            <p className={`text-sm ${contactClass}`}>{phone}</p>
          </div>
        </div>
      );
    } else if (logoPosition === "top-right") {
      return (
        <div className="relative z-10 flex flex-col w-full h-full justify-between items-end text-right">
          <div className="flex w-full justify-end items-center mb-2">
            <div className="flex flex-col items-end text-right flex-grow pr-4">
              <h2
                className={`break-words max-w-full font-serif font-bold text-xl md:text-2xl ${nameClass}`}
              >
                {name}
              </h2>
              <p className={`mt-1 break-words max-w-full ${titleClass}`}>
                {title}
              </p>
            </div>
            <div className="flex-none">{logoElement}</div>
          </div>
          <div className="w-full mt-auto text-right">
            <p className={`text-base font-semibold ${contactClass}`}>
              {company}
            </p>
            <p className={`text-sm ${contactClass}`}>{email}</p>
            <p className={`text-sm ${contactClass}`}>{phone}</p>
          </div>
        </div>
      );
    } else if (logoPosition === "bottom-right") {
      return (
        <div className="relative z-10 flex flex-col w-full h-full justify-between items-end">
          <div className="flex flex-col items-end text-right flex-grow">
            <h2
              className={`break-words max-w-full font-serif font-bold text-xl md:text-2xl ${nameClass}`}
            >
              {name}
            </h2>
            <p className={`mt-1 break-words max-w-full ${titleClass}`}>
              {title}
            </p>
          </div>
          <div className="w-full flex justify-between items-end">
            <div className="flex-grow pr-4 text-left">
              <p className={`text-base font-semibold ${contactClass}`}>
                {company}
              </p>
              <p className={`text-sm ${contactClass}`}>{email}</p>
              <p className={`text-sm ${contactClass}`}>{phone}</p>
            </div>
            <div className="flex-none">{logoElement}</div>
          </div>
        </div>
      );
    }
    // Default layout if no specific position is matched (e.g., if logoPosition is undefined or 'default')
    return (
      <div className="relative z-10 flex w-full h-full flex-col justify-between items-end text-right">
        <div className="flex w-full justify-between items-start mb-4">
          <div className="flex flex-col items-start text-left">
            <h2
              className={`break-words max-w-[200px] font-serif font-bold text-xl md:text-2xl ${nameClass}`}
            >
              {name}
            </h2>
            <p className={`mt-1 break-words max-w-[200px] ${titleClass}`}>
              {title}
            </p>
          </div>
          {logoElement}
        </div>
        <div className="text-right w-full mt-auto">
          <p className={`text-base font-semibold ${contactClass}`}>{company}</p>
          <p className={`text-sm ${contactClass}`}>{email}</p>
          <p className={`text-sm ${contactClass}`}>{phone}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="min-h-screen flex items-center justify-center text-center bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          <motion.h1
            className="text-5xl md:text-6xl font-extrabold leading-tight"
            variants={heroVariants}
          >
            Create Your Professional Business Card
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl mt-4 max-w-2xl mx-auto"
            variants={heroVariants}
          >
            Design. Preview. Customize with a variety of stunning templates.
          </motion.p>
          <motion.button
            onClick={() => {
              const mainContent = document.getElementById("main-content");
              if (mainContent) {
                mainContent.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="mt-8 px-8 py-3 bg-white text-indigo-700 rounded-full text-lg font-semibold shadow-xl"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Start Designing
          </motion.button>
        </motion.div>
      </div>

      <div id="main-content" className="p-4 md:p-8 lg:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-10">
          {/* Form */}
          <div className="bg-white rounded-lg shadow-xl p-6 space-y-4 order-2 lg:order-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Your Information
            </h2>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-200"
            />
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-200"
            />
            <input
              type="text"
              name="company"
              placeholder="Company"
              value={formData.company}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-200"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-200"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition duration-200"
            />
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Upload Logo:
            </label>
            <input
              type="file"
              name="logo"
              accept="image/*"
              onChange={handleChange}
              className="w-full text-gray-700 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            />
          </div>

          {/* Live Preview */}
          <div className="flex items-center justify-center order-1 lg:order-2 p-4">
            <motion.div
              key={selectedTemplate.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`relative overflow-hidden w-[380px] h-[220px] rounded-xl p-6 flex shadow-2xl ${selectedTemplate.cardClass}`}
            >
              {selectedTemplate.designElements}
              {/* Pass isFullCard = true for the main preview */}
              {renderCardContent(
                formData.name ? formData : defaultPreviewData,
                selectedTemplate,
                true
              )}
            </motion.div>
          </div>
        </div>

        {/* Template Selection */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Choose a Template
          </h3>
          {/* Grid to display 4 columns on larger screens */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {templates.map((template, index) => (
                <motion.div
                  key={template.id}
                  className={`relative overflow-hidden cursor-pointer rounded-lg p-3 w-full h-[220px] flex shadow-md ${
                    template.cardClass
                  } ${
                    selectedTemplate.id === template.id
                      ? "ring-4 ring-indigo-500 ring-offset-2"
                      : ""
                  }`}
                  onClick={() => setSelectedTemplate(template)}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  whileTap="tap"
                  variants={templateCardVariants}
                  custom={index}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                >
                  {/* For small previews, render design elements *before* content for background */}
                  {template.designElements}
                  {/* Mini preview of the card with placeholder data - pass isFullCard = false */}
                  {renderCardContent(defaultPreviewData, template, false)}
                  {/* Template Name overlay */}
                  <motion.div
                    className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center rounded-lg"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span className="text-white text-lg font-bold">
                      {template.name}
                    </span>
                  </motion.div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCardCreator;
