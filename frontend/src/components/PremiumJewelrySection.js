import { Camera, Sparkles, Crown, Watch, Diamond } from "lucide-react";
import { motion } from "framer-motion";

const PremiumJewelrySection = () => {
  const categories = [
    {
      title: "Timeless Earrings",
      desc: "Elevate elegance with our exclusive collection.",
      icon: Diamond,
      bgImage: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      title: "Royal Necklaces",
      desc: "Crafted to shine for every royal moment.",
      icon: Crown,
      bgImage: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
    {
      title: "Heritage Bangles",
      desc: "Tradition meets luxury in every curve.",
      icon: Watch,
      bgImage: "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    },
  ];

  return (
    <div className="bg-gradient-to-br from-[#1e004d] via-[#5e0e98] to-[#f25c1f] text-white py-20 px-6 md:px-20 min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            initial={{ 
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight 
            }}
            animate={{
              y: [null, -20, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative"
      >
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h2 
            className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-500 bg-clip-text text-transparent mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Luxury Redefined
          </motion.h2>
          <motion.p 
            className="text-gray-200 text-xl max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Experience the perfect blend of tradition and innovation with our premium collections ✨
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {categories.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 + 0.5 }}
              className="group relative overflow-hidden rounded-2xl"
            >
              <div className="absolute inset-0">
                <img 
                  src={item.bgImage} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300" />
              </div>
              
              <div className="relative p-8 h-full flex flex-col justify-between backdrop-blur-sm">
                <div>
                  <item.icon className="w-8 h-8 text-yellow-300 mb-4" />
                  <h3 className="text-2xl font-bold mb-2 text-white">{item.title}</h3>
                  <p className="text-gray-200 mb-6">{item.desc}</p>
                </div>
                
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-yellow-400 to-pink-500 text-white px-6 py-3 rounded-full font-medium shadow-lg hover:shadow-pink-500/20 transition duration-300"
                >
                  Explore Collection
                </motion.button>
              </div>
            </motion.div>
          ))}

          {/* Try Virtually Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900 via-pink-900 to-rose-900 p-8"
          >
            <div className="absolute top-0 right-0 p-4">
              <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
            </div>

            <div className="flex flex-col items-center">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Camera className="w-16 h-16 text-yellow-300 mb-6" />
              </motion.div>

              <h3 className="text-2xl font-bold text-center mb-4 text-white">
                Virtual Try-On
              </h3>
              <p className="text-gray-300 text-center mb-6">
                Experience our jewelry collection in real-time with AR technology
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full font-medium hover:bg-white/20 transition duration-300"
              >
                Try Now
              </motion.button>

              <motion.img
                src="/assets/tryon.png"
                alt="Try Virtually"
                className="w-full h-48 object-contain mt-6 rounded-lg"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default PremiumJewelrySection;