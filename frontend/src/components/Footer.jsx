import React from "react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#e5e7eb] text-gray-800 pt-12 pb-8 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand Column */}
        <div>
          <h2 className="text-xl font-bold mb-3">BrandCraft</h2>
          <p className="text-sm text-gray-600">
            Build your brand effortlessly with AI-driven tools designed for entrepreneurs and creators.
          </p>
        </div>

        {/* Product Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Product</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Logo Generator</li>
            <li>Tagline Generator</li>
            <li>Bio Generator</li>
            <li>Portfolio Builder</li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>Help Center</li>
            <li>Blog</li>
            <li>Pricing</li>
            <li>FAQs</li>
          </ul>
        </div>

        {/* Social & Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Connect</h3>
          <div className="flex gap-4 mb-4">
            <FaFacebook className="text-xl hover:text-blue-600 cursor-pointer" />
            <FaTwitter className="text-xl hover:text-blue-400 cursor-pointer" />
            <FaLinkedin className="text-xl hover:text-blue-700 cursor-pointer" />
            <FaInstagram className="text-xl hover:text-pink-600 cursor-pointer" />
          </div>
          <p className="text-sm text-gray-600">support@brandcraft.in</p>
        </div>
      </div>

      {/* Divider */}
      <div className="mt-10 border-t border-gray-300 pt-6 text-sm text-center text-gray-500">
        © {new Date().getFullYear()} BrandCraft. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
