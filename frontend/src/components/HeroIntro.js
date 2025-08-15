// src/components/HeroIntro.js
import React from "react";
import { motion } from "framer-motion";

const HeroIntro = () => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-black via-purple-900 to-yellow-900 text-white px-6">
      
      <motion.h1
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 drop-shadow-lg"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2 }}
      >
        Experience the sparkle <br /> before you wear it.
      </motion.h1>

      <motion.p
        className="text-center mt-6 max-w-xl text-lg text-gray-300"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        Step into the future of jewellery try-ons with our AR magic ✨
      </motion.p>
    </div>
  );
};

export default HeroIntro;
