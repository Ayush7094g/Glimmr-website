// src/components/ChatBot.js
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your jewelry assistant. I can help you find the perfect earrings, get style recommendations, or answer any questions about our collection. How can I help you today?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // AI Response Logic
  const generateAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    // Jewelry-specific responses
    if (message.includes('earring') || message.includes('ear')) {
      return "I'd love to help you find the perfect earrings! We have a beautiful collection including studs, hoops, danglers, and ethnic designs. Are you looking for something specific - perhaps for a special occasion or daily wear?";
    }
    
    if (message.includes('recommendation') || message.includes('suggest') || message.includes('recommend')) {
      return "I can provide personalized recommendations! Our AI-powered recommendation system can suggest earrings based on your face shape, style preferences, and occasions. Would you like to try our recommendation feature?";
    }
    
    if (message.includes('ethnic') || message.includes('traditional') || message.includes('indian')) {
      return "Our ethnic collection is stunning! We have traditional jhumkas, chandbali, temple jewelry, and contemporary fusion pieces. These are perfect for festivals, weddings, or adding a cultural touch to your style.";
    }
    
    if (message.includes('price') || message.includes('cost') || message.includes('budget')) {
      return "We offer jewelry for every budget! Our collection ranges from affordable everyday pieces to premium statement jewelry. Could you let me know your budget range so I can suggest the best options?";
    }
    
    if (message.includes('material') || message.includes('gold') || message.includes('silver')) {
      return "We use high-quality materials including sterling silver, gold-plated pieces, and hypoallergenic options. All our jewelry is crafted with attention to detail and skin-safe materials.";
    }
    
    if (message.includes('size') || message.includes('fit')) {
      return "Most of our earrings are designed to be comfortable for extended wear. For hoops and studs, we provide size measurements. If you have sensitive ears, I'd recommend our hypoallergenic options.";
    }
    
    if (message.includes('shipping') || message.includes('delivery')) {
      return "We offer fast and secure shipping! Standard delivery takes 3-5 business days, and we also provide express shipping options. All orders are carefully packaged to ensure your jewelry arrives safely.";
    }
    
    if (message.includes('return') || message.includes('exchange')) {
      return "We have a customer-friendly return policy! You can return or exchange items within 30 days of purchase in original condition. We want you to be completely happy with your jewelry.";
    }
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello there! ✨ Welcome to our jewelry store. I'm here to help you discover beautiful earrings and find pieces that perfectly match your style. What can I help you find today?";
    }
    
    if (message.includes('thank') || message.includes('thanks')) {
      return "You're very welcome! I'm here whenever you need help finding the perfect jewelry. Feel free to ask me anything about our collection or if you need styling advice! 💎";
    }
    
    // Default responses
    const defaultResponses = [
      "I'd be happy to help you with that! Could you tell me more about what you're looking for in jewelry?",
      "That's a great question! Our collection has many options. Are you interested in earrings, or would you like to explore other jewelry pieces?",
      "I'm here to help you find the perfect jewelry! Could you provide a bit more detail about your preferences or what occasion you're shopping for?",
      "Let me help you with that! Are you looking for something specific in our jewelry collection? I can guide you to the perfect piece."
    ];
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputMessage,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: generateAIResponse(inputMessage),
        isBot: true,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    "Show me earrings",
    "Get recommendations",
    "Ethnic collection",
    "Price ranges"
  ];

  const handleQuickAction = (action) => {
    setInputMessage(action);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ${!isOpen ? 'block' : 'hidden'}`}
      >
        <MessageCircle size={24} />
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
        />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100 }}
            className="fixed bottom-6 right-6 z-50 w-96 h-[600px] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h3 className="font-semibold">Jewelry Assistant</h3>
                  <p className="text-sm opacity-90">Always here to help ✨</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`flex items-start gap-2 max-w-[80%] ${message.isBot ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.isBot 
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white' 
                        : 'bg-gray-200 dark:bg-gray-600'
                    }`}>
                      {message.isBot ? <Bot size={16} /> : <User size={16} />}
                    </div>
                    <div className={`p-3 rounded-2xl ${
                      message.isBot 
                        ? 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white' 
                        : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.isBot ? 'text-gray-500 dark:text-gray-400' : 'text-pink-100'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white flex items-center justify-center">
                      <Bot size={16} />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-2xl">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Quick Actions */}
              {messages.length === 1 && (
                <div className="space-y-2">
                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center">Quick actions:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickActions.map((action, index) => (
                      <button
                        key={index}
                        onClick={() => handleQuickAction(action)}
                        className="text-xs bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 px-3 py-1 rounded-full hover:bg-pink-200 dark:hover:bg-pink-900/40 transition-colors"
                      >
                        {action}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me about jewelry..."
                  className="flex-1 p-3 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputMessage.trim()}
                  className="p-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;