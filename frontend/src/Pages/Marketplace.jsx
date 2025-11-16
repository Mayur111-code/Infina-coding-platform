// src/pages/Marketplace.jsx
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Marketplace() {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [redeeming, setRedeeming] = useState({});
  const [userPoints, setUserPoints] = useState(0);

  // LOCAL API ONLY
  const API = "http://127.0.0.1:3000/api";

  useEffect(() => {
    fetchData();

    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
    setUserPoints(storedUser.points || storedUser.totalPoints || 0);
  }, []);

  // ⭐ Fetch Rewards
  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`https://infina-coding-platform-1.onrender.com/api/rewards`);
      const json = await res.json();

      if (!res.ok) throw new Error(json.message || "Failed to load rewards");

      setRewards(json.rewards || []);
    } catch (err) {
      console.error("Rewards fetch error:", err);
      toast.error(err.message || "Failed to load marketplace");
    } finally {
      setLoading(false);
    }
  };

  // ⭐ Redeem Reward
  const handleRedeem = async (rewardId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please sign in to redeem");
      return;
    }

    const reward = rewards.find((r) => r._id === rewardId);
    if (!reward) return;

    if ((userPoints || 0) < reward.pointsRequired) {
      toast.info("You don't have enough points to redeem this reward");
      return;
    }

    setRedeeming((prev) => ({ ...prev, [rewardId]: true }));

    try {
      const res = await fetch(`https://infina-coding-platform-1.onrender.com/api/rewards/redeem/${rewardId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Redeem failed");

      toast.success(json.message || "Redeemed successfully!");

      const updatedPoints = json.remainingPoints ?? json.remainingPoints;

      setUserPoints((prev) =>
        typeof updatedPoints === "number"
          ? updatedPoints
          : prev - reward.pointsRequired
      );

      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      if (storedUser) {
        storedUser.points =
          typeof updatedPoints === "number"
            ? updatedPoints
            : (storedUser.points || 0) - reward.pointsRequired;

        localStorage.setItem("user", JSON.stringify(storedUser));
      }
    } catch (err) {
      console.error("Redeem error:", err);
      toast.error(err.message || "Redeem failed");
    } finally {
      setRedeeming((prev) => ({ ...prev, [rewardId]: false }));
    }
  };




  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <h2 className="text-xl font-bold text-white">Loading Marketplace...</h2>
          <p className="text-blue-200 mt-2">Preparing amazing rewards! 🎁</p>
        </div>
      </div>
    );

  if (!rewards.length)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🏪</div>
          <h2 className="text-2xl font-bold text-white mb-2">Marketplace Empty</h2>
          <p className="text-blue-200">No rewards available yet. Check back soon! 🌟</p>
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

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3 mt-20">
            🏪 Reward Marketplace
          </h1>
          <p className="text-blue-200 text-lg">
            Exchange your hard-earned XP for amazing rewards! 🎁
          </p>
        </div>

        {/* Points Display */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-yellow-500/30">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="text-center lg:text-left mb-4 lg:mb-0">
              <h2 className="text-xl font-bold text-white mb-2">Your Treasure Chest</h2>
              <p className="text-blue-200">Earn more XP by solving coding challenges!</p>
            </div>
            <div className="bg-gradient-to-r from-yellow-500 to-orange-600 rounded-xl p-4 text-center min-w-[200px]">
              <div className="text-2xl mb-2">💰</div>
              <div className="text-sm text-white/80 font-semibold">Available Points</div>
              <div className="text-3xl font-bold text-white">{userPoints ?? 0} XP</div>
            </div>
          </div>
        </div>

        {/* Rewards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rewards.map((reward) => {
            const progress = Math.min(100, Math.round(((userPoints || 0) / reward.pointsRequired) * 100));
            const canRedeem = (userPoints || 0) >= reward.pointsRequired;
            
            return (
              <RewardCard 
                key={reward._id}
                reward={reward}
                progress={progress}
                canRedeem={canRedeem}
                isRedeeming={redeeming[reward._id]}
                userPoints={userPoints}
                onRedeem={handleRedeem}
              />
            );
          })}
        </div>

        {/* Motivational Footer */}
        <div className="text-center mt-8">
          <p className="text-gray-400 text-sm">
            🌟 Keep coding to unlock more amazing rewards! 
            {rewards.length > 0 && ` ${rewards.length} incredible rewards waiting for you!`}
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

// 🎁 Enhanced Reward Card Component
function RewardCard({ reward, progress, canRedeem, isRedeeming, userPoints, onRedeem }) {
  const getTierColor = (points) => {
    if (points >= 1000) return "from-purple-500 to-pink-600";
    if (points >= 500) return "from-red-500 to-orange-500";
    if (points >= 250) return "from-yellow-500 to-orange-500";
    return "from-green-500 to-emerald-600";
  };

  const getTierName = (points) => {
    if (points >= 1000) return "Legendary";
    if (points >= 500) return "Epic";
    if (points >= 250) return "Rare";
    return "Common";
  };

  return (
    <div className={`
      bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border overflow-hidden
      transform hover:scale-105 transition-all duration-300 group
      ${canRedeem ? "border-yellow-500/30 hover:border-yellow-400/50" : "border-blue-500/30 hover:border-blue-400/50"}
    `}>
      {/* Reward Image */}
      <div className="relative mb-4">
        <img 
          src={reward.image} 
          alt={reward.title}
          className="w-full h-48 object-cover rounded-xl border-2 border-gray-600 group-hover:border-yellow-400 transition-colors duration-300"
        />
        <div className="absolute top-3 right-3">
          <span className={`text-xs font-bold px-2 py-1 rounded-full bg-gradient-to-r ${getTierColor(reward.pointsRequired)} text-white`}>
            {getTierName(reward.pointsRequired)}
          </span>
        </div>
        {canRedeem && (
          <div className="absolute top-3 left-3">
            <span className="text-xs font-bold px-2 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-500/30">
              READY TO CLAIM! 🎉
            </span>
          </div>
        )}
      </div>

      {/* Reward Info */}
      <div className="mb-4">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors">
          {reward.title}
        </h3>
        <p className="text-gray-300 text-sm mb-3 line-clamp-2">
          {reward.description}
        </p>
        
        {/* Points Required */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-yellow-400 text-lg">💰</span>
            <span className="text-white font-bold text-xl">{reward.pointsRequired} XP</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-yellow-400 text-sm">⭐</span>
            <span className="text-gray-300 text-sm">{reward.rating ?? 4.5}</span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>Your Progress</span>
          <span>{Math.min(userPoints || 0, reward.pointsRequired)}/{reward.pointsRequired}</span>
        </div>
        <div className="w-full bg-gray-600 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-1000"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-xs text-gray-400 mt-1 text-center">
          {progress < 100 ? `${100 - progress}% more to go!` : "Ready to claim! 🎉"}
        </div>
      </div>

      {/* Redeem Button */}
      <button
        onClick={() => onRedeem(reward._id)}
        disabled={!canRedeem || isRedeeming}
        className={`
          w-full py-3 rounded-xl font-bold transition-all duration-300 relative overflow-hidden group
          ${canRedeem 
            ? "bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-600 hover:to-orange-700 text-white transform hover:scale-105 shadow-lg" 
            : "bg-gray-700 text-gray-400 cursor-not-allowed"
          }
        `}
      >
        {/* Animated background effect for redeemable items */}
        {canRedeem && !isRedeeming && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
        )}
        
        <span className="relative z-10 flex items-center justify-center gap-2">
          {isRedeeming ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              Processing...
            </>
          ) : canRedeem ? (
            <>
              🎁 Claim Reward
            </>
          ) : (
            <>
              🔒 Need More Points
            </>
          )}
        </span>
      </button>

      {/* Quick Stats */}
      <div className="flex justify-between items-center mt-3 text-xs text-gray-400">
        <span>Value: {Math.round(reward.pointsRequired * 0.25)}₹</span>
        <span>Tier: {getTierName(reward.pointsRequired)}</span>
      </div>
    </div>
  );
}