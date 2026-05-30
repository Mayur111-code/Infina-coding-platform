import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { TrendingUp, Trophy, Target, Medal } from "lucide-react";
import PageTransition, { AnimatedHeader, StaggerGrid, StaggerItem } from "../Components/ui/PageTransition";
import { DashboardSkeleton } from "../Components/ui/Skeleton";
import { containerVariants, itemVariants } from "../utils/motionVariants";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [rank, setRank] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  const navigate = useNavigate();
  const API = "https://infina-coding-platform-3.onrender.com/api";

  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signin");
        return;
      }

      try {
        const res = await fetch(`${API}/users/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message || "Failed to fetch user data");
          navigate("/signin");
          return;
        }

        setUser(data.user);

        const leaderboardRes = await fetch(`${API}/leaderboard`);
        const leaderboardData = await leaderboardRes.json();

        if (leaderboardRes.ok && leaderboardData.success) {
          const users = leaderboardData.users;
          const position = users.findIndex((u) => u._id === data.user.id);
          setRank(position !== -1 ? position + 1 : "N/A");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard");
        toast.error("Server error, please try again!");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  if (loading) return <DashboardSkeleton />;
  if (error) return <ErrorDisplay error={error} />;

  const solved = user?.solvedChallenges?.length || 0;
  const totalPoints = user?.points || 0;
  const earnings = (totalPoints * 0.25).toFixed(2);
  const progressPercent = solved > 0 ? Math.min((solved / 10) * 100, 100) : 0;

  return (
    <PageTransition className="p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <AnimatedHeader
          title="Dashboard"
          subtitle={
            <>
              Welcome back,{" "}
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">{user.username}</span>
            </>
          }
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-5 py-3 rounded-2xl shadow-sm border border-white/60 dark:border-gray-700/60"
          >
            <img
              src={
                user.userprofile ||
                `https://ui-avatars.com/api/?name=${user.username}&background=6366f1&color=fff&bold=true`
              }
              alt="profile"
              className="w-12 h-12 rounded-full border-2 border-indigo-200 dark:border-indigo-700 shadow-md ring-2 ring-indigo-500/20"
            />
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">{user.username}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{user.useremail}</p>
            </div>
          </motion.div>
        </AnimatedHeader>

        <StaggerGrid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <StaggerItem>
            <StatCard title="Total Points" value={totalPoints} subtitle={`≈ ₹${earnings}`} icon={Trophy} gradient="from-blue-500 to-cyan-500" />
          </StaggerItem>
          <StaggerItem>
            <StatCard title="Challenges Solved" value={solved} subtitle="Keep the streak" icon={Target} gradient="from-emerald-500 to-teal-500" />
          </StaggerItem>
          <StaggerItem>
            <StatCard title="Progress" value={`${progressPercent}%`} subtitle="Learning Journey" icon={TrendingUp} gradient="from-purple-500 to-violet-500" progress={progressPercent} />
          </StaggerItem>
          <StaggerItem>
            <StatCard title="Global Rank" value={`#${rank || "N/A"}`} subtitle={rank ? `Top ${rank}` : "Calculating"} icon={Medal} gradient="from-amber-500 to-orange-500" />
          </StaggerItem>
        </StaggerGrid>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex space-x-1 mb-6 p-1 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200/60 dark:border-gray-700/60 w-fit"
        >
          {[
            { id: "overview", label: "Overview", icon: "📊" },
            { id: "solved", label: "Completed", icon: "✅" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 font-medium text-sm rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/25"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </motion.div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/60 dark:border-gray-700/60 overflow-hidden"
        >
          {activeTab === "overview" && <OverviewTab user={user} solved={solved} progressPercent={progressPercent} />}
          {activeTab === "solved" && <SolvedTab user={user} />}
        </motion.div>
      </div>
    </PageTransition>
  );
}

function ErrorDisplay({ error }) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-8 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-red-200 dark:border-red-800"
      >
        <div className="text-4xl mb-4">⚠️</div>
        <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">Error Loading Dashboard</h3>
        <p className="text-gray-600 dark:text-gray-400">{error}</p>
      </motion.div>
    </div>
  );
}

function StatCard({ title, value, subtitle, icon: Icon, gradient, progress }) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative overflow-hidden rounded-2xl p-5 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/60 dark:border-gray-700/60 shadow-sm group"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
      <div className="flex justify-between items-start relative">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">{value}</h3>
          <p className="text-xs text-gray-400 dark:text-gray-500">{subtitle}</p>
        </div>
        <div className={`p-2.5 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-lg`}>
          <Icon size={20} />
        </div>
      </div>
      {progress !== undefined && (
        <div className="mt-4 relative">
          <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              className={`bg-gradient-to-r ${gradient} h-2 rounded-full`}
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}

function OverviewTab({ user, solved, progressPercent }) {
  const nextLevelPoints = Math.max(0, 1000 - user.points);
  const level = Math.floor(user.points / 100) + 1;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Learning Progress</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
          <motion.div variants={itemVariants} className="bg-gradient-to-br from-indigo-50/80 to-purple-50/80 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-xl p-5 border border-indigo-100 dark:border-indigo-800/50">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Level Progress</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Current Level</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">Level {level}</span>
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <span>Challenges Completed</span>
                  <span>{solved}/10</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="bg-gradient-to-r from-emerald-400 to-indigo-500 h-3 rounded-full"
                  />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Points to Next Level</span>
                <span className="font-semibold text-amber-600 dark:text-amber-400">{nextLevelPoints} XP</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={itemVariants} className="bg-gray-50/80 dark:bg-gray-900/50 rounded-xl p-5 border border-gray-200 dark:border-gray-700 h-full">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Achievements</h3>
            <div className="space-y-3">
              {solved >= 1 && (
                <motion.div whileHover={{ x: 4 }} className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800/50">
                  <span className="text-xl">🥉</span>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">First Challenge</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Completed your first challenge</p>
                  </div>
                </motion.div>
              )}
              {solved >= 5 && (
                <motion.div whileHover={{ x: 4 }} className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800/50">
                  <span className="text-xl">🥈</span>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Halfway There</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">5 challenges completed</p>
                  </div>
                </motion.div>
              )}
              {solved === 0 && (
                <div className="text-center py-4">
                  <p className="text-gray-500 dark:text-gray-400">No achievements yet. Complete challenges to earn badges!</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function SolvedTab({ user }) {
  const solvedChallenges = user.solvedChallenges || [];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Completed Challenges</h2>
        <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-300 text-sm font-medium rounded-full">
          {solvedChallenges.length} Completed
        </span>
      </div>

      {solvedChallenges.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
          <div className="text-5xl mb-4">🎯</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Challenges Completed Yet</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Start your coding journey by solving your first challenge</p>
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => (window.location.href = "/challenges")}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-medium py-2.5 px-6 rounded-xl shadow-lg shadow-indigo-500/25 transition-all"
          >
            Start Your First Challenge
          </motion.button>
        </motion.div>
      ) : (
        <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {solvedChallenges.map((challenge, index) => (
            <StaggerItem key={index}>
              <motion.div
                whileHover={{ y: -3 }}
                className="border border-gray-200/60 dark:border-gray-700/60 rounded-xl p-4 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">{challenge.title}</h3>
                  <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-300 text-xs font-medium px-2 py-1 rounded-lg">
                    +{challenge.points} XP
                  </span>
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-500">✓</span>
                    <span className="text-xs text-gray-600 dark:text-gray-400">Completed</span>
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">#{index + 1}</div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      )}
    </div>
  );
}

export default Dashboard;
