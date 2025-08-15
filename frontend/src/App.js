import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import EarringsCollection from "./components/EarringsCollection";
import EthnicRecommendation from "./components/EthnicRecommendation";
import CartPage from "./components/CartPage";
import LoginPage from "./components/LoginPage"; // ✅ Login Page
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot"; // ✅ Import ChatBot

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#fdf8f6] text-gray-800 dark:bg-[#1a1a1a] dark:text-white transition-colors duration-300">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/earrings" element={<EarringsCollection />} />
          <Route path="/recommendation" element={<EthnicRecommendation />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} /> {/* ✅ Login Route */}
        </Routes>
        <Footer />
        <ChatBot /> {/* ✅ Add ChatBot component - it will appear on all pages */}
      </div>
    </Router>
  );
}

export default App;