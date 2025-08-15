import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  RefreshCcw,
  Gem,
  Smile,
  Wrench,
} from "lucide-react"; // Aesthetic icons from Lucide

const assurances = [
  {
    icon: <RefreshCcw className="w-10 h-10 text-yellow-400" />,
    title: "Easy Exchange",
    desc: "Flexible return & exchange on all products",
  },
  {
    icon: <Gem className="w-10 h-10 text-pink-400" />,
    title: "Certified Purity",
    desc: "Each piece comes with a purity certificate",
  },
  {
    icon: <Smile className="w-10 h-10 text-green-400" />,
    title: "Customer First",
    desc: "Quick support & delightful service",
  },
  {
    icon: <Wrench className="w-10 h-10 text-purple-400" />,
    title: "Lifetime Maintenance",
    desc: "Free cleaning, polishing & resizing",
  },
  {
    icon: <ShieldCheck className="w-10 h-10 text-blue-400" />,
    title: "100% Guarantee",
    desc: "Trust built over decades, guaranteed",
  },
];

const AssuranceSection = () => {
  return (
    <section className="w-full py-16 px-6 bg-gradient-to-br from-black via-purple-950 to-yellow-950 text-white rounded-2xl shadow-xl">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-600 drop-shadow-md">
          Our Sparkle Promise
        </h2>
        <p className="mt-4 text-gray-300 max-w-xl mx-auto">
          Curated with care, crafted with love, and committed to your satisfaction.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 max-w-5xl mx-auto">
        {assurances.map((item, index) => (
          <motion.div
            key={index}
            className="bg-white/10 backdrop-blur-md p-6 rounded-2xl text-center hover:scale-105 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="flex justify-center mb-4">{item.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-yellow-100">{item.title}</h3>
            <p className="text-sm text-gray-300">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default AssuranceSection;
