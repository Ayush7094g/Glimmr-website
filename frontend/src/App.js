import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./components/Home";
import EarringsCollection from "./components/EarringsCollection";
import EthnicRecommendation from "./components/EthnicRecommendation";
import CartPage from "./components/CartPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-[#fdf8f6] text-gray-800 dark:bg-[#1a1a1a] dark:text-white transition-colors duration-300">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/earrings" element={<EarringsCollection />} />
            <Route path="/recommendation" element={<EthnicRecommendation />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
          <Footer />
          <ChatBot />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;