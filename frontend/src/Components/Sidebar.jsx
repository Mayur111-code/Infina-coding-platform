import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Trophy,
  ShoppingBag,
  Settings,
  Menu,
  X,
  Crown,
  Gift,
  LogOut,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { slideInLeft } from "../utils/motionVariants";

const navItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard, gradient: "from-blue-500 to-cyan-500", badge: "🏠" },
  { name: "Challenges", path: "/challenges", icon: Trophy, gradient: "from-emerald-500 to-teal-500", badge: "⚡" },
  { name: "Marketplace", path: "/marketplace", icon: ShoppingBag, gradient: "from-purple-500 to-pink-500", badge: "🛒" },
  { name: "Leaderboard", path: "/leaderboard", icon: Crown, gradient: "from-amber-500 to-orange-500", badge: "🏆" },
  { name: "Referrals", path: "/referrals", icon: Gift, gradient: "from-rose-500 to-pink-500", badge: "🎁" },
  { name: "Settings", path: "/settings", icon: Settings, gradient: "from-slate-500 to-gray-600", badge: "⚙️" },
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

  const showText = isMobile || isHovered;

  return (
    <>
      {/* Mobile Header */}
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="lg:hidden flex items-center justify-between bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 px-4 py-3 shadow-xl fixed top-0 left-0 right-0 z-50 backdrop-blur-md"
      >
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-xl ring-1 ring-white/30">
            <img src="/infina.jpg" alt="CodeOn Logo" className="w-6 h-6 object-contain" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white">CodeOn</h1>
            <p className="text-indigo-200 text-xs flex items-center gap-1">
              <Zap size={10} /> Learn • Earn • Grow
            </p>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-white/20 rounded-xl hover:bg-white/30 transition-colors ring-1 ring-white/20"
        >
          {isOpen ? <X className="text-white" size={20} /> : <Menu className="text-white" size={20} />}
        </motion.button>
      </motion.div>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && isMobile && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        variants={slideInLeft}
        initial={false}
        animate={isOpen || !isMobile ? "visible" : "exit"}
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-gray-900 via-gray-900 to-indigo-950 shadow-2xl border-r border-white/5 z-50
        ${isMobile ? "w-80" : "w-24 hover:w-80"}
        ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        transition-[width] duration-300 ease-out`}
      >
        <div className="p-4 h-full flex flex-col justify-between overflow-y-auto overflow-x-hidden">
          <div>
            {/* Logo */}
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/10">
              <motion.div
                whileHover={{ rotate: 5, scale: 1.05 }}
                className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-xl min-w-[44px] flex justify-center items-center shadow-lg shadow-indigo-500/25"
              >
                <img src="/infina.jpg" alt="CodeOn Logo" className="w-8 h-8 object-contain" />
              </motion.div>
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  showText ? "opacity-100 w-auto" : "opacity-0 w-0"
                }`}
              >
                <h1 className="text-xl font-bold text-white whitespace-nowrap">CodeOn</h1>
                <p className="text-gray-400 text-sm">Coding Platform</p>
              </div>
            </div>

            {/* Nav Items */}
            <nav className="flex flex-col gap-1.5">
              {navItems.map((item, index) => {
                const isActive = pathname === item.path;
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      className={`group relative flex items-center gap-3 px-3 py-3 rounded-xl font-medium transition-all duration-200 ${
                        isActive
                          ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg shadow-indigo-500/20`
                          : "text-gray-400 hover:bg-white/5 hover:text-white"
                      } ${showText ? "justify-start" : "justify-center"}`}
                    >
                      <div
                        className={`transition-all duration-200 ${
                          isActive ? "bg-white/20" : "bg-white/5 group-hover:bg-white/10"
                        } ${showText ? "p-2 rounded-lg" : "p-1.5"} min-w-[40px] flex justify-center`}
                      >
                        <Icon size={20} />
                      </div>
                      <div
                        className={`transition-all duration-300 overflow-hidden ${
                          showText ? "opacity-100 w-auto ml-1" : "opacity-0 w-0 ml-0"
                        } flex items-center justify-between flex-1`}
                      >
                        <span className="text-sm whitespace-nowrap">{item.name}</span>
                        <span className="text-base">{item.badge}</span>
                      </div>
                      {isActive && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute inset-0 rounded-xl bg-gradient-to-r opacity-0 -z-10"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>
          </div>

          {/* Logout */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogout}
            className="mt-6 flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 text-white py-2.5 px-4 rounded-xl font-semibold shadow-lg shadow-red-500/20 transition-all duration-200"
          >
            <LogOut size={18} />
            {showText && <span>Logout</span>}
          </motion.button>
        </div>
      </motion.div>
    </>
  );
}

export default Sidebar;
