// import React, { useEffect, useState } from "react";
// import { Wallet, TrendingUp, History, Download, Calendar, Award, IndianRupee, Filter, Zap, Trophy, Star } from "lucide-react";

// function Earnings() {
//   const [points, setPoints] = useState(0);
//   const [history, setHistory] = useState([]);
//   const [activeFilter, setActiveFilter] = useState("all");
//   const [showFilters, setShowFilters] = useState(false);
//   const [viewMode, setViewMode] = useState("table"); // 'table' or 'card'
//   const rate = 0.25; // 1 point = ₹0.25

//   useEffect(() => {
//     // Load total points
//     const storedPoints = parseInt(localStorage.getItem("totalPoints")) || 0;
//     setPoints(storedPoints);

//     // Load earnings history
//     const storedHistory = JSON.parse(localStorage.getItem("earningsHistory")) || [];
//     setHistory(storedHistory);
//   }, []);

//   const earnings = (points * rate).toFixed(2);

//   // Filter history based on active filter
//   const filteredHistory = history.filter(item => {
//     if (activeFilter === "all") return true;
//     return item.status?.toLowerCase() === activeFilter.toLowerCase();
//   });

//   // Calculate statistics
//   const totalEarned = history.reduce((sum, item) => sum + item.points, 0);
//   const pendingEarnings = history.filter(item => item.status === "Pending").reduce((sum, item) => sum + item.points, 0);
//   const redeemedEarnings = history.filter(item => item.status === "Redeemed").reduce((sum, item) => sum + item.points, 0);

//   const exportToCSV = () => {
//     const csvContent = [
//       ["Date", "Challenge", "Points", "Status", "Earnings (₹)"],
//       ...filteredHistory.map(item => [
//         item.date,
//         item.Challenge || item.challenge,
//         item.points,
//         item.status,
//         (item.points * rate).toFixed(2)
//       ])
//     ].map(row => row.join(",")).join("\n");

//     const blob = new Blob([csvContent], { type: "text/csv" });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "earnings-history.csv";
//     a.click();
//     window.URL.revokeObjectURL(url);
//   };

//   const getStatusColor = (status) => {
//     switch (status?.toLowerCase()) {
//       case "earned": return "bg-gradient-to-r from-green-500 to-emerald-600";
//       case "pending": return "bg-gradient-to-r from-yellow-500 to-amber-600";
//       case "redeemed": return "bg-gradient-to-r from-blue-500 to-cyan-600";
//       default: return "bg-gradient-to-r from-gray-500 to-gray-600";
//     }
//   };

//   const getStatusIcon = (status) => {
//     switch (status?.toLowerCase()) {
//       case "earned": return <Trophy size={14} />;
//       case "pending": return <Zap size={14} />;
//       case "redeemed": return <Star size={14} />;
//       default: return <Award size={14} />;
//     }
//   };

//   // Format date for better display
//   const formatDate = (dateString) => {
//     const options = { year: 'numeric', month: 'short', day: 'numeric' };
//     return new Date(dateString).toLocaleDateString('en-IN', options);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 lg:p-6 lg:ml-0 mt-16 lg:mt-0">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 lg:mb-8">
//           <div className="mb-4 lg:mb-0">
//             <div className="flex items-center gap-3 mb-2">
//               <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-2 rounded-xl">
//                 <Wallet className="text-white" size={28} />
//               </div>
//               <div>
//                 <h1 className="text-2xl lg:text-4xl font-bold text-gray-900">💰 Earnings & Points</h1>
//                 <p className="text-sm lg:text-lg text-gray-600 mt-1">Track your earnings and redemption history</p>
//               </div>
//             </div>
//           </div>

//           <div className="flex flex-wrap gap-3">
//             {/* View Mode Toggle */}
//             <div className="flex bg-white border border-gray-300 rounded-lg p-1">
//               <button
//                 onClick={() => setViewMode("table")}
//                 className={`px-3 py-1 rounded-md text-sm transition-all ${
//                   viewMode === "table" 
//                     ? "bg-indigo-600 text-white" 
//                     : "text-gray-600 hover:bg-gray-100"
//                 }`}
//               >
//                 Table
//               </button>
//               <button
//                 onClick={() => setViewMode("card")}
//                 className={`px-3 py-1 rounded-md text-sm transition-all ${
//                   viewMode === "card" 
//                     ? "bg-indigo-600 text-white" 
//                     : "text-gray-600 hover:bg-gray-100"
//                 }`}
//               >
//                 Cards
//               </button>
//             </div>

//             <button 
//               onClick={exportToCSV}
//               disabled={filteredHistory.length === 0}
//               className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-3 lg:px-4 py-2 rounded-lg hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               <Download size={16} />
//               <span className="hidden sm:inline">Export</span>
//             </button>

//             {/* Mobile Filter Toggle */}
//             <button 
//               onClick={() => setShowFilters(!showFilters)}
//               className="lg:hidden flex items-center gap-2 bg-white border border-gray-300 px-3 py-2 rounded-lg"
//             >
//               <Filter size={16} />
//               Filters
//             </button>
//           </div>
//         </div>

//         {/* Stats Overview Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 lg:gap-4 mb-6 lg:mb-8">
//           {/* Total Points Card */}
//           <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-4 lg:p-5 text-white shadow-lg">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-indigo-200 text-xs lg:text-sm mb-1">Total Points</p>
//                 <h2 className="text-xl lg:text-2xl font-bold">{points.toLocaleString()}</h2>
//               </div>
//               <div className="text-2xl bg-white/20 p-2 rounded-full">🏆</div>
//             </div>
//             <div className="flex items-center gap-1 text-indigo-200 text-xs mt-2">
//               <TrendingUp size={12} />
//               Lifetime accumulation
//             </div>
//           </div>

//           {/* Total Earnings Card */}
//           <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-4 lg:p-5 text-white shadow-lg">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-green-200 text-xs lg:text-sm mb-1">Total Earnings</p>
//                 <h2 className="text-xl lg:text-2xl font-bold">₹{earnings}</h2>
//               </div>
//               <div className="text-2xl bg-white/20 p-2 rounded-full">💵</div>
//             </div>
//             <div className="text-green-200 text-xs mt-2">Available for redemption</div>
//           </div>

//           {/* Points Earned Card */}
//           <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-4 lg:p-5 text-white shadow-lg">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-blue-200 text-xs lg:text-sm mb-1">Points Earned</p>
//                 <h2 className="text-xl lg:text-2xl font-bold">{totalEarned}</h2>
//               </div>
//               <div className="text-2xl bg-white/20 p-2 rounded-full">📈</div>
//             </div>
//             <div className="text-blue-200 text-xs mt-2">From challenges</div>
//           </div>

//           {/* Conversion Rate Card */}
//           <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl p-4 lg:p-5 text-white shadow-lg">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-amber-200 text-xs lg:text-sm mb-1">Conversion Rate</p>
//                 <h2 className="text-xl lg:text-2xl font-bold">1 = ₹{rate}</h2>
//               </div>
//               <div className="text-2xl bg-white/20 p-2 rounded-full">🔁</div>
//             </div>
//             <div className="text-amber-200 text-xs mt-2">Per point value</div>
//           </div>
//         </div>

//         {/* Filters Section */}
//         <div className={`bg-white rounded-xl shadow-lg p-4 lg:p-6 mb-6 lg:mb-8 ${showFilters ? 'block' : 'hidden lg:block'}`}>
//           <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
//             <div className="w-full">
//               <h3 className="font-semibold text-gray-900 mb-3 text-sm lg:text-base flex items-center gap-2">
//                 <Filter size={18} />
//                 Transaction History
//               </h3>
//               <div className="flex flex-wrap gap-2">
//                 {["all", "earned", "pending", "redeemed"].map((filter) => (
//                   <button
//                     key={filter}
//                     onClick={() => setActiveFilter(filter)}
//                     className={`px-3 py-2 rounded-lg text-xs lg:text-sm font-medium transition-all flex items-center gap-2 ${
//                       activeFilter === filter
//                         ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
//                         : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//                     }`}
//                   >
//                     {getStatusIcon(filter)}
//                     {filter.charAt(0).toUpperCase() + filter.slice(1)}
//                   </button>
//                 ))}
//               </div>
//             </div>
            
//             <div className="text-sm text-gray-600 whitespace-nowrap">
//               Showing {filteredHistory.length} of {history.length} transactions
//             </div>
//           </div>
//         </div>

//         {/* Earnings History */}
//         <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg overflow-hidden">
//           <div className="p-4 lg:p-6 border-b border-gray-200">
//             <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
//               <h2 className="text-xl lg:text-2xl font-bold text-gray-900 flex items-center gap-2">
//                 <History size={24} />
//                 Earnings History
//                 <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm font-normal">
//                   {filteredHistory.length}
//                 </span>
//               </h2>
              
//               {filteredHistory.length > 0 && (
//                 <div className="flex items-center gap-3">
//                   <span className="text-sm text-gray-600 hidden lg:block">
//                     View as:
//                   </span>
//                   <div className="flex bg-gray-100 rounded-lg p-1">
//                     <button
//                       onClick={() => setViewMode("table")}
//                       className={`px-3 py-1 rounded-md text-xs transition-all ${
//                         viewMode === "table" 
//                           ? "bg-white text-gray-900 shadow-sm" 
//                           : "text-gray-600 hover:text-gray-900"
//                       }`}
//                     >
//                       Table
//                     </button>
//                     <button
//                       onClick={() => setViewMode("card")}
//                       className={`px-3 py-1 rounded-md text-xs transition-all ${
//                         viewMode === "card" 
//                           ? "bg-white text-gray-900 shadow-sm" 
//                           : "text-gray-600 hover:text-gray-900"
//                       }`}
//                     >
//                       Cards
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {filteredHistory.length === 0 ? (
//             <div className="text-center py-12 lg:py-16">
//               <div className="text-6xl mb-4">📊</div>
//               <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">No transactions found</h3>
//               <p className="text-gray-600 mb-4 max-w-md mx-auto">
//                 {history.length === 0 
//                   ? "Start solving challenges to earn your first points and track your earnings here!" 
//                   : "No transactions match your current filter. Try selecting a different filter."}
//               </p>
//               {history.length === 0 && (
//                 <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition">
//                   Start Earning Points
//                 </button>
//               )}
//             </div>
//           ) : viewMode === "table" ? (
//             <div className="overflow-x-auto">
//               <table className="w-full">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Date
//                     </th>
//                     <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Challenge
//                     </th>
//                     <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Points
//                     </th>
//                     <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Earnings
//                     </th>
//                     <th className="px-3 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Status
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200">
//                   {filteredHistory
//                     .sort((a, b) => new Date(b.date) - new Date(a.date))
//                     .map((item, index) => (
//                       <tr key={index} className="hover:bg-gray-50 transition-colors">
//                         <td className="px-3 lg:px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm text-gray-900 flex items-center gap-2">
//                             <Calendar size={14} className="text-gray-400" />
//                             {formatDate(item.date)}
//                           </div>
//                         </td>
//                         <td className="px-3 lg:px-6 py-4">
//                           <div className="text-sm font-medium text-gray-900 max-w-[150px] lg:max-w-none truncate">
//                             {item.Challenge || item.challenge}
//                           </div>
//                         </td>
//                         <td className="px-3 lg:px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm font-bold text-green-600 flex items-center gap-1">
//                             +{item.points}
//                             <Award size={14} />
//                           </div>
//                         </td>
//                         <td className="px-3 lg:px-6 py-4 whitespace-nowrap">
//                           <div className="text-sm font-medium text-gray-900 flex items-center gap-1">
//                             <IndianRupee size={14} />
//                             {(item.points * rate).toFixed(2)}
//                           </div>
//                         </td>
//                         <td className="px-3 lg:px-6 py-4 whitespace-nowrap">
//                           <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(item.status)}`}>
//                             {getStatusIcon(item.status)}
//                             {item.status}
//                           </span>
//                         </td>
//                       </tr>
//                     ))}
//                 </tbody>
//               </table>
//             </div>
//           ) : (
//             // Card View
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 lg:p-6">
//               {filteredHistory
//                 .sort((a, b) => new Date(b.date) - new Date(a.date))
//                 .map((item, index) => (
//                   <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
//                     <div className="flex justify-between items-start mb-3">
//                       <div className="flex items-center gap-2">
//                         <div className={`p-2 rounded-lg text-white ${getStatusColor(item.status)}`}>
//                           {getStatusIcon(item.status)}
//                         </div>
//                         <div>
//                           <div className="text-sm font-medium text-gray-900">{item.Challenge || item.challenge}</div>
//                           <div className="text-xs text-gray-500 flex items-center gap-1">
//                             <Calendar size={12} />
//                             {formatDate(item.date)}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="grid grid-cols-2 gap-3">
//                       <div className="text-center">
//                         <div className="text-lg font-bold text-green-600">+{item.points}</div>
//                         <div className="text-xs text-gray-500">Points</div>
//                       </div>
//                       <div className="text-center">
//                         <div className="text-lg font-bold text-gray-900 flex items-center justify-center gap-1">
//                           <IndianRupee size={14} />
//                           {(item.points * rate).toFixed(2)}
//                         </div>
//                         <div className="text-xs text-gray-500">Earnings</div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//             </div>
//           )}
//         </div>

//         {/* Redeem Section */}
//         <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl lg:rounded-2xl p-6 text-white shadow-lg mt-6 lg:mt-8">
//           <div className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-6">
//             <div className="text-center lg:text-left">
//               <h3 className="text-lg lg:text-xl font-bold mb-2 flex items-center justify-center lg:justify-start gap-2">
//                 <Zap size={20} />
//                 Ready to Redeem?
//               </h3>
//               <p className="text-green-100 text-sm">
//                 You have ₹{earnings} available for redemption. Minimum redemption amount is ₹100.
//               </p>
//             </div>
//             <button 
//               className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 whitespace-nowrap ${
//                 parseFloat(earnings) >= 100
//                   ? "bg-white text-green-600 hover:bg-green-50 hover:scale-105 shadow-lg"
//                   : "bg-gray-300 text-gray-500 cursor-not-allowed"
//               }`}
//               disabled={parseFloat(earnings) < 100}
//             >
//               {parseFloat(earnings) >= 100 ? "Redeem Earnings 💳" : `Need ₹${(100 - parseFloat(earnings)).toFixed(2)} more`}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Earnings;



import React, { useEffect, useState } from "react";
import { Wallet, TrendingUp, History, Download, Calendar, Award, IndianRupee, Filter, Zap, Trophy, Star } from "lucide-react";

function Earnings() {
  const [points, setPoints] = useState(0);
  const [history, setHistory] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("card"); // Default to card for mobile
  const rate = 0.25;

  useEffect(() => {
    const storedPoints = parseInt(localStorage.getItem("totalPoints")) || 0;
    setPoints(storedPoints);
    const storedHistory = JSON.parse(localStorage.getItem("earningsHistory")) || [];
    setHistory(storedHistory);
  }, []);

  const earnings = (points * rate).toFixed(2);
  const filteredHistory = history.filter(item => 
    activeFilter === "all" || item.status?.toLowerCase() === activeFilter.toLowerCase()
  );
  const totalEarned = history.reduce((sum, item) => sum + item.points, 0);

  const exportToCSV = () => {
    const csvContent = [
      ["Date", "Challenge", "Points", "Status", "Earnings (₹)"],
      ...filteredHistory.map(item => [
        item.date,
        item.Challenge || item.challenge,
        item.points,
        item.status,
        (item.points * rate).toFixed(2)
      ])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "earnings-history.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "earned": return "bg-green-500";
      case "pending": return "bg-yellow-500";
      case "redeemed": return "bg-blue-500";
      default: return "bg-gray-500";
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short',
      year: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-3 sm:p-4 lg:p-6 mt-16 lg:mt-0">
      <div className="max-w-7xl mx-auto">
        {/* Header Section - Optimized for mobile */}
        <div className="mb-4 sm:mb-6">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-2 rounded-lg">
              <Wallet className="text-white" size={20} />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">💰 Earnings</h1>
          </div>
          <p className="text-xs sm:text-sm text-gray-600 ml-10">Track your earnings history</p>
        </div>

        {/* Stats Cards - Single column on mobile */}
        <div className="grid grid-cols-1 gap-2 sm:gap-3 mb-4 sm:mb-6">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-3 text-white shadow">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-indigo-200 text-xs mb-1">Total Points</p>
                <h2 className="text-lg sm:text-xl font-bold">{points.toLocaleString()}</h2>
                <p className="text-indigo-200 text-xs mt-1">₹{earnings}</p>
              </div>
              <div className="text-xl bg-white/20 p-1 rounded-full">🏆</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-3 text-white shadow">
              <p className="text-green-200 text-xs">Earned</p>
              <p className="text-sm sm:text-base font-bold">{totalEarned}</p>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg p-3 text-white shadow">
              <p className="text-blue-200 text-xs">Rate</p>
              <p className="text-sm sm:text-base font-bold">1 = ₹{rate}</p>
            </div>
          </div>
        </div>

        {/* Mobile Filter Bar */}
        <div className="flex gap-2 mb-3 sm:hidden">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex-1 flex items-center justify-center gap-1 bg-white border border-gray-300 px-2 py-2 rounded-lg text-xs"
          >
            <Filter size={14} />
            Filters
          </button>
          <button 
            onClick={exportToCSV}
            disabled={filteredHistory.length === 0}
            className="flex-1 flex items-center justify-center gap-1 bg-white border border-gray-300 px-2 py-2 rounded-lg text-xs disabled:opacity-50"
          >
            <Download size={14} />
            Export
          </button>
        </div>

        {/* Filters Section - Collapsible on mobile */}
        <div className={`bg-white rounded-lg shadow-sm p-3 mb-3 sm:mb-4 ${showFilters ? 'block' : 'hidden sm:block'}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-700">Filter by:</span>
            <span className="text-xs text-gray-500">{filteredHistory.length}/{history.length}</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {["all", "earned", "pending", "redeemed"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                  activeFilter === filter
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* View Toggle - Simplified for mobile */}
        {filteredHistory.length > 0 && (
          <div className="flex justify-center mb-3">
            <div className="bg-gray-100 rounded-lg p-1 flex">
              <button
                onClick={() => setViewMode("card")}
                className={`px-3 py-1 rounded text-xs transition-all ${
                  viewMode === "card" 
                    ? "bg-white text-gray-900 shadow-sm" 
                    : "text-gray-600"
                }`}
              >
                Cards
              </button>
              <button
                onClick={() => setViewMode("table")}
                className={`px-3 py-1 rounded text-xs transition-all ${
                  viewMode === "table" 
                    ? "bg-white text-gray-900 shadow-sm" 
                    : "text-gray-600"
                }`}
              >
                Table
              </button>
            </div>
          </div>
        )}

        {/* Earnings History */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="p-3 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-gray-900 flex items-center gap-1">
                <History size={16} />
                History
                <span className="bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded text-xs">
                  {filteredHistory.length}
                </span>
              </h2>
            </div>
          </div>

          {filteredHistory.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">📊</div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">No transactions</h3>
              <p className="text-xs text-gray-600 mb-3 px-4">
                {history.length === 0 
                  ? "Solve challenges to earn points!" 
                  : "No matches for current filter"}
              </p>
              {history.length === 0 && (
                <button className="bg-indigo-600 text-white px-4 py-1.5 rounded text-xs">
                  Start Earning
                </button>
              )}
            </div>
          ) : viewMode === "table" ? (
            // Mobile-optimized table
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-2 py-2 text-left text-gray-500 font-medium">Date</th>
                    <th className="px-2 py-2 text-left text-gray-500 font-medium">Challenge</th>
                    <th className="px-2 py-2 text-left text-gray-500 font-medium">Points</th>
                    <th className="px-2 py-2 text-left text-gray-500 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredHistory
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-2 py-2 whitespace-nowrap">
                          <div className="text-gray-900">{formatDate(item.date)}</div>
                        </td>
                        <td className="px-2 py-2 max-w-[80px]">
                          <div className="text-gray-900 truncate">{item.Challenge || item.challenge}</div>
                        </td>
                        <td className="px-2 py-2 whitespace-nowrap">
                          <div className="text-green-600 font-bold">+{item.points}</div>
                        </td>
                        <td className="px-2 py-2 whitespace-nowrap">
                          <span className={`inline-block w-2 h-2 rounded-full ${getStatusColor(item.status)}`}></span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            // Card View - Optimized for mobile
            <div className="p-2 space-y-2">
              {filteredHistory
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${getStatusColor(item.status)}`}></div>
                        <div>
                          <div className="text-xs font-medium text-gray-900 line-clamp-1">
                            {item.Challenge || item.challenge}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center gap-1">
                            <Calendar size={10} />
                            {formatDate(item.date)}
                          </div>
                        </div>
                      </div>
                      <div className="text-xs font-bold text-green-600">+{item.points}</div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="text-xs text-gray-600 flex items-center gap-1">
                        <IndianRupee size={10} />
                        {(item.points * rate).toFixed(2)}
                      </div>
                      <span className="text-xs text-gray-500 capitalize">{item.status}</span>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Redeem Section - Mobile optimized */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-4 text-white shadow mt-4">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Zap size={16} />
              <h3 className="text-sm font-bold">Ready to Redeem?</h3>
            </div>
            <p className="text-green-100 text-xs mb-2">
              ₹{earnings} available • Min ₹100 required
            </p>
            <button 
              className={`w-full py-2 rounded text-sm font-medium transition-all ${
                parseFloat(earnings) >= 100
                  ? "bg-white text-green-600 hover:bg-green-50"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={parseFloat(earnings) < 100}
            >
              {parseFloat(earnings) >= 100 ? "Redeem Now 💳" : `Need ₹${(100 - parseFloat(earnings)).toFixed(2)} more`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Earnings;