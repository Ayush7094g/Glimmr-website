
import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  FaSearch,
  FaRegHeart,
  FaUser,
  FaShoppingBag,
  FaSun,
  FaMoon,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { PiDiamondsFour, PiStorefront } from "react-icons/pi";
import { BiMicrophone } from "react-icons/bi";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Earrings", path: "/earrings" },
    { name: "Recommendations", path: "/recommendation" },
    { name: "Cart", path: "/cart" },
  ];

  return (
    <nav
      className={`transition-all duration-500 z-50 w-full fixed top-0 left-0 shadow-md px-6 py-4 border-b border-gray-200 ${
        darkMode ? "bg-[#1a1a1a] text-white" : "bg-white text-[#71171c]"
      }`}
    >
      <div className="flex items-center justify-between w-full">
        {/* Logo */}
        <div className="text-3xl font-extrabold tracking-wide italic bg-gradient-to-r from-[#ff7096] to-[#ffc069] text-transparent bg-clip-text drop-shadow-md hover:tracking-widest transition-all duration-300">
          GLIMMR
        </div>

        {/* Hamburger Icon */}
        <div className="lg:hidden text-2xl cursor-pointer" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Links (Desktop) */}
        <div className="hidden lg:flex items-center gap-8 text-lg">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `hover:text-pink-500 transition ${
                  isActive ? "font-bold underline underline-offset-4" : ""
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <NavLink to="/login">
            <FaUser className="text-xl hover:text-pink-500 transition" title="Login" />
          </NavLink>
        </div>

        {/* Right Icons */}
        <div className="hidden lg:flex items-center gap-6 text-xl">
          <div className="relative group cursor-pointer">
            <PiDiamondsFour className="hover:text-pink-600 transition" title="Jewellery" />
            <div className="absolute top-8 left-[-20px] bg-white text-[#71171c] shadow-xl rounded-lg py-2 px-4 hidden group-hover:block z-10 text-sm">
              <div className="hover:text-pink-500 transition">Rings</div>
              <div className="hover:text-pink-500 transition">Necklaces</div>
              <div className="hover:text-pink-500 transition">Earrings</div>
            </div>
          </div>
          <PiStorefront className="cursor-pointer hover:text-pink-500 transition" title="Store" />
          <FaRegHeart className="cursor-pointer hover:text-pink-500 transition" title="Wishlist" />
          <Link to="/cart" className="relative">
            <FaShoppingBag className="cursor-pointer hover:text-pink-500 transition" title="Cart" />
            <span className="absolute top-[-8px] right-[-10px] text-white bg-[#ff7096] rounded-full text-xs w-5 h-5 flex items-center justify-center">
              1
            </span>
          </Link>
          <button
            onClick={toggleDarkMode}
            className="focus:outline-none hover:scale-110 transition"
          >
            {darkMode ? <FaSun title="Light Mode" /> : <FaMoon title="Dark Mode" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className={`lg:hidden mt-4 p-4 rounded-lg shadow-md ${
            darkMode ? "bg-[#2a2a2a] text-white" : "bg-[#fff4f4] text-[#71171c]"
          } flex flex-col gap-4 text-lg`}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `hover:text-pink-500 transition ${
                  isActive ? "font-semibold underline underline-offset-4" : ""
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <NavLink
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="hover:text-pink-500 transition"
          >
            <FaUser className="inline mr-2" /> Login
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;