import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Coins, Loader2, Sparkles } from "lucide-react";
import PageTransition, { AnimatedHeader, StaggerGrid, StaggerItem } from "../Components/ui/PageTransition";
import { MarketplaceSkeleton } from "../Components/ui/Skeleton";

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

      const updatedPoints = json.remainingPoints ?? userPoints - reward.pointsRequired;
      setUserPoints(updatedPoints);

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

  if (loading) return <MarketplaceSkeleton />;

  if (!rewards.length) return <EmptyMarketplace />;

  return (
    <PageTransition className="p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <AnimatedHeader
          title="Rewards Marketplace"
          subtitle="Exchange your XP points for amazing rewards"
        />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 rounded-2xl p-6 mb-8 shadow-xl shadow-indigo-500/20"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
          <div className="relative flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="font-semibold text-white mb-1 flex items-center gap-2">
                <Sparkles size={18} /> Your Balance
              </h2>
              <p className="text-indigo-200 text-sm">Earn more points by solving coding challenges</p>
            </div>
            <div className="bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl px-8 py-4 text-center">
              <div className="text-sm font-medium text-indigo-200 mb-1 flex items-center justify-center gap-1">
                <Coins size={14} /> Available Points
              </div>
              <motion.div
                key={userPoints}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-4xl font-bold text-white"
              >
                {userPoints} XP
              </motion.div>
            </div>
          </div>
        </motion.div>

        <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {rewards.map((reward) => {
            const progress = Math.min(100, Math.round(((userPoints || 0) / reward.pointsRequired) * 100));
            const canRedeem = (userPoints || 0) >= reward.pointsRequired;

            return (
              <StaggerItem key={reward._id}>
                <RewardCard
                  reward={reward}
                  progress={progress}
                  canRedeem={canRedeem}
                  isRedeeming={redeeming[reward._id]}
                  userPoints={userPoints}
                  onRedeem={handleRedeem}
                />
              </StaggerItem>
            );
          })}
        </StaggerGrid>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 text-sm text-gray-500 dark:text-gray-400"
        >
          Keep solving challenges to earn more points and unlock better rewards!
        </motion.p>
      </div>
    </PageTransition>
  );
}

function EmptyMarketplace() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
        <div className="text-5xl mb-4">🏪</div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Rewards Available</h2>
        <p className="text-gray-600 dark:text-gray-400">Check back soon for new rewards!</p>
      </motion.div>
    </div>
  );
}

function RewardCard({ reward, progress, canRedeem, isRedeeming, userPoints, onRedeem }) {
  const getTierInfo = (points) => {
    if (points >= 1000) return { color: "bg-purple-500/90 text-white", name: "Premium" };
    if (points >= 500) return { color: "bg-red-500/90 text-white", name: "Epic" };
    if (points >= 250) return { color: "bg-orange-500/90 text-white", name: "Rare" };
    return { color: "bg-emerald-500/90 text-white", name: "Common" };
  };

  const tierInfo = getTierInfo(reward.pointsRequired);

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/60 dark:border-gray-700/60 overflow-hidden hover:shadow-xl hover:shadow-indigo-500/10 transition-shadow group"
    >
      <div className="relative h-48 bg-gray-100 dark:bg-gray-900 overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.08 }}
          transition={{ duration: 0.4 }}
          src={reward.image}
          alt={reward.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 right-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg backdrop-blur-sm ${tierInfo.color}`}>
            {tierInfo.name}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2">{reward.title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">{reward.description}</p>

        <div className="flex items-center justify-between mb-4">
          <span className="font-bold text-indigo-600 dark:text-indigo-400">{reward.pointsRequired} XP</span>
          {reward.rating && <span className="text-sm text-gray-500">⭐ {reward.rating}</span>}
        </div>

        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
            <span>Progress</span>
            <span>{Math.min(userPoints, reward.pointsRequired)}/{reward.pointsRequired}</span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full"
            />
          </div>
          <div className="text-xs text-gray-400 mt-1">
            {progress < 100 ? `${100 - progress}% more needed` : "Ready to claim!"}
          </div>
        </div>

        <motion.button
          whileHover={canRedeem && !isRedeeming ? { scale: 1.02 } : {}}
          whileTap={canRedeem && !isRedeeming ? { scale: 0.98 } : {}}
          onClick={() => onRedeem(reward._id)}
          disabled={!canRedeem || isRedeeming}
          className={`w-full py-3 rounded-xl font-medium transition-all duration-200 ${
            canRedeem
              ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/25"
              : "bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
        >
          {isRedeeming ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 size={16} className="animate-spin" /> Processing...
            </span>
          ) : canRedeem ? (
            "Claim Reward"
          ) : (
            "Need More Points"
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
