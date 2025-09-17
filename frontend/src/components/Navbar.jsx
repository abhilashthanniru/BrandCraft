import React, { useState } from "react";
import { logo2 } from "../assets";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50 px-4 py-3 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-4">
        <img
          src={logo2}
          alt="Logo"
          className="w-32 h-12 object-contain cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-8 text-gray-700 text-sm">
        <li
          className="cursor-pointer hover:text-black"
          onClick={() => navigate("/")}
        >
          Home
        </li>
        <li
          className="cursor-pointer hover:text-black"
          onClick={() => navigate("/logocreator")}
        >
          Logo Creator
        </li>
        <li
          className="cursor-pointer hover:text-black"
          onClick={() => navigate("/taglinecreator")}
        >
          Tagline Creator
        </li>
        <li className="cursor-pointer hover:text-black" onClick={() => navigate("/businesscard")}>BusinessCard</li>
        <li className="cursor-pointer hover:text-black"onClick={() => navigate("/postgeneration")}>Pricing</li>
      </ul>

      {/* Desktop Buttons */}
      <div className="hidden md:flex items-center gap-4">
        <button
          className="text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 text-sm"
          onClick={() => navigate("/login")}
        >
          Sign in
        </button>
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded-md hover:opacity-90 text-sm"
          onClick={() => navigate("/register")}
        >
          Start for free
        </button>
      </div>

      {/* Mobile Hamburger */}
      <div className="md:hidden">
        <button
          className="focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md md:hidden z-40">
          <ul className="flex flex-col items-start gap-4 p-4 text-gray-700 text-sm">
            <li
              className="cursor-pointer hover:text-black"
              onClick={() => {
                navigate("/");
                setIsOpen(false);
              }}
            >
              Home
            </li>
            <li
              className="cursor-pointer hover:text-black"
              onClick={() => {
                navigate("/logocreator");
                setIsOpen(false);
              }}
            >
              Logo Creator
            </li>
            <li
              className="cursor-pointer hover:text-black"
              onClick={() => {
                navigate("/taglinecreator");
                setIsOpen(false);
              }}
            >
              Tagline Creator
            </li>
            <li className="cursor-pointer hover:text-black" onClick={() => {
                navigate("/businesscard");
                setIsOpen(false);
              }}>BusinessCard</li>
            <li className="cursor-pointer hover:text-black">Pricing</li>
            <li>
              <button
                className="w-full text-left text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200"
                onClick={() => {
                  navigate("/login");
                  setIsOpen(false);
                }}
              >
                Sign in
              </button>
            </li>
            <li>
              <button
                className="w-full bg-gray-800 text-white px-4 py-2 rounded-md hover:opacity-90"
                onClick={() => {
                  navigate("/register");
                  setIsOpen(false);
                }}
              >
                Start for free
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
