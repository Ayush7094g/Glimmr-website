import React from "react";

const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-yellow-400 text-white font-semibold shadow-md hover:scale-105 transition-all duration-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export { Button };
