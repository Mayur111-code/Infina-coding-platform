import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Marketplace() {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [redeeming, setRedeeming] = useState({});
  const [userPoints, setUserPoints] = useState(0);

  const API = "https://infina-coding-platform-3.onrender.com/api";

  useEffect(() => {
    fetchData();
    updateUserPoints();
  }, []);

  const updateUserPoints = () => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      setUserPoints(storedUser.points || storedUser.totalPoints || 0);
    } catch (err) {
      console.error("Error reading user data:", err);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/rewards`);
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

  const handleRedeem = async (rewardId) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please sign in to redeem rewards");
      return;
    }

    const reward = rewards.find((r) => r._id === rewardId);
    if (!reward) return;

    if ((userPoints || 0) < reward.pointsRequired) {
      toast.info("You don't have enough points for this reward");
      return;
    }

    setRedeeming((prev) => ({ ...prev, [rewardId]: true }));

    try {
      const res = await fetch(`${API}/rewards/redeem/${rewardId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Redemption failed");

      toast.success(json.message || "Reward redeemed successfully!");

      const updatedPoints = json.remainingPoints ?? (userPoints - reward.pointsRequired);
      setUserPoints(updatedPoints);

      // Update localStorage
      const storedUser = JSON.parse(localStorage.getItem("user") || "{}");
      if (storedUser) {
        storedUser.points = updatedPoints;
        localStorage.setItem("user", JSON.stringify(storedUser));
      }
    } catch (err) {
      console.error("Redeem error:", err);
      toast.error(err.message || "Redemption failed");
    } finally {
      setRedeeming((prev) => ({ ...prev, [rewardId]: false }));
    }
  };

  if (loading) return <LoadingSpinner />;
  if (!rewards.length) return <EmptyMarketplace />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Rewards Marketplace
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Exchange your XP points for amazing rewards
          </p>
        </div>

        {/* Points Display */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="font-semibold text-gray-900 dark:text-white mb-1">Your Balance</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Earn more points by solving coding challenges
              </p>
            </div>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-200 dark:border-blue-800 rounded-lg px-6 py-4 text-center">
              <div className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Available Points</div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{userPoints} XP</div>
            </div>
          </div>
        </div>

        {/* Rewards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
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

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-600 dark:text-gray-400">
          <p>
            Keep solving challenges to earn more points and unlock better rewards!
          </p>
        </div>
      </div>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Loading Marketplace</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Loading rewards...</p>
      </div>
    </div>
  );
}

function EmptyMarketplace() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-4 text-gray-300 dark:text-gray-600">🏪</div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Rewards Available</h2>
        <p className="text-gray-600 dark:text-gray-400">Check back soon for new rewards!</p>
      </div>
    </div>
  );
}

function RewardCard({ reward, progress, canRedeem, isRedeeming, userPoints, onRedeem }) {
  const getTierInfo = (points) => {
    if (points >= 1000) return { 
      color: "bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400",
      name: "Premium"
    };
    if (points >= 500) return { 
      color: "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400",
      name: "Epic"
    };
    if (points >= 250) return { 
      color: "bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400",
      name: "Rare"
    };
    return { 
      color: "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400",
      name: "Common"
    };
  };

  const tierInfo = getTierInfo(reward.pointsRequired);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden transition-shadow hover:shadow-md">
      {/* Reward Image */}
      <div className="relative h-48 bg-gray-100 dark:bg-gray-900">
        <img 
          src={reward.image} 
          alt={reward.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <span className={`text-xs font-medium px-2 py-1 rounded ${tierInfo.color}`}>
            {tierInfo.name}
          </span>
        </div>
      </div>

      {/* Reward Info */}
      <div className="p-5">
        <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">
          {reward.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {reward.description}
        </p>

        {/* Points Required */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-blue-500">•</span>
            <span className="font-bold text-gray-900 dark:text-white">{reward.pointsRequired} XP</span>
          </div>
          {reward.rating && (
            <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
              <span>⭐ {reward.rating}</span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
            <span>Progress</span>
            <span>{Math.min(userPoints, reward.pointsRequired)}/{reward.pointsRequired}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {progress < 100 ? `${100 - progress}% more needed` : "Ready to claim"}
          </div>
        </div>

        {/* Redeem Button */}
        <button
          onClick={() => onRedeem(reward._id)}
          disabled={!canRedeem || isRedeeming}
          className={`
            w-full py-3 rounded-lg font-medium transition-colors
            ${canRedeem 
              ? "bg-blue-600 hover:bg-blue-700 text-white" 
              : "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed"
            }
          `}
        >
          {isRedeeming ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Processing...
            </span>
          ) : canRedeem ? (
            <span className="flex items-center justify-center gap-2">
              Claim Reward
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              Need More Points
            </span>
          )}
        </button>
      </div>
    </div>
  );
}