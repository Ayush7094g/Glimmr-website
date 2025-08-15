import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiHeart, FiShoppingBag, FiZoomIn, FiStar } from "react-icons/fi";
import { products } from "../components/productData";

const EarringGallery = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState(3000);
  const [hoveredItem, setHoveredItem] = useState(null);

  const categories = [
    "All",
    "Studs",
    "Drops",
    "Hoops",
    "Jhumkas",
    "Chandeliers",
    "Pearls",
    "Tassels",
    "Kundan",
    "Minimalist",
  ];

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "All" || product.category === selectedCategory) &&
      product.price <= priceRange
  );

  return (
    <div
      className={`${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white"
          : "bg-gradient-to-br from-pink-50 via-rose-50 to-purple-100 text-gray-900"
      } min-h-screen py-16 px-6 sm:px-12 transition-all duration-500`}
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h2 className="text-5xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-500 mb-4">
          ✨ Luxury Earrings Collection
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Discover our exquisite collection of handcrafted earrings
        </p>
      </motion.div>

      {/* Filters Section */}
      <div
        className="rounded-2xl p-6 mb-12 backdrop-blur-md shadow-xl 
        bg-gradient-to-br from-white/70 to-white/30 
        dark:from-[#1e1e2e]/60 dark:to-[#2a2a40]/30 
        border border-white/30 dark:border-gray-700"
      >
        <div className="flex flex-wrap gap-6 justify-between items-center">
          {/* Categories */}
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full transition-all ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg"
                    : "bg-gray-200 dark:bg-gray-700 hover:bg-pink-200"
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>

          {/* Price Range */}
          <div className="w-full md:w-64">
            <label className="block font-semibold text-sm mb-2">
              Max Price:{" "}
              <span className="text-pink-600 dark:text-pink-300">
                ₹{priceRange}
              </span>
            </label>
            <input
              type="range"
              min="1000"
              max="3000"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-pink-500"
            />
          </div>

          {/* Dark Mode Toggle */}
          <motion.label
            className="flex items-center space-x-3 cursor-pointer"
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-sm font-medium">
              {darkMode ? "Dark" : "Light"} Mode
            </span>
            <div className="relative">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                className="sr-only"
              />
              <div
                className={`w-14 h-7 rounded-full px-1 flex items-center ${
                  darkMode ? "bg-pink-500" : "bg-gray-300"
                }`}
              >
                <div
                  className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                    darkMode ? "translate-x-7" : ""
                  }`}
                />
              </div>
            </div>
          </motion.label>
        </div>
      </div>

      {/* Products Grid */}
      <motion.div
        layout
        className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
      >
        {filteredProducts.map((product, idx) => (
          <motion.div
            key={idx}
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -10 }}
            onHoverStart={() => setHoveredItem(idx)}
            onHoverEnd={() => setHoveredItem(null)}
            className="rounded-2xl border shadow-xl overflow-hidden backdrop-blur-md 
              bg-gradient-to-br from-white/70 to-white/30 
              dark:from-[#1e1e2e]/60 dark:to-[#2a2a40]/30 
              border-white/30 dark:border-gray-700"
          >
            <div className="relative">
              <img
                src={product.img}
                alt={product.name}
                className="w-full h-56 object-cover"
              />
              {product.isNew && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-2 left-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs px-3 py-1 rounded-full shadow-lg"
                >
                  NEW
                </motion.span>
              )}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredItem === idx ? 1 : 0 }}
                className="absolute inset-0 bg-black/40 flex items-center justify-center gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  className="p-2 bg-white rounded-full text-pink-500 hover:bg-pink-500 hover:text-white transition-all"
                >
                  <FiHeart size={20} />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.2 }}
                  className="p-2 bg-white rounded-full text-pink-500 hover:bg-pink-500 hover:text-white transition-all"
                >
                  <FiZoomIn size={20} />
                </motion.button>
              </motion.div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold">{product.name}</h3>
                <div className="flex items-center text-yellow-500">
                  <FiStar className="inline mr-1" />
                  <span>{product.rating}</span>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {product.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-pink-600 dark:text-pink-400">
                  ₹{product.price}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full flex items-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
                >
                  <FiShoppingBag />
                  Try in AR
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default EarringGallery;
