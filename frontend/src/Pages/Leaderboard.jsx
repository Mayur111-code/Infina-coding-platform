import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch("https://infina-coding-platform-1.onrender.com/api/leaderboard");
        const data = await res.json();

        if (res.ok && data.success) {
          setUsers(data.users);
        } else {
          toast.error(data.message || "Failed to load leaderboard");
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        toast.error("Network error while fetching leaderboard");
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);



  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <h2 className="text-xl font-bold text-white ">Loading Leaderboard...</h2>
          <p className="text-blue-200 mt-2">Preparing the arena 🏆</p>
        </div>
      </div>
    );

  if (users.length === 0)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center ">
          <div className="text-6xl mb-4">🏆</div>
          <h2 className="text-2xl font-bold text-white mb-2 ">Leaderboard Empty</h2>
          <p className="text-blue-200">Be the first to climb the ranks! 🚀</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4 lg:p-6">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3 mt-20">
            🏆 Code Quest Leaderboard
          </h1>
          <p className="text-blue-200 text-lg">
            Compete, Learn, and Climb the Ranks! ⚡
          </p>
        </div>

        {/* Leaderboard Container */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-600/30 overflow-hidden">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <div className="grid grid-cols-12 gap-4 text-white font-bold text-sm lg:text-base">
              <div className="col-span-1 text-center">Rank</div>
              <div className="col-span-7 lg:col-span-8">Coder</div>
              <div className="col-span-4 lg:col-span-3 text-center">XP Points</div>
            </div>
          </div>

          {/* Leaderboard List */}
          <div className="divide-y divide-gray-600/30">
            {users.map((user, index) => (
              <LeaderboardRow 
                key={user._id} 
                user={user} 
                rank={index + 1} 
                isTopThree={index < 3}
              />
            ))}
          </div>
        </div>

        {/* Stats Footer */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 text-center border border-yellow-500/30">
            <div className="text-2xl mb-2">👑</div>
            <h3 className="text-white font-bold">Top Coder</h3>
            <p className="text-yellow-300 text-sm">{users[0]?.username || "N/A"}</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 text-center border border-blue-500/30">
            <div className="text-2xl mb-2">🚀</div>
            <h3 className="text-white font-bold">Total Competitors</h3>
            <p className="text-blue-300 text-sm">{users.length} Coders</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 text-center border border-green-500/30">
            <div className="text-2xl mb-2">⭐</div>
            <h3 className="text-white font-bold">Highest Score</h3>
            <p className="text-green-300 text-sm">{users[0]?.points || 0} XP</p>
          </div>
        </div>

        {/* Motivational Message */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">
            🌟 Every great coder was once a beginner. Keep solving! 
            {users.length > 0 && ` ${users[users.length - 1]?.username} is currently in #${users.length} place.`}
          </p>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
}

// 🏆 Enhanced Leaderboard Row Component
function LeaderboardRow({ user, rank, isTopThree }) {
  const getRankColor = () => {
    switch (rank) {
      case 1: return "from-yellow-500 to-orange-500";
      case 2: return "from-gray-400 to-gray-600";
      case 3: return "from-orange-400 to-red-500";
      default: return "from-blue-500 to-purple-600";
    }
  };

  const getRankIcon = () => {
    switch (rank) {
      case 1: return "🥇";
      case 2: return "🥈";
      case 3: return "🥉";
      default: return `#${rank}`;
    }
  };

  const getTier = (points) => {
    if (points >= 1000) return { name: "Grand Master", color: "text-purple-400" };
    if (points >= 750) return { name: "Master", color: "text-red-400" };
    if (points >= 500) return { name: "Expert", color: "text-orange-400" };
    if (points >= 250) return { name: "Advanced", color: "text-yellow-400" };
    if (points >= 100) return { name: "Intermediate", color: "text-green-400" };
    return { name: "Beginner", color: "text-blue-400" };
  };

  const tier = getTier(user.points || 0);

  return (
    <div className={`
      group p-4 lg:p-6 transition-all duration-300 transform hover:scale-105 hover:bg-gray-700/50
      ${isTopThree ? 'bg-gradient-to-r from-gray-700/50 to-gray-600/30' : 'bg-transparent'}
      border-l-4 ${rank === 1 ? 'border-yellow-400' : rank === 2 ? 'border-gray-400' : rank === 3 ? 'border-orange-400' : 'border-blue-500'}
    `}>
      <div className="grid grid-cols-12 gap-4 items-center">
        {/* Rank */}
        <div className="col-span-2 lg:col-span-1 flex justify-center">
          <div className={`
            w-12 h-12 rounded-full flex items-center justify-center font-bold text-white
            bg-gradient-to-br ${getRankColor()} shadow-lg group-hover:scale-110 transition-transform duration-300
          `}>
            {getRankIcon()}
          </div>
        </div>

        {/* User Info */}
        <div className="col-span-7 lg:col-span-8">
          <div className="flex items-center gap-3 lg:gap-4">
            <div className="relative">
              <img
                src={
                  user.userprofile && user.userprofile !== "null"
                    ? user.userprofile
                    : `https://ui-avatars.com/api/?name=${user.username}&background=6366f1&color=fff&bold=true&size=128`
                }
                alt={user.username}
                className="w-12 h-12 lg:w-14 lg:h-14 rounded-full border-2 border-yellow-400 group-hover:border-green-400 transition-colors duration-300"
              />
              {isTopThree && (
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold">🔥</span>
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-white font-bold text-lg lg:text-xl truncate">
                  {user.username}
                </h3>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${tier.color} bg-gray-700/50`}>
                  {tier.name}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400 text-sm">⭐</span>
                  <span className="text-gray-300 text-sm">
                    Level {Math.floor((user.points || 0) / 100) + 1}
                  </span>
                </div>
                <span className="text-gray-500">•</span>
                <span className="text-green-400 text-sm">
                  {user.solvedChallenges?.length || 0} challenges
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Points */}
        <div className="col-span-3 lg:col-span-3 text-center">
          <div className="bg-gray-700/50 rounded-xl p-3 group-hover:bg-gray-600/50 transition-colors duration-300">
            <div className="text-2xl lg:text-3xl font-bold text-white mb-1">
              {user.points || 0}
            </div>
            <div className="text-xs text-gray-300 font-semibold">
              XP POINTS
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar for Top 3 */}
      {isTopThree && (
        <div className="mt-3">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Progress to next tier</span>
            <span>{((user.points || 0) / 1000 * 100).toFixed(1)}%</span>
          </div>
          <div className="w-full bg-gray-600 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${Math.min(((user.points || 0) / 1000 * 100), 100)}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
}