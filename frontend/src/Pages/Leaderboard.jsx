import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

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

  if (loading) return <LoadingSpinner />;
  if (users.length === 0) return <EmptyLeaderboard />;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Leaderboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            See where you stand among other coders
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatCard
            title="Top Coder"
            value={users[0]?.username || "N/A"}
            icon="👑"
            color="yellow"
          />
          <StatCard
            title="Total Competitors"
            value={`${users.length}`}
            icon="🚀"
            color="blue"
          />
          <StatCard
            title="Highest Score"
            value={`${users[0]?.points || 0} XP`}
            icon="⭐"
            color="green"
          />
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden mb-6">
          {/* Table Header */}
          <div className="bg-gray-50 dark:bg-gray-900 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-2 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                Rank
              </div>
              <div className="col-span-7 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Coder
              </div>
              <div className="col-span-3 text-center text-sm font-semibold text-gray-700 dark:text-gray-300">
                XP Points
              </div>
            </div>
          </div>

          {/* Leaderboard Rows */}
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {users.map((user, index) => (
              <LeaderboardRow 
                key={user._id} 
                user={user} 
                rank={index + 1} 
              />
            ))}
          </div>
        </div>

        {/* Footer Message */}
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          <p>
            {users.length > 0 && 
              `${users[users.length - 1]?.username || "Last coder"} is currently in #${users.length} place. `
            }
            Keep coding to climb the ranks!
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
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Loading Leaderboard</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Please wait...</p>
      </div>
    </div>
  );
}

function EmptyLeaderboard() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-4 text-gray-300 dark:text-gray-600">🏆</div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Leaderboard Empty</h2>
        <p className="text-gray-600 dark:text-gray-400">Be the first to join the competition!</p>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  const colorClasses = {
    yellow: "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800",
    blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
    green: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800",
  };

  return (
    <div className={`rounded-lg p-4 border ${colorClasses[color]}`}>
      <div className="flex items-center gap-3">
        <div className="text-xl">{icon}</div>
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-lg font-bold">{value}</p>
        </div>
      </div>
    </div>
  );
}

function LeaderboardRow({ user, rank }) {
  const getRankBadge = (rank) => {
    if (rank === 1) return { text: "🥇", color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400" };
    if (rank === 2) return { text: "🥈", color: "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400" };
    if (rank === 3) return { text: "🥉", color: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400" };
    return { text: `#${rank}`, color: "bg-gray-50 dark:bg-gray-800 text-gray-700 dark:text-gray-300" };
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
    <div className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
      <div className="grid grid-cols-12 gap-4 items-center">
        {/* Rank */}
        <div className="col-span-2 flex justify-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${rankBadge.color}`}>
            {rankBadge.text}
          </div>
        </div>

        {/* User Info */}
        <div className="col-span-7">
          <div className="flex items-center gap-3">
            <img
              src={
                user.userprofile && user.userprofile !== "null"
                  ? user.userprofile
                  : `https://ui-avatars.com/api/?name=${user.username}&background=6366f1&color=fff&bold=true`
              }
              alt={user.username}
              className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700"
            />
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-medium text-gray-900 dark:text-white truncate">
                  {user.username}
                </h3>
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${tier.color} bg-gray-100 dark:bg-gray-800`}>
                  {tier.name}
                </span>
              </div>
              
              <div className="flex items-center gap-2 mt-1 text-sm text-gray-600 dark:text-gray-400">
                <span>Level {level}</span>
                <span>•</span>
                <span>{user.solvedChallenges?.length || 0} challenges</span>
              </div>
            </div>
          </div>
        </div>

        {/* Points */}
        <div className="col-span-3">
          <div className="text-center">
            <div className="text-xl font-bold text-gray-900 dark:text-white">
              {user.points || 0}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              XP
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar for Top 3 */}
      {rank <= 3 && (
        <div className="mt-3 ml-12">
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
            <span>Progress</span>
            <span>{((user.points || 0) / 1000 * 100).toFixed(0)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(((user.points || 0) / 1000 * 100), 100)}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}