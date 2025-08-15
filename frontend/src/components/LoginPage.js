import React from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    alert("Logged in!");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-100 to-pink-200 transition-all duration-500">
      <div className="backdrop-blur-lg bg-white/70 shadow-2xl rounded-3xl px-10 py-12 w-[90%] max-w-[400px] border border-pink-200">
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-pink-500 to-orange-500 text-transparent bg-clip-text mb-8 tracking-wide">
          ✨ Welcome to GLIMMR
        </h2>

        <form onSubmit={handleLogin} className="space-y-6 animate-fadeIn">
          {/* Username Field */}
          <div className="flex items-center bg-pink-100 rounded-full px-5 py-3 shadow-inner focus-within:ring-2 focus-within:ring-pink-400">
            <FaUser className="text-pink-500 mr-3" />
            <input
              type="text"
              placeholder="Username"
              className="bg-transparent outline-none w-full text-sm placeholder:text-gray-500 text-black"
              required
            />
          </div>

          {/* Password Field */}
          <div className="flex items-center bg-pink-100 rounded-full px-5 py-3 shadow-inner focus-within:ring-2 focus-within:ring-pink-400">
            <FaLock className="text-pink-500 mr-3" />
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent outline-none w-full text-sm placeholder:text-gray-500 text-black"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform"
          >
            Log In
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-8">
          New here?{" "}
          <span className="text-pink-600 font-medium cursor-pointer hover:underline">
            Create an account
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;