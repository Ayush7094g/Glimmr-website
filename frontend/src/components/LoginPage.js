import React, { useState } from "react";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login, isLoading, error } = useAuth();
  
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear specific error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const result = await login({
      email: formData.email,
      password: formData.password,
    });

    if (result.success) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-100 to-pink-200 transition-all duration-500">
      <div className="backdrop-blur-lg bg-white/70 shadow-2xl rounded-3xl px-10 py-12 w-[90%] max-w-[400px] border border-pink-200">
        <h2 className="text-4xl font-extrabold text-center bg-gradient-to-r from-pink-500 to-orange-500 text-transparent bg-clip-text mb-8 tracking-wide">
          ✨ Welcome to GLIMMR
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
          {/* Email Field */}
          <div>
            <div className="flex items-center bg-pink-100 rounded-full px-5 py-3 shadow-inner focus-within:ring-2 focus-within:ring-pink-400">
              <FaUser className="text-pink-500 mr-3" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="bg-transparent outline-none w-full text-sm placeholder:text-gray-500 text-black"
                required
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-xs mt-1 ml-4">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center bg-pink-100 rounded-full px-5 py-3 shadow-inner focus-within:ring-2 focus-within:ring-pink-400">
              <FaLock className="text-pink-500 mr-3" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="bg-transparent outline-none w-full text-sm placeholder:text-gray-500 text-black"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-pink-500 hover:text-pink-600 transition-colors ml-2"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-xs mt-1 ml-4">{errors.password}</p>
            )}
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-pink-500 to-orange-500 text-white py-3 rounded-full font-semibold shadow-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Logging In..." : "Log In"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-8">
          New here?{" "}
          <Link 
            to="/register" 
            className="text-pink-600 font-medium hover:text-pink-500 transition-colors hover:underline"
          >
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;