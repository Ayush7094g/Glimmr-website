// src/pages/CartPage.js
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaTrashAlt } from "react-icons/fa";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedItems);
  }, []);

  const removeFromCart = (id) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("cart", JSON.stringify(updated));
  };

  const getTotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-b from-[#fbe4ec] via-[#f7d8e4] to-[#fef6f9] text-[#3b0a26]">
      <motion.h1 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="text-4xl font-extrabold mb-10 mt-10 text-center drop-shadow-sm">
        Your Shopping Cart
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-6">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-5 flex flex-col md:flex-row items-center justify-between gap-4 hover:shadow-xl transition duration-300"
              >
                <img src={item.image} alt={item.name} className="w-32 h-32 object-cover rounded-xl border border-gray-100" />
                <div className="flex-1 text-left">
                  <h3 className="text-lg font-semibold text-[#71171c]">{item.name}</h3>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <div className="text-lg font-bold text-[#3b0a26]">₹{item.price}</div>
                <FaTrashAlt
                  className="text-red-400 cursor-pointer hover:text-red-600 transition"
                  onClick={() => removeFromCart(item.id)}
                />
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-600 text-lg">Your cart is empty 😔</p>
          )}
        </div>

        {/* Summary */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }} 
          animate={{ opacity: 1, x: 0 }} 
          className="bg-white rounded-2xl p-6 shadow-xl sticky top-20 h-fit">
          <h2 className="text-2xl font-bold text-[#71171c] mb-4">Order Summary</h2>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Total Items:</span>
              <span>{cartItems.length}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Price:</span>
              <span>₹{getTotal()}</span>
            </div>
          </div>
          <button
            className="mt-6 w-full py-3 bg-gradient-to-r from-[#71171c] to-[#b5284f] text-white font-semibold rounded-full hover:opacity-90 transition shadow-md hover:shadow-lg"
          >
            Proceed to Checkout
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default CartPage;