// src/components/RegisterPage.js
import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { register, isLoading, error } = useAuth();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Phone number must be 10 digits";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const result = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
    });

    if (result.success) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900 py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="backdrop-blur-lg bg-white/10 shadow-2xl rounded-3xl px-8 py-10 w-full max-w-md border border-white/20"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-300 text-transparent bg-clip-text mb-2">
            Join GLIMMR
          </h2>
          <p className="text-white/70 text-sm">Create your account to discover luxury jewelry</p>
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm"
          >
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-3 border border-white/20 focus-within:border-pink-400/50 transition-all">
              <FaUser className="text-pink-400 mr-3" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="bg-transparent outline-none w-full text-sm placeholder:text-white/50 text-white"
              />
            </div>
            {errors.name && (
              <p className="text-red-400 text-xs mt-1 ml-4">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-3 border border-white/20 focus-within:border-pink-400/50 transition-all">
              <FaEnvelope className="text-pink-400 mr-3" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="bg-transparent outline-none w-full text-sm placeholder:text-white/50 text-white"
              />
            </div>
            {errors.email && (
              <p className="text-red-400 text-xs mt-1 ml-4">{errors.email}</p>
            )}
          </div>

          {/* Phone Field */}
          <div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-3 border border-white/20 focus-within:border-pink-400/50 transition-all">
              <FaPhone className="text-pink-400 mr-3" />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="bg-transparent outline-none w-full text-sm placeholder:text-white/50 text-white"
              />
            </div>
            {errors.phone && (
              <p className="text-red-400 text-xs mt-1 ml-4">{errors.phone}</p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-3 border border-white/20 focus-within:border-pink-400/50 transition-all">
              <FaLock className="text-pink-400 mr-3" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="bg-transparent outline-none w-full text-sm placeholder:text-white/50 text-white"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-white/60 hover:text-white transition-colors ml-2"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-400 text-xs mt-1 ml-4">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-3 border border-white/20 focus-within:border-pink-400/50 transition-all">
              <FaLock className="text-pink-400 mr-3" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="bg-transparent outline-none w-full text-sm placeholder:text-white/50 text-white"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-white/60 hover:text-white transition-colors ml-2"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-400 text-xs mt-1 ml-4">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Register Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-400 text-white py-3 rounded-full font-semibold shadow-lg hover:shadow-pink-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </motion.button>
        </form>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-sm text-white/70 mt-6"
        >
          Already have an account?{" "}
          <Link 
            to="/login" 
            className="text-pink-400 font-medium hover:text-pink-300 transition-colors hover:underline"
          >
            Sign In
          </Link>
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-center text-xs text-white/50"
        >
          By creating an account, you agree to our{" "}
          <span className="text-pink-400 cursor-pointer hover:underline">Terms & Conditions</span>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default RegisterPage;