import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Share2, Download, Sparkles, Info } from "lucide-react";

const outfitImages = {
    studs: [
        "https://i.pinimg.com/originals/02/20/1f/02201f9d91a2673c999927cad6469cc5.jpg",
        "https://i.pinimg.com/736x/0c/d6/e5/0cd6e5d1ef05ffb4d00f2b4653141d0c.jpg",
        "https://i.pinimg.com/originals/b1/4e/0e/b14e0ea39536963a4537e38cd0f202f5.jpg",
        "https://i.pinimg.com/originals/f1/26/79/f126798c015a3c2b38a580ae6d157bc4.jpg",
        "https://i.pinimg.com/originals/5a/f3/63/5af36364fa2f2cf5e5601608c8df09fb.jpg",
        "https://i.pinimg.com/originals/30/7e/8a/307e8a1dc76f9f7e78f04dc26990dd57.jpg",
      ],
      jhumkas: [
        "https://i.pinimg.com/originals/b2/c1/3c/b2c13c75cfdbb49c324457c98fd8b5f6.jpg",
        "https://i.pinimg.com/736x/68/5f/6f/685f6ff2a1bd6c7687cfd56c9ae10f62.jpg",
        "https://i.pinimg.com/originals/2c/07/88/2c0788e2254dd16758be4f2d5b8bcb58.jpg",
        "https://i.pinimg.com/originals/c2/b5/70/c2b57093f6ac41a0d259bb931fe41c65.jpg",
        "https://i.pinimg.com/originals/17/43/d6/1743d699f336bd635c0930975eae2dd5.jpg",
        "https://i.pinimg.com/originals/bb/df/c6/bbdfc6fcaf077a165e27e00a5ea37245.jpg",
      ],
      hoops: [
        "https://i.pinimg.com/originals/d0/15/f0/d015f0e7b1fc68c7a211b20284d0ae47.jpg",
        "https://i.pinimg.com/originals/36/7d/e4/367de4d54d611ef10be93a31e9b2b9f4.jpg",
        "https://i.pinimg.com/originals/bb/1e/37/bb1e3728a1b6cb52001203bcbb194842.jpg",
        "https://i.pinimg.com/originals/6f/87/52/6f875211d9c841d2748b83ea95cfccf6.jpg",
        "https://i.pinimg.com/originals/63/3d/af/633daf61db34ac4f177c0a0f1bb59a3d.jpg",
        "https://i.pinimg.com/originals/cf/18/ff/cf18ff98393c73f774f28dc4d232c7cf.jpg",
      ],
};

const styleDescriptions = {
  studs: "Perfect for both traditional and modern outfits. Ideal for formal events and daily wear.",
  jhumkas: "Traditional Indian earrings that complement ethnic wear beautifully. Best for festivals and weddings.",
  hoops: "Versatile and chic, suitable for both casual and formal occasions. A must-have accessory.",
};

const EthnicRecommendation = () => {
  const [selected, setSelected] = useState("studs");
  const [hoveredImage, setHoveredImage] = useState(null);
  const [showInfo, setShowInfo] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    // Add a smooth entrance animation for images when category changes
    setHoveredImage(null);
  }, [selected]);

  const handleFavorite = (imageUrl) => {
    setFavorites(prev => 
      prev.includes(imageUrl) 
        ? prev.filter(url => url !== imageUrl)
        : [...prev, imageUrl]
    );
  };

  return (
    <motion.div
      className="p-8 sm:p-12 bg-gradient-to-br from-[#1a0033] via-[#3c0066] to-[#33001a] text-white rounded-3xl shadow-2xl mt-20 max-w-7xl mx-auto border border-white/10"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Header Section */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-4xl sm:text-6xl font-extrabold mb-6 bg-gradient-to-r from-pink-300 via-purple-300 to-yellow-200 text-transparent bg-clip-text drop-shadow-[0_2px_12px_rgba(236,72,153,0.6)]">
          ✨ AI Style Guide: Perfect Pairings
        </h2>
        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
          Discover the perfect outfit combinations for your favorite earrings, curated by our AI stylist
        </p>
      </motion.div>

      {/* Category Selection */}
      <div className="flex justify-center gap-6 flex-wrap mb-16">
        {Object.keys(outfitImages).map((type) => (
          <motion.button
            key={type}
            onClick={() => setSelected(type)}
            className={`relative px-8 py-3 rounded-2xl font-medium transition-all duration-500 ${
              selected === type
                ? "bg-gradient-to-r from-pink-500 to-yellow-400 text-white shadow-lg shadow-pink-500/30"
                : "bg-white/10 hover:bg-white/20 text-white"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              {type.charAt(0).toUpperCase() + type.slice(1)}
              {selected === type && <Sparkles className="w-4 h-4 text-yellow-200" />}
            </span>
            {selected === type && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-pink-500 to-yellow-400 rounded-2xl -z-10"
                layoutId="activeCategory"
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Style Description */}
      <motion.div
        className="bg-white/10 rounded-2xl p-6 mb-12 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <Info className="w-5 h-5 text-pink-400" />
          <h3 className="text-xl font-semibold text-pink-300">Styling Tips</h3>
        </div>
        <p className="text-gray-300">{styleDescriptions[selected]}</p>
      </motion.div>

      {/* Image Grid */}
      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {outfitImages[selected].map((img, index) => (
            <motion.div
              key={img}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group relative rounded-2xl overflow-hidden shadow-xl bg-zinc-900/50 hover:shadow-pink-500/40 transition-all duration-500"
              onHoverStart={() => setHoveredImage(img)}
              onHoverEnd={() => setHoveredImage(null)}
            >
              <img
                src={img}
                alt={`Outfit ${index + 1}`}
                className="w-full h-96 object-cover transition-all duration-500 group-hover:scale-110"
              />

              {/* Overlay */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredImage === img ? 1 : 0 }}
              >
                <div className="absolute bottom-0 left-0 right-0 p-6 space-y-4">
                  {/* Action Buttons */}
                  <div className="flex justify-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-white/20 rounded-full backdrop-blur-sm hover:bg-pink-500 transition-colors"
                      onClick={() => handleFavorite(img)}
                    >
                      <Heart 
                        className={`w-5 h-5 ${favorites.includes(img) ? 'text-red-500 fill-red-500' : 'text-white'}`} 
                      />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-white/20 rounded-full backdrop-blur-sm hover:bg-pink-500 transition-colors"
                    >
                      <Share2 className="w-5 h-5" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-white/20 rounded-full backdrop-blur-sm hover:bg-pink-500 transition-colors"
                    >
                      <Download className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default EthnicRecommendation;