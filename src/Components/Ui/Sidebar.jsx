// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import {
//   LayoutDashboard,
//   Trophy,
//   ShoppingBag,
//   Users,
//   History,
//   Gift,
//   Settings,
//   Wallet,
//   Menu,
//   X,
// } from "lucide-react";

// const navItems = [
//   { name: "Dashboard", path: "/", icon: <LayoutDashboard size={18} /> },
//   { name: "Challenges", path: "/challenges", icon: <Trophy size={18} /> },
//   { name: "Earnings / Points", path: "/earnings", icon: <Wallet size={18} /> },
//   { name: "Marketplace", path: "/marketplace", icon: <ShoppingBag size={18} /> },
//   { name: "Leaderboard", path: "/leaderboard", icon: <Users size={18} /> },
//   { name: "History", path: "/history", icon: <History size={18} /> },
//   { name: "Referrals", path: "/referrals", icon: <Gift size={18} /> },
//   { name: "Settings", path: "/settings", icon: <Settings size={18} /> },
// ];

// function Sidebar() {
//   const { pathname } = useLocation();
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <>
//       {/* Top Navbar (for mobile toggle) */}
//       <div className="lg:hidden flex items-center justify-between bg-white p-4 shadow-md fixed top-0 left-0 right-0 z-50">
//         <h1 className="text-xl font-bold text-indigo-600">InfiCode</h1>
//         <button onClick={() => setIsOpen(!isOpen)} className="p-2">
//           {isOpen ? <X size={24} /> : <Menu size={24} />}
//         </button>
//       </div>

//       {/* Sidebar */}
//       <div
//         className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg border-r border-gray-200 p-6 transform transition-transform duration-300 z-40 
//         ${isOpen ? "translate-x-0" : "-translate-x-full"} 
//         lg:translate-x-0`}
//       >
//         {/* Heading (desktop only, hidden on mobile top navbar) */}
//         <h1 className="text-2xl font-bold text-indigo-600 mb-10 hidden lg:block">
//           InfiCode
//         </h1>

//         {/* Nav Links */}
//         <nav
//           className={`flex flex-col gap-2 ${
//             // 👇 ye margin sirf mobile pe (navbar ke niche ke liye)
//             "lg:mt-0 mt-16"
//           }`}
//         >
//           {navItems.map((item) => (
//             <Link
//               key={item.path}
//               to={item.path}
//               className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors ${
//                 pathname === item.path
//                   ? "bg-indigo-600 text-white"
//                   : "text-gray-700 hover:bg-gray-100"
//               }`}
//               onClick={() => setIsOpen(false)} // close on mobile click
//             >
//               {item.icon}
//               {item.name}
//             </Link>
//           ))}
//         </nav>
//       </div>

//       {/* Overlay (for mobile when sidebar open) */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 z-30 lg:hidden"
//           onClick={() => setIsOpen(false)}
//         />
//       )}
//     </>
//   );
// }

// export default Sidebar;


import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Trophy,
  ShoppingBag,
  Users,
  History,
  Gift,
  Settings,
  Wallet,
  Menu,
  X,
  Code,
  Zap,
  Sparkles,
  Crown,
  TrendingUp,
} from "lucide-react";

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
    name: "Earnings", 
    path: "/earnings", 
    icon: <Wallet size={22} />,
    badge: "💰",
    gradient: "from-amber-500 to-orange-500"
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
    name: "History", 
    path: "/history", 
    icon: <History size={22} />,
    badge: "📊",
    gradient: "from-indigo-500 to-blue-500"
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

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setIsOpen(false); // Close sidebar when switching to desktop
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Get user points for display
  const userPoints = parseInt(localStorage.getItem("totalPoints")) || 0;

  // Close sidebar when route changes on mobile
  useEffect(() => {
    if (isMobile) {
      setIsOpen(false);
    }
  }, [pathname, isMobile]);

  return (
    <>
      {/* Enhanced Mobile Header */}
      <div className="lg:hidden flex items-center justify-between bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 shadow-2xl fixed top-0 left-0 right-0 z-50">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-xl">
            <Code className="text-white" size={24} />
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

      {/* Backdrop Overlay for Mobile */}
      {isOpen && isMobile && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Enhanced Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-gray-900 to-gray-800 shadow-2xl border-r border-gray-700 z-50 transform transition-all duration-300 ease-in-out
        ${isMobile ? 'w-80' : 'w-24 hover:w-80'}
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        
        onMouseEnter={() => !isMobile && setIsHovered(true)}
        onMouseLeave={() => !isMobile && setIsHovered(false)}
      >
        <div className="p-4 h-full flex flex-col overflow-y-auto">
          {/* Logo Section */}
          <div className="flex items-center gap-3 mb-8 pb-4 border-b border-gray-700">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-2 rounded-xl min-w-[44px]">
              <Code className="text-white" size={28} />
            </div>
            <div className={`transition-all duration-300 overflow-hidden ${
              isMobile || isHovered ? 'opacity-100 w-auto' : 'opacity-0 w-0'
            }`}>
              <h1 className="text-xl font-bold text-white whitespace-nowrap">InfiCode</h1>
              <p className="text-gray-400 text-sm">Coding Platform</p>
            </div>
          </div>

          {/* User Points Card - Show only when expanded */}
          <div className={`mb-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-3 shadow-lg transition-all duration-300 ${
            isMobile || isHovered ? 'opacity-100 max-h-20' : 'opacity-0 max-h-0 overflow-hidden'
          }`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-indigo-200 text-xs">Your Points</p>
                <h2 className="text-lg font-bold text-white">{userPoints.toLocaleString()}</h2>
              </div>
              <div className="bg-white/20 p-1 rounded-full">
                <Wallet className="text-white" size={16} />
              </div>
            </div>
            <div className="mt-1 flex items-center gap-1 text-indigo-200 text-xs">
              <TrendingUp size={10} />
              <span>≈ ₹{(userPoints * 0.25).toLocaleString()}</span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="flex-1 flex flex-col gap-2">
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
                  } ${showText ? 'justify-start' : 'justify-center'}`}
                >
                  {/* Icon */}
                  <div className={`transition-all duration-200 ${
                    isActive 
                      ? 'bg-white/20' 
                      : 'bg-gray-700/50 group-hover:bg-gray-600'
                  } ${showText ? 'p-2 rounded-lg' : 'p-1'} min-w-[44px] flex justify-center`}>
                    {item.icon}
                  </div>
                  
                  {/* Text and Badge */}
                  <div className={`transition-all duration-300 overflow-hidden ${
                    showText ? 'opacity-100 w-auto ml-2' : 'opacity-0 w-0 ml-0'
                  } flex items-center justify-between flex-1`}>
                    <span className="text-sm whitespace-nowrap">{item.name}</span>
                    <span className="text-lg">{item.badge}</span>
                  </div>

                  {/* Active indicator for collapsed state */}
                  {isActive && !showText && (
                    <div className="absolute right-2 w-2 h-2 bg-white rounded-full animate-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom Progress Section */}
          <div className={`pt-4 border-t border-gray-700 transition-all duration-300 ${
            isMobile || isHovered ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'
          }`}>
            <div className="bg-gray-700/50 rounded-lg p-3">
              <div className="flex items-center justify-center gap-2 text-yellow-400 mb-2">
                <Sparkles size={14} />
                <span className="text-xs font-semibold">Pro Member</span>
              </div>
              <div className="w-full bg-gray-600 rounded-full h-1 mb-1">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-amber-500 h-1 rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min((userPoints / 5000) * 100, 100)}%` }}
                ></div>
              </div>
              <p className="text-gray-400 text-xs text-center">
                {Math.max(0, 5000 - userPoints)} to next level
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content margin adjustment for sidebar */}
      <style>{`
        @media (min-width: 1024px) {
          .main-content {
            margin-left: 6rem;
          }
          .sidebar-hover .main-content {
            margin-left: 20rem;
          }
        }
      `}</style>
    </>
  );
}

export default Sidebar;
