"use client";

import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  // fungsi untuk smooth scroll
  const handleScroll = (sectionId) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div onClick={() => handleScroll("home")} className="text-2xl font-bold text-[#1e3a8a] cursor-pointer select-none">
          Grapholyze
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <button onClick={() => handleScroll("home")} className="text-gray-700 hover:text-blue-600 transition-colors">
            Home
          </button>

          <button onClick={() => handleScroll("handwriting")} className="text-gray-700 hover:text-blue-600 transition-colors">
            Handwriting Analyst
          </button>

          <button onClick={() => handleScroll("why")} className="text-gray-700 hover:text-blue-600 transition-colors">
            About
          </button>

          <button onClick={() => (window.location.href = "/login")} className="bg-blue-800 text-white px-5 py-2 rounded-lg hover:bg-blue-500 transition-all">
            Login/Register
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden flex items-center justify-center w-10 h-10 text-gray-700 hover:text-blue-600 transition-all">
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t border-gray-200 px-6 py-4 space-y-4">
          <button onClick={() => handleScroll("home")} className="block w-full text-left text-gray-700 hover:text-blue-600">
            Home
          </button>
          <button onClick={() => handleScroll("handwriting")} className="block w-full text-left text-gray-700 hover:text-blue-600">
            Handwriting Analyst
          </button>
          <button onClick={() => handleScroll("why")} className="block w-full text-left text-gray-700 hover:text-blue-600">
            About
          </button>
          <button onClick={() => (window.location.href = "/login")} className="block w-full text-left bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
            Login/Register
          </button>
        </div>
      )}
    </nav>
  );
}
