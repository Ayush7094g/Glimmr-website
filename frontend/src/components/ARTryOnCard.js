import { useEffect, useRef, useState } from "react";
import { Camera, X, Sparkles, Share2, Download, Settings2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ARTryOnCard = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("none");
  const [isRecording, setIsRecording] = useState(false);
  const videoRef = useRef(null);

  const filters = ["none", "vintage", "glamour", "classic"];

  useEffect(() => {
    let stream;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: "user", width: 1280, height: 720 } 
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        alert("Camera access denied.");
        setShowCamera(false);
      }
    };

    if (showCamera) startCamera();

    return () => {
      stream?.getTracks().forEach(track => track.stop());
    };
  }, [showCamera]);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-gradient-to-br from-[#1f1f23] to-[#2d1f2f] backdrop-blur-md text-white rounded-2xl p-8 shadow-2xl border border-pink-500/30 overflow-hidden mt-6"
    >
      {/* Premium Badge */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-xs font-semibold text-white px-3 py-1 rounded-full shadow-lg">
          PREMIUM
        </span>
        <Sparkles className="text-yellow-400 w-4 h-4 animate-pulse" />
      </div>

      {/* Title Section */}
      <motion.div 
        className="text-center mb-8 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="text-4xl font-extrabold bg-gradient-to-r from-pink-400 via-purple-400 to-yellow-400 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(255,192,203,0.5)]">
          ✨ Virtual Try-On Experience
        </h2>
        <p className="text-gray-300 mt-3 text-sm max-w-md mx-auto">
          Experience our premium collection with cutting-edge AR technology. Try before you buy!
        </p>
      </motion.div>

      {/* Content Area */}
      <div className="flex flex-col items-center gap-6">
        {/* Camera Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCamera(true)}
          className="bg-gradient-to-r from-pink-500 to-purple-500 p-4 rounded-full shadow-lg hover:shadow-pink-500/20 transition group"
        >
          <Camera className="w-8 h-8 text-white group-hover:animate-pulse" />
        </motion.button>

        {/* Preview Area */}
        <div className="relative w-full">
          <img
            src="/assets/tryon.png"
            alt="AR Try-on"
            className="w-full h-56 object-cover rounded-xl border border-pink-500/20 shadow-inner"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl flex items-end justify-center p-4">
            <div className="flex gap-3">
              <button className="p-2 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition">
                <Download className="w-5 h-5" />
              </button>
              <button className="p-2 bg-white/20 rounded-full backdrop-blur-sm hover:bg-white/30 transition">
                <Settings2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Try in AR Button */}
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-yellow-400 text-white font-bold py-3 rounded-full hover:shadow-lg hover:shadow-pink-500/20 transition duration-300"
        >
          Start AR Experience
        </motion.button>
      </div>

      {/* Camera Modal */}
      <AnimatePresence>
        {showCamera && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-gradient-to-br from-[#1f1f23] to-[#2d1f2f] rounded-2xl p-6 w-[90%] md:w-[600px] shadow-2xl border border-pink-500/30"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowCamera(false)}
                className="absolute top-4 right-4 p-2 bg-white/10 rounded-full hover:bg-white/20 transition"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Content */}
              <div className="space-y-6">
                <h2 className="text-center text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Live AR Preview
                </h2>

                {/* Video Container */}
                <div className="relative rounded-xl overflow-hidden">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className={`w-full h-[400px] object-cover ${selectedFilter !== 'none' ? `filter-${selectedFilter}` : ''}`}
                  />
                  
                  {/* Controls Overlay */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 bg-black/30 backdrop-blur-sm rounded-full p-2">
                    {filters.map(filter => (
                      <button
                        key={filter}
                        onClick={() => setSelectedFilter(filter)}
                        className={`px-3 py-1 rounded-full text-sm transition ${
                          selectedFilter === filter 
                            ? 'bg-pink-500 text-white' 
                            : 'bg-white/10 hover:bg-white/20'
                        }`}
                      >
                        {filter.charAt(0).toUpperCase() + filter.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setIsRecording(!isRecording)}
                    className={`px-6 py-2 rounded-full font-medium transition ${
                      isRecording 
                        ? 'bg-red-500 text-white' 
                        : 'bg-pink-500 text-white'
                    }`}
                  >
                    {isRecording ? 'Stop Recording' : 'Start Recording'}
                  </button>
                  <button className="px-6 py-2 bg-white/10 rounded-full font-medium hover:bg-white/20 transition">
                    Take Photo
                  </button>
                </div>

                <p className="text-center text-sm text-gray-400">
                  Center your face in the frame for the best AR experience ✨
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ARTryOnCard;