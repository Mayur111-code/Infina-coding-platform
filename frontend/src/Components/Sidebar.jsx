import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Trophy,
  ShoppingBag,
  Users,
  Gift,
  Settings,
  Wallet,
  Menu,
  X,
  Sparkles,
  Crown,
  TrendingUp,
  LogOut
} from "lucide-react";
import { toast } from "react-toastify";

const navItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: <LayoutDashboard size={22} />,
    badge: "🏠",
    gradient: "from-blue-500 to-cyan-500"
  },
  {
    name: "Challenges",
    path: "/challenges",
    icon: <Trophy size={22} />,
    badge: "⚡",
    gradient: "from-green-500 to-emerald-500"
  },
  {
    name: "Marketplace",
    path: "/marketplace",
    icon: <ShoppingBag size={22} />,
    badge: "🛒",
    gradient: "from-purple-500 to-pink-500"
  },
  {
    name: "Leaderboard",
    path: "/leaderboard",
    icon: <Crown size={22} />,
    badge: "🏆",
    gradient: "from-yellow-500 to-red-500"
  },
  {
    name: "Referrals",
    path: "/referrals",
    icon: <Gift size={22} />,
    badge: "🎁",
    gradient: "from-red-500 to-pink-500"
  },
  {
    name: "Settings",
    path: "/settings",
    icon: <Settings size={22} />,
    badge: "⚙️",
    gradient: "from-gray-500 to-gray-700"
  },
];

function Sidebar() {
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) setIsOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const userPoints = parseInt(localStorage.getItem("totalPoints")) || 0;

  useEffect(() => {
    if (isMobile) setIsOpen(false);
  }, [pathname, isMobile]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully 👋");
    setTimeout(() => {
      navigate("/signin");
      window.location.reload();
    }, 800);
  };

  return (
    <>
      {/* Mobile Header */}
      <div className="lg:hidden flex items-center justify-between bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 shadow-2xl fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-1.5 rounded-xl overflow-hidden flex items-center justify-center">
            {/* ✅ Logo added here for mobile */}
            <img 
              src="/log.jpg" 
              alt="Logo" 
              className="w-7 h-7 object-cover rounded-lg" 
            />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">InfiCode</h1>
            <p className="text-indigo-200 text-xs">Learn • Earn • Grow</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-all"
        >
          {isOpen ? <X className="text-white" size={20} /> : <Menu className="text-white" size={20} />}
        </button>
      </div>

      {/* Backdrop */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-gray-900 to-gray-800 shadow-2xl border-r border-gray-700 z-50 transform transition-all duration-300 ease-in-out
        ${isMobile ? "w-80" : "w-24 hover:w-80"}
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
      >
        <div className="p-4 h-full flex flex-col justify-between overflow-y-auto">
          {/* Top Section */}
          <div>
            {/* Logo Section */}
          
<div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-700">
  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-1 rounded-xl min-w-[44px] h-[44px] flex items-center justify-center shadow-lg overflow-hidden">
    <img 
      src="/log.jpg" 
      alt="InfiCode Logo" 
      className="w-full h-full object-cover rounded-lg" 
    />
  </div>
  <div
    className={`transition-all duration-300 overflow-hidden ${
      isMobile || isHovered ? "opacity-100 w-auto" : "opacity-0 w-0"
    }`}
  >
    <h1 className="text-xl font-bold text-white whitespace-nowrap leading-tight">InfiCode</h1>
    <p className="text-gray-400 text-xs tracking-wide">Coding Platform</p>
  </div>
</div>

            {/* Nav Items */}
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = pathname === item.path;
                const showText = isMobile || isHovered;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`group relative flex items-center gap-3 px-3 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-[1.02] active:scale-95 ${
                      isActive
                        ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
                        : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                    } ${showText ? "justify-start" : "justify-center"}`}
                  >
                    <div
                      className={`transition-all duration-200 ${
                        isActive ? "bg-white/20" : "bg-gray-700/50 group-hover:bg-gray-600"
                      } ${showText ? "p-2 rounded-lg" : "p-1"} min-w-[44px] flex justify-center`}
                    >
                      {item.icon}
                    </div>
                    <div
                      className={`transition-all duration-300 overflow-hidden ${
                        showText ? "opacity-100 w-auto ml-2" : "opacity-0 w-0 ml-0"
                      } flex items-center justify-between flex-1`}
                    >
                      <span className="text-sm whitespace-nowrap">{item.name}</span>
                      <span className="text-lg">{item.badge}</span>
                    </div>
                    {isActive && !showText && (
                      <div className="absolute right-2 w-2 h-2 bg-white rounded-full animate-pulse" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="mt-6 flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-semibold shadow-md transition-all duration-200"
          >
            <LogOut size={18} />
            {(isMobile || isHovered) && <span>Logout</span>}
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;