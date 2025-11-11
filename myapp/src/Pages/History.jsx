// import React, { useState, useEffect } from "react";
// import { History, Award, Code, ShoppingBag, Clock, Filter, Calendar, TrendingUp, Zap, CheckCircle, XCircle } from "lucide-react";

// const HistoryComponent = () => {
//   const [activeTab, setActiveTab] = useState("all");
//   const [timeFilter, setTimeFilter] = useState("all");
//   const [historyData, setHistoryData] = useState([]);

//   // Sample history data
//   const sampleHistory = [
//     {
//       id: 1,
//       type: "challenge",
//       title: "React Hooks Challenge",
//       description: "Completed React Hooks quiz",
//       points: 50,
//       status: "completed",
//       date: "2024-01-20T10:30:00",
//       icon: "⚛️",
//       category: "react"
//     },
//     {
//       id: 2,
//       type: "redemption",
//       title: "Netflix Premium",
//       description: "Redeemed 1 month subscription",
//       points: -2076,
//       status: "active",
//       date: "2024-01-19T15:45:00",
//       icon: "🎬",
//       category: "entertainment"
//     },
//     {
//       id: 3,
//       type: "challenge",
//       title: "JavaScript Arrays",
//       description: "Solved array manipulation problems",
//       points: 30,
//       status: "completed",
//       date: "2024-01-18T14:20:00",
//       icon: "💻",
//       category: "javascript"
//     },
//     {
//       id: 4,
//       type: "earning",
//       title: "Referral Bonus",
//       description: "Friend joined using your code",
//       points: 50,
//       status: "completed",
//       date: "2024-01-17T09:15:00",
//       icon: "👥",
//       category: "referral"
//     },
//     {
//       id: 5,
//       type: "challenge",
//       title: "Python Algorithms",
//       description: "Failed to complete in time",
//       points: 0,
//       status: "failed",
//       date: "2024-01-16T16:30:00",
//       icon: "🐍",
//       category: "python"
//     },
//     {
//       id: 6,
//       type: "redemption",
//       title: "Amazon Prime",
//       description: "Redeemed annual subscription",
//       points: -3596,
//       status: "pending",
//       date: "2024-01-15T11:20:00",
//       icon: "📦",
//       category: "shopping"
//     },
//     {
//       id: 7,
//       type: "challenge",
//       title: "CSS Grid Layout",
//       description: "Mastered CSS Grid concepts",
//       points: 40,
//       status: "completed",
//       date: "2024-01-14T13:10:00",
//       icon: "🎨",
//       category: "css"
//     },
//     {
//       id: 8,
//       type: "earning",
//       title: "Daily Login Bonus",
//       description: "7-day consecutive login streak",
//       points: 25,
//       status: "completed",
//       date: "2024-01-13T08:00:00",
//       icon: "🔥",
//       category: "bonus"
//     }
//   ];

//   useEffect(() => {
//     // Load actual history from localStorage
//     const challengeHistory = JSON.parse(localStorage.getItem("earningsHistory")) || [];
//     const redemptionHistory = JSON.parse(localStorage.getItem("redemptionHistory")) || [];
    
//     // Transform and combine data
//     const transformedData = [
//       ...challengeHistory.map(item => ({
//         type: "challenge",
//         title: item.Challenge || item.challenge,
//         description: "Completed coding challenge",
//         points: item.points,
//         status: "completed",
//         date: item.date,
//         icon: "💻",
//         category: "challenge"
//       })),
//       ...redemptionHistory.map(item => ({
//         type: "redemption",
//         title: item.subscription,
//         description: "Redeemed points for subscription",
//         points: -item.pointsUsed,
//         status: item.status.toLowerCase(),
//         date: item.date,
//         icon: "🎁",
//         category: "redemption"
//       })),
//       ...sampleHistory // Fallback to sample data
//     ];

//     setHistoryData(transformedData.slice(0, 20)); // Limit to 20 items
//   }, []);

//   const tabs = [
//     { id: "all", name: "All Activity", icon: <History size={16} />, count: historyData.length },
//     { id: "challenge", name: "Challenges", icon: <Code size={16} />, count: historyData.filter(h => h.type === "challenge").length },
//     { id: "earning", name: "Earnings", icon: <Award size={16} />, count: historyData.filter(h => h.type === "earning").length },
//     { id: "redemption", name: "Redemptions", icon: <ShoppingBag size={16} />, count: historyData.filter(h => h.type === "redemption").length }
//   ];

//   const timeFilters = [
//     { id: "all", name: "All Time" },
//     { id: "today", name: "Today" },
//     { id: "week", name: "This Week" },
//     { id: "month", name: "This Month" }
//   ];

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "completed": return "bg-green-100 text-green-800 border-green-200";
//       case "active": return "bg-blue-100 text-blue-800 border-blue-200";
//       case "pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
//       case "failed": return "bg-red-100 text-red-800 border-red-200";
//       default: return "bg-gray-100 text-gray-800 border-gray-200";
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case "completed": return <CheckCircle size={14} />;
//       case "active": return <Zap size={14} />;
//       case "pending": return <Clock size={14} />;
//       case "failed": return <XCircle size={14} />;
//       default: return <Clock size={14} />;
//     }
//   };

//   const getPointsColor = (points) => {
//     return points >= 0 ? "text-green-600" : "text-red-600";
//   };

//   const getPointsPrefix = (points) => {
//     return points >= 0 ? "+" : "";
//   };

//   const filterByTime = (date) => {
//     const now = new Date();
//     const itemDate = new Date(date);
    
//     switch (timeFilter) {
//       case "today":
//         return itemDate.toDateString() === now.toDateString();
//       case "week":
//         const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
//         return itemDate >= startOfWeek;
//       case "month":
//         return itemDate.getMonth() === now.getMonth() && itemDate.getFullYear() === now.getFullYear();
//       default:
//         return true;
//     }
//   };

//   const filteredHistory = historyData
//     .filter(item => activeTab === "all" || item.type === activeTab)
//     .filter(item => filterByTime(item.date))
//     .sort((a, b) => new Date(b.date) - new Date(a.date));

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     const now = new Date();
//     const diffTime = Math.abs(now - date);
//     const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
//     if (diffDays === 0) {
//       return `Today at ${date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`;
//     } else if (diffDays === 1) {
//       return `Yesterday at ${date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}`;
//     } else if (diffDays < 7) {
//       return `${diffDays} days ago`;
//     } else {
//       return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
//     }
//   };

//   const totalPoints = filteredHistory.reduce((sum, item) => sum + item.points, 0);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 lg:p-6 lg:ml-0 mt-16 lg:mt-0">
//       <div className="max-w-6xl mx-auto">
//         {/* Header Section */}
//         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 lg:mb-8">
//           <div className="mb-4 lg:mb-0">
//             <div className="flex items-center gap-3 mb-2">
//               <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-2 rounded-xl">
//                 <History className="text-white" size={28} />
//               </div>
//               <h1 className="text-2xl lg:text-4xl font-bold text-gray-900">📊 Activity History</h1>
//             </div>
//             <p className="text-sm lg:text-lg text-gray-600">Track your learning journey and rewards</p>
//           </div>

//           {/* Points Summary */}
//           <div className="bg-white rounded-xl p-4 shadow-lg border border-gray-200">
//             <div className="text-center">
//               <p className="text-sm text-gray-600 mb-1">Net Points</p>
//               <p className={`text-xl lg:text-2xl font-bold ${getPointsColor(totalPoints)}`}>
//                 {getPointsPrefix(totalPoints)}{totalPoints}
//               </p>
//               <p className="text-xs text-gray-500 mt-1">in selected period</p>
//             </div>
//           </div>
//         </div>

//         {/* Stats Overview */}
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-6 lg:mb-8">
//           <div className="bg-white rounded-xl p-4 shadow-lg text-center">
//             <div className="text-2xl text-blue-600 mb-1">📈</div>
//             <div className="text-lg lg:text-xl font-bold text-gray-900">{historyData.length}</div>
//             <div className="text-xs text-gray-600">Total Activities</div>
//           </div>
          
//           <div className="bg-white rounded-xl p-4 shadow-lg text-center">
//             <div className="text-2xl text-green-600 mb-1">💻</div>
//             <div className="text-lg lg:text-xl font-bold text-gray-900">
//               {historyData.filter(h => h.type === "challenge").length}
//             </div>
//             <div className="text-xs text-gray-600">Challenges</div>
//           </div>
          
//           <div className="bg-white rounded-xl p-4 shadow-lg text-center">
//             <div className="text-2xl text-purple-600 mb-1">💰</div>
//             <div className="text-lg lg:text-xl font-bold text-gray-900">
//               {historyData.filter(h => h.type === "earning").length}
//             </div>
//             <div className="text-xs text-gray-600">Earnings</div>
//           </div>
          
//           <div className="bg-white rounded-xl p-4 shadow-lg text-center">
//             <div className="text-2xl text-orange-600 mb-1">🎁</div>
//             <div className="text-lg lg:text-xl font-bold text-gray-900">
//               {historyData.filter(h => h.type === "redemption").length}
//             </div>
//             <div className="text-xs text-gray-600">Redemptions</div>
//           </div>
//         </div>

//         {/* Filters Section */}
//         <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-4 lg:p-6 mb-6 lg:mb-8">
//           <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
//             <div className="w-full lg:w-auto">
//               <h3 className="font-semibold text-gray-900 mb-3 text-sm lg:text-base flex items-center gap-2">
//                 <Filter size={18} />
//                 Filter Activities
//               </h3>
              
//               {/* Category Tabs */}
//               <div className="flex flex-wrap gap-2 mb-4 lg:mb-0">
//                 {tabs.map((tab) => (
//                   <button
//                     key={tab.id}
//                     onClick={() => setActiveTab(tab.id)}
//                     className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs lg:text-sm font-medium transition-all ${
//                       activeTab === tab.id
//                         ? "bg-blue-600 text-white shadow-lg"
//                         : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                     }`}
//                   >
//                     {tab.icon}
//                     {tab.name}
//                     <span className="bg-white/20 px-1.5 py-0.5 rounded text-xs">
//                       {tab.count}
//                     </span>
//                   </button>
//                 ))}
//               </div>
//             </div>

//             {/* Time Filter */}
//             <div className="w-full lg:w-auto">
//               <div className="flex items-center gap-2 flex-wrap">
//                 <Calendar size={16} className="text-gray-500" />
//                 {timeFilters.map((filter) => (
//                   <button
//                     key={filter.id}
//                     onClick={() => setTimeFilter(filter.id)}
//                     className={`px-3 py-1 rounded text-xs transition-all ${
//                       timeFilter === filter.id
//                         ? "bg-gray-800 text-white"
//                         : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                     }`}
//                   >
//                     {filter.name}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* History List */}
//         <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg overflow-hidden">
//           <div className="p-4 lg:p-6 border-b border-gray-200">
//             <h2 className="text-xl lg:text-2xl font-bold text-gray-900 flex items-center gap-2">
//               <TrendingUp size={24} />
//               Recent Activity
//               <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm font-normal">
//                 {filteredHistory.length}
//               </span>
//             </h2>
//           </div>

//           {filteredHistory.length === 0 ? (
//             <div className="text-center py-12 lg:py-16">
//               <div className="text-6xl mb-4">📝</div>
//               <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">No activity found</h3>
//               <p className="text-gray-600 mb-4">
//                 {historyData.length === 0 
//                   ? "Start completing challenges to see your activity history!" 
//                   : "No activities match your current filters."}
//               </p>
//               {historyData.length === 0 && (
//                 <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition">
//                   Start Coding
//                 </button>
//               )}
//             </div>
//           ) : (
//             <div className="divide-y divide-gray-200">
//               {filteredHistory.map((item) => (
//                 <div key={item.id} className="p-4 lg:p-6 hover:bg-gray-50 transition-colors">
//                   <div className="flex items-start justify-between">
//                     <div className="flex items-start gap-4 flex-1">
//                       <div className="text-2xl mt-1">{item.icon}</div>
                      
//                       <div className="flex-1 min-w-0">
//                         <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
//                           <h3 className="font-semibold text-gray-900 text-sm lg:text-base">
//                             {item.title}
//                           </h3>
//                           <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
//                             {getStatusIcon(item.status)}
//                             {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
//                           </span>
//                         </div>
                        
//                         <p className="text-gray-600 text-xs lg:text-sm mb-2">
//                           {item.description}
//                         </p>
                        
//                         <div className="flex items-center gap-4 text-xs text-gray-500">
//                           <span className="flex items-center gap-1">
//                             <Calendar size={12} />
//                             {formatDate(item.date)}
//                           </span>
//                           <span className="capitalize">{item.category}</span>
//                         </div>
//                       </div>
//                     </div>

//                     <div className={`text-lg lg:text-xl font-bold ${getPointsColor(item.points)} whitespace-nowrap ml-4`}>
//                       {getPointsPrefix(item.points)}{item.points}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Load More Section */}
//         {filteredHistory.length > 0 && filteredHistory.length < historyData.length && (
//           <div className="text-center mt-6">
//             <button className="bg-white border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition">
//               Load More Activities
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default HistoryComponent;


import React, { useState } from "react";
import { History, Construction } from "lucide-react";

const HistoryComponent = () => {
  const [showComingSoon, setShowComingSoon] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 lg:p-6 lg:ml-0 mt-16 lg:mt-0">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-3 rounded-xl">
              <History className="text-white" size={32} />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">📊 Activity History</h1>
          </div>
          <p className="text-lg text-gray-600">Your complete learning journey and rewards timeline</p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 lg:p-12 text-center">
          {!showComingSoon ? (
            // Default View
            <div className="space-y-6">
              <div className="text-6xl mb-4">🚧</div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                History Section
              </h2>
              <p className="text-gray-600 text-lg mb-6 max-w-md mx-auto">
                We're building an amazing history section to track all your activities, challenges, and rewards in one place.
              </p>
              
              <button
                onClick={() => setShowComingSoon(true)}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3 rounded-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold"
              >
                Click to See Preview
              </button>
            </div>
          ) : (
            // Coming Soon View
            <div className="space-y-6 animate-pulse">
              <div className="flex justify-center">
                <Construction className="text-yellow-500" size={64} />
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold text-yellow-600 mb-4">
                🚧 Coming Soon 🚧
              </h2>
              <p className="text-gray-700 text-lg mb-4 font-semibold">
                We're working on this section!
              </p>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Our team is currently building a comprehensive history section that will include:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="text-blue-600 text-sm font-semibold">✓ Challenge History</div>
                  <div className="text-blue-500 text-xs mt-1">All your completed challenges</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <div className="text-green-600 text-sm font-semibold">✓ Earnings Timeline</div>
                  <div className="text-green-500 text-xs mt-1">Points earned over time</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <div className="text-purple-600 text-sm font-semibold">✓ Redemption History</div>
                  <div className="text-purple-500 text-xs mt-1">All your rewards claimed</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <div className="text-orange-600 text-sm font-semibold">✓ Progress Analytics</div>
                  <div className="text-orange-500 text-xs mt-1">Your learning journey</div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => setShowComingSoon(false)}
                  className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
                >
                  Go Back
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            Check back soon for updates! 
            <span className="text-blue-600 ml-2">🌟</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HistoryComponent;