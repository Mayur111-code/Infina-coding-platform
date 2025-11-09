import React, { useState, useEffect } from "react";
import { Home, ArrowLeft, Search, AlertTriangle, Sparkles } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom"; // Add these imports

const NotFound = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);
  const navigate = useNavigate(); // Add navigate hook
  const location = useLocation(); // Add location hook
  const invalidPath = location.pathname; // Use location instead of window.location

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const quickLinks = [
    { path: "/", label: "Dashboard", icon: "📊", description: "Your learning dashboard", color: "from-blue-500 to-cyan-500" },
    { path: "/challenges", label: "Challenges", icon: "💻", description: "Solve coding challenges", color: "from-purple-500 to-pink-500" },
    { path: "/earnings", label: "Earnings", icon: "💰", description: "View your points & rewards", color: "from-green-500 to-emerald-500" },
    { path: "/marketplace", label: "Marketplace", icon: "🛒", description: "Redeem your points", color: "from-orange-500 to-red-500" }
  ];

  const handleGoHome = () => {
    navigate("/"); // Use navigate instead of console.log
  };

  const handleGoBack = () => {
    navigate(-1); // Use navigate instead of window.history.back()
  };

  const handleNavigate = (path) => {
    navigate(path); // Use navigate instead of console.log
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4 lg:p-6 lg:ml-0 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className={`max-w-3xl w-full text-center relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        {/* Error Illustration */}
        <div className="mb-8">
          <div className="text-8xl sm:text-9xl mb-4 animate-bounce" style={{ animationDuration: '3s' }}>
            🔍
          </div>
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-4 inline-flex items-center justify-center mb-4 shadow-lg shadow-yellow-500/50 animate-pulse">
            <AlertTriangle className="text-white" size={32} />
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h1 className="text-6xl sm:text-8xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent animate-pulse">
            404
          </h1>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 flex items-center justify-center gap-2">
            <Sparkles className="text-cyan-400" size={24} />
            Page Not Found
            <Sparkles className="text-cyan-400" size={24} />
          </h2>
          <p className="text-gray-300 text-base sm:text-lg mb-6 max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist or has been moved to another dimension.
          </p>
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-4 sm:p-5 max-w-lg mx-auto shadow-xl">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-3">
              <Search size={18} className="text-cyan-400" />
              <span>You tried to access:</span>
            </div>
            <code className="bg-slate-900/80 border border-red-500/30 rounded-lg px-4 py-2 text-sm sm:text-base text-red-400 font-mono break-all inline-block max-w-full">
              {invalidPath}
            </code>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <button
            onClick={handleGoBack}
            className="group flex items-center justify-center gap-2 bg-slate-800/80 backdrop-blur-sm border border-slate-700 text-white px-8 py-4 rounded-xl hover:bg-slate-700 transition-all duration-300 hover:shadow-lg hover:shadow-slate-700/50 hover:scale-105"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
            <span className="font-semibold">Go Back</span>
          </button>
          <button
            onClick={handleGoHome}
            className="group flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 text-white px-8 py-4 rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 font-semibold relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <Home size={20} className="relative z-10 group-hover:rotate-12 transition-transform duration-300" />
            <span className="relative z-10">Go Home</span>
          </button>
        </div>

        {/* Quick Links */}
        <div className="bg-slate-800/40 backdrop-blur-xl rounded-2xl shadow-2xl p-6 sm:p-8 border border-slate-700/50">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Quick Links
          </h3>
          <p className="text-gray-400 text-sm sm:text-base mb-8">
            Navigate to these popular destinations
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => handleNavigate(link.path)}
                onMouseEnter={() => setHoveredLink(index)}
                onMouseLeave={() => setHoveredLink(null)}
                className="group relative flex items-center gap-4 p-4 sm:p-5 bg-slate-900/50 backdrop-blur-sm hover:bg-slate-800/80 border border-slate-700 rounded-xl transition-all duration-300 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/20 text-left hover:scale-105"
              >
                {hoveredLink === index && (
                  <div className={`absolute inset-0 bg-gradient-to-r ${link.color} opacity-10 rounded-xl transition-opacity duration-300`}></div>
                )}
                <span className="text-3xl sm:text-4xl transform group-hover:scale-110 transition-transform duration-300 relative z-10">
                  {link.icon}
                </span>
                <div className="flex-1 relative z-10">
                  <div className="font-bold text-white text-base sm:text-lg group-hover:text-cyan-400 transition-colors duration-300 mb-1">
                    {link.label}
                  </div>
                  <div className="text-gray-400 text-xs sm:text-sm group-hover:text-gray-300 transition-colors duration-300">
                    {link.description}
                  </div>
                </div>
                <ArrowLeft className="text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 rotate-180 transition-all duration-300 relative z-10" size={20} />
              </button>
            ))}
          </div>
        </div>

        {/* Support Section */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm sm:text-base">
            Still having trouble?{" "}
            <button 
              onClick={() => alert("Contact support: mayurborse7440@gmail.com")}
              className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 decoration-2 hover:decoration-cyan-400 transition-all duration-300 font-semibold"
            >
              Contact Support
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;