// src/components/Header.js
import React, { useState } from "react";

const Header = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  const categories = [
    "Gold",
    "Diamond",
    "Earrings",
    "Rings",
    "Necklaces",
    "Bracelets",
    "Anklets",
    "Nose Pins",
    "Bangles",
    "Chains",
    "Pendant Sets",
    "Mangalsutras",
    "Tiaras",
    "Brooches",
    "Hair Accessories",
    "Toe Rings",
  ];

  return (
    <header className="w-full shadow-md py-4 px-8 bg-white border-b-2 border-purple-500 z-50">
      <div className="flex items-center justify-between max-w-7xl mx-auto relative">
        {/* Logo and All Jewellery Dropdown */}
        <div className="flex items-center space-x-6">
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
            JewelrySphere
          </h1>

          {/* All Jewellery Dropdown */}
          <div className="relative">
            <button
              onClick={toggleDropdown}
              className="text-black font-medium hover:text-purple-600 transition"
            >
              All Jewellery ▾
            </button>

            {isDropdownOpen && (
              <div className="absolute mt-4 left-0 w-[40vw] bg-white shadow-2xl border border-purple-200 rounded-lg p-6 z-50">
                <h2 className="text-lg font-semibold mb-4 text-purple-700">
                  Explore Categories
                </h2>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {categories.map((item, index) => (
                    <a
                      key={index}
                      href="#"
                      className="px-4 py-2 rounded hover:bg-purple-100 hover:text-purple-700 transition"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Static Nav Links */}
        <nav className="hidden sm:flex space-x-6 font-medium">
          <a href="#" className="hover:text-purple-600 transition">
            Gold
          </a>
          <a href="#" className="hover:text-pink-500 transition">
            Diamond
          </a>
          <a href="#" className="hover:text-yellow-500 transition">
            Earrings
          </a>
          <a href="#" className="hover:text-purple-600 transition">
            Rings
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
