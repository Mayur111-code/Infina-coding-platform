import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Crown, Rocket, Star } from "lucide-react";
import PageTransition, { AnimatedHeader, StaggerGrid, StaggerItem } from "../Components/ui/PageTransition";
import { LeaderboardSkeleton } from "../Components/ui/Skeleton";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await fetch("https://infina-coding-platform-3.onrender.com/api/leaderboard");
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

  if (loading) return <LeaderboardSkeleton />;
  if (users.length === 0) return <EmptyLeaderboard />;

  const topThree = users.slice(0, 3);
  const rest = users.slice(3);

  return (
    <PageTransition className="p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <AnimatedHeader
          title="Leaderboard"
          subtitle="See where you stand among other coders"
        />

        <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {[
            { title: "Top Coder", value: users[0]?.username || "N/A", icon: Crown, gradient: "from-amber-500 to-yellow-500" },
            { title: "Total Competitors", value: `${users.length}`, icon: Rocket, gradient: "from-blue-500 to-cyan-500" },
            { title: "Highest Score", value: `${users[0]?.points || 0} XP`, icon: Star, gradient: "from-emerald-500 to-teal-500" },
          ].map((stat) => (
            <StaggerItem key={stat.title}>
              <motion.div
                whileHover={{ y: -3 }}
                className="rounded-2xl p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/60 dark:border-gray-700/60 flex items-center gap-3"
              >
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.gradient} text-white shadow-lg`}>
                  <stat.icon size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">{stat.value}</p>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGrid>

        {/* Podium for top 3 */}
        {topThree.length >= 3 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-end justify-center gap-4 mb-8 px-4"
          >
            <PodiumCard user={topThree[1]} rank={2} height="h-28" delay={0.1} />
            <PodiumCard user={topThree[0]} rank={1} height="h-36" delay={0} isWinner />
            <PodiumCard user={topThree[2]} rank={3} height="h-24" delay={0.2} />
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/60 dark:border-gray-700/60 shadow-sm overflow-hidden mb-6"
        >
          <div className="bg-gradient-to-r from-indigo-600/10 to-purple-600/10 dark:from-indigo-600/20 dark:to-purple-600/20 px-6 py-4 border-b border-gray-200/60 dark:border-gray-700/60">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-2 text-center text-sm font-semibold text-gray-600 dark:text-gray-300">Rank</div>
              <div className="col-span-7 text-sm font-semibold text-gray-600 dark:text-gray-300">Coder</div>
              <div className="col-span-3 text-center text-sm font-semibold text-gray-600 dark:text-gray-300">XP Points</div>
            </div>
          </div>

          <div className="divide-y divide-gray-100 dark:divide-gray-700/50">
            {(topThree.length < 3 ? users : rest).map((user, index) => (
              <LeaderboardRow
                key={user._id}
                user={user}
                rank={topThree.length < 3 ? index + 1 : index + 4}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-gray-500 dark:text-gray-400"
        >
          {users.length > 0 &&
            `${users[users.length - 1]?.username || "Last coder"} is currently in #${users.length} place. `}
          Keep coding to climb the ranks!
        </motion.p>
      </div>
    </PageTransition>
  );
}

function PodiumCard({ user, rank, height, delay, isWinner }) {
  const medals = { 1: "🥇", 2: "🥈", 3: "🥉" };
  const gradients = {
    1: "from-amber-400 to-yellow-500",
    2: "from-gray-300 to-gray-400",
    3: "from-orange-400 to-amber-600",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 200 }}
      className={`flex flex-col items-center ${isWinner ? "order-2" : rank === 2 ? "order-1" : "order-3"}`}
    >
      <img
        src={
          user.userprofile && user.userprofile !== "null"
            ? user.userprofile
            : `https://ui-avatars.com/api/?name=${user.username}&background=6366f1&color=fff&bold=true`
        }
        alt={user.username}
        className={`rounded-full border-4 border-white dark:border-gray-800 shadow-lg mb-2 ${isWinner ? "w-16 h-16 ring-4 ring-amber-400/50" : "w-12 h-12"}`}
      />
      <p className="font-semibold text-gray-900 dark:text-white text-sm truncate max-w-[100px]">{user.username}</p>
      <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold mb-2">{user.points} XP</p>
      <div className={`w-24 ${height} bg-gradient-to-t ${gradients[rank]} rounded-t-xl flex items-start justify-center pt-3 shadow-lg`}>
        <span className="text-2xl">{medals[rank]}</span>
      </div>
    </motion.div>
  );
}

function EmptyLeaderboard() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
        <div className="text-5xl mb-4">🏆</div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Leaderboard Empty</h2>
        <p className="text-gray-600 dark:text-gray-400">Be the first to join the competition!</p>
      </motion.div>
    </div>
  );
}

function LeaderboardRow({ user, rank, index }) {
  const getRankBadge = (r) => {
    if (r === 1) return { text: "🥇", color: "bg-amber-100 dark:bg-amber-900/30 text-amber-600" };
    if (r === 2) return { text: "🥈", color: "bg-gray-100 dark:bg-gray-800 text-gray-600" };
    if (r === 3) return { text: "🥉", color: "bg-orange-100 dark:bg-orange-900/30 text-orange-600" };
    return { text: `#${r}`, color: "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300" };
  };

  const getTier = (points) => {
    if (points >= 1000) return { name: "Grand Master", color: "text-purple-600 dark:text-purple-400" };
    if (points >= 750) return { name: "Master", color: "text-red-600 dark:text-red-400" };
    if (points >= 500) return { name: "Expert", color: "text-orange-600 dark:text-orange-400" };
    if (points >= 250) return { name: "Advanced", color: "text-yellow-600 dark:text-yellow-400" };
    if (points >= 100) return { name: "Intermediate", color: "text-green-600 dark:text-green-400" };
    return { name: "Beginner", color: "text-blue-600 dark:text-blue-400" };
  };

  const rankBadge = getRankBadge(rank);
  const tier = getTier(user.points || 0);
  const level = Math.floor((user.points || 0) / 100) + 1;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ backgroundColor: "rgba(99, 102, 241, 0.05)" }}
      className="px-6 py-4 transition-colors"
    >
      <div className="grid grid-cols-12 gap-4 items-center">
        <div className="col-span-2 flex justify-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${rankBadge.color}`}>
            {rankBadge.text}
          </div>
        </div>

        <div className="col-span-7">
          <div className="flex items-center gap-3">
            <img
              src={
                user.userprofile && user.userprofile !== "null"
                  ? user.userprofile
                  : `https://ui-avatars.com/api/?name=${user.username}&background=6366f1&color=fff&bold=true`
              }
              alt={user.username}
              className="w-10 h-10 rounded-full border-2 border-indigo-200 dark:border-indigo-800"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-medium text-gray-900 dark:text-white truncate">{user.username}</h3>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${tier.color} bg-gray-100 dark:bg-gray-800`}>
                  {tier.name}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5 text-sm text-gray-500 dark:text-gray-400">
                <span>Level {level}</span>
                <span>•</span>
                <span>{user.solvedChallenges?.length || 0} challenges</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-3 text-center">
          <div className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {user.points || 0}
          </div>
          <div className="text-xs text-gray-400">XP</div>
        </div>
      </div>
    </motion.div>
  );
}
