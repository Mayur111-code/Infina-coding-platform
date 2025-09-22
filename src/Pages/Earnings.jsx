// import React, { useEffect, useState } from "react"

// const Earnings =  (()=>{
//   const [points, setPoints] = useState(0);
//   const [history, setHistory] = useState([]);
//   const rate = 0.25;

//   useEffect(()=>{
//     const
//   })
// })

import React, { useEffect, useState } from "react";
import { Wallet, TrendingUp, History, Download, Calendar, Award, IndianRupee } from "lucide-react";

function Earnings() {
  const [points, setPoints] = useState(0);
  const [history, setHistory] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const rate = 0.25; // 1 point = ₹0.25

  useEffect(() => {
    // Load total points
    const storedPoints = parseInt(localStorage.getItem("totalPoints")) || 0;
    setPoints(storedPoints);

    // Load earnings history
    const storedHistory = JSON.parse(localStorage.getItem("earningsHistory")) || [];
    setHistory(storedHistory);
  }, []);

  const earnings = (points * rate).toFixed(2);

  // Filter history based on active filter
  const filteredHistory = history.filter(item => {
    if (activeFilter === "all") return true;
    return item.status?.toLowerCase() === activeFilter.toLowerCase();
  });

  // Calculate statistics
  const totalEarned = history.reduce((sum, item) => sum + item.points, 0);
  const pendingEarnings = history.filter(item => item.status === "Pending").reduce((sum, item) => sum + item.points, 0);

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
      case "earned": return "text-green-600 bg-green-100";
      case "pending": return "text-yellow-600 bg-yellow-100";
      case "redeemed": return "text-blue-600 bg-blue-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 lg:p-6 lg:ml-0 mt-16 lg:mt-0">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 lg:mb-8">
          <div className="mb-4 lg:mb-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-2 rounded-xl">
                <Wallet className="text-white" size={28} />
              </div>
              <h1 className="text-2xl lg:text-4xl font-bold text-gray-900">💰 Earnings & Points</h1>
            </div>
            <p className="text-sm lg:text-lg text-gray-600">Track your earnings and redemption history</p>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={exportToCSV}
              className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-all"
            >
              <Download size={18} />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
          </div>
        </div>

        {/* Stats Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
          {/* Total Points Card */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-indigo-200 text-xs lg:text-sm mb-1">Total Points</p>
                <h2 className="text-2xl lg:text-3xl font-bold">{points.toLocaleString()}</h2>
                <p className="text-indigo-200 text-xs lg:text-sm mt-2">Lifetime accumulation</p>
              </div>
              <div className="text-2xl lg:text-3xl bg-white/20 p-2 lg:p-3 rounded-full">🏆</div>
            </div>
          </div>

          {/* Total Earnings Card */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-green-200 text-xs lg:text-sm mb-1">Total Earnings</p>
                <h2 className="text-2xl lg:text-3xl font-bold">₹ {earnings}</h2>
                <p className="text-green-200 text-xs lg:text-sm mt-2">Available for redemption</p>
              </div>
              <div className="text-2xl lg:text-3xl bg-white/20 p-2 lg:p-3 rounded-full">💵</div>
            </div>
          </div>

          {/* Conversion Rate Card */}
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-amber-200 text-xs lg:text-sm mb-1">Conversion Rate</p>
                <h2 className="text-2xl lg:text-3xl font-bold">1 = ₹{rate}</h2>
                <p className="text-amber-200 text-xs lg:text-sm mt-2">Point value</p>
              </div>
              <div className="text-2xl lg:text-3xl bg-white/20 p-2 lg:p-3 rounded-full">🔁</div>
            </div>
          </div>

          {/* Points Earned Card */}
          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-200 text-xs lg:text-sm mb-1">Points Earned</p>
                <h2 className="text-2xl lg:text-3xl font-bold">{totalEarned}</h2>
                <p className="text-blue-200 text-xs lg:text-sm mt-2">From challenges</p>
              </div>
              <div className="text-2xl lg:text-3xl bg-white/20 p-2 lg:p-3 rounded-full">📈</div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-4 lg:p-6 mb-6 lg:mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3 text-sm lg:text-base">Transaction History</h3>
              <div className="flex flex-wrap gap-2">
                {["all", "earned", "pending", "redeemed"].map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-3 py-1 rounded-full text-xs lg:text-sm font-medium transition-all ${
                      activeFilter === filter
                        ? "bg-indigo-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="text-sm text-gray-600">
              Showing {filteredHistory.length} of {history.length} transactions
            </div>
          </div>
        </div>

        {/* Earnings History */}
        <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg overflow-hidden">
          <div className="p-4 lg:p-6 border-b border-gray-200">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 flex items-center gap-2">
                <History size={24} />
                Earnings History
              </h2>
              
              {filteredHistory.length > 0 && (
                <button 
                  onClick={exportToCSV}
                  className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all text-sm"
                >
                  <Download size={16} />
                  Export CSV
                </button>
              )}
            </div>
          </div>

          {filteredHistory.length === 0 ? (
            <div className="text-center py-12 lg:py-16">
              <div className="text-6xl mb-4">📊</div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">No transactions found</h3>
              <p className="text-gray-600 mb-4">
                {history.length === 0 
                  ? "Start solving challenges to earn your first points!" 
                  : "No transactions match your current filter."}
              </p>
              {history.length === 0 && (
                <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition">
                  Start Earning Points
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        Date
                      </div>
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Challenge
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Points
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Earnings
                    </th>
                    <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredHistory
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{item.date}</div>
                        </td>
                        <td className="px-4 lg:px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {item.Challenge || item.challenge}
                          </div>
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-green-600 flex items-center gap-1">
                            +{item.points}
                            <Award size={14} />
                          </div>
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 flex items-center gap-1">
                            <IndianRupee size={14} />
                            {(item.points * rate).toFixed(2)}
                          </div>
                        </td>
                        <td className="px-4 lg:px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Redeem Section */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl lg:rounded-2xl p-6 lg:p-8 text-white shadow-lg mt-6 lg:mt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div>
              <h3 className="text-xl lg:text-2xl font-bold mb-2">Ready to Redeem?</h3>
              <p className="text-green-100 text-sm lg:text-base">
                You have ₹{earnings} available for redemption. Minimum redemption amount is ₹100.
              </p>
            </div>
            <button 
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                parseFloat(earnings) >= 100
                  ? "bg-white text-green-600 hover:bg-green-50 hover:scale-105"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={parseFloat(earnings) < 100}
            >
              {parseFloat(earnings) >= 100 ? "Redeem Earnings 💳" : `Need ₹${(100 - parseFloat(earnings)).toFixed(2)} more`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Earnings;