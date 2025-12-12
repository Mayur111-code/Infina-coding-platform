import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay error={error} />;

  const solved = user?.solvedChallenges?.length || 0;
  const totalPoints = user?.points || 0;
  const earnings = (totalPoints * 0.25).toFixed(2);
  const progressPercent = solved > 0 ? Math.min((solved / 10) * 100, 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Welcome back, <span className="font-semibold text-blue-600 dark:text-blue-400">{user.username}</span>
            </p>
          </div>
          
          <div className="flex items-center gap-4 bg-white dark:bg-gray-800 px-6 py-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <div className="relative">
              <img
                src={
                  user.userprofile || 
                  `https://ui-avatars.com/api/?name=${user.username}&background=0D8ABC&color=fff&bold=true`
                }
                alt="profile"
                className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-700 shadow"
              />
            </div>
            <div>
              <p className="font-semibold text-gray-900 dark:text-white">{user.username}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{user.useremail}</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
          <StatCard
            title="Total Points"
            value={totalPoints}
            subtitle={`≈ ₹${earnings}`}
            icon="🏆"
            color="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30"
            borderColor="border-blue-200 dark:border-blue-700"
          />
          <StatCard
            title="Challenges Solved"
            value={solved}
            subtitle="Keep the streak"
            icon="✅"
            color="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30"
            borderColor="border-green-200 dark:border-green-700"
          />
          <StatCard
            title="Progress"
            value={`${progressPercent}%`}
            subtitle="Learning Journey"
            icon="📈"
            color="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/30 dark:to-purple-800/30"
            borderColor="border-purple-200 dark:border-purple-700"
            progress={progressPercent}
          />
          <StatCard
            title="Global Rank"
            value={`#${rank || "N/A"}`}
            subtitle={rank ? `Top ${rank}` : "Calculating"}
            icon="🏅"
            color="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/30 dark:to-amber-800/30"
            borderColor="border-amber-200 dark:border-amber-700"
          />
        </div>

        {/* Tabs Navigation */}
        <div className="flex space-x-2 mb-6 border-b border-gray-200 dark:border-gray-700">
          {[
            { id: "overview", label: "Overview", icon: "📊" },
            { id: "solved", label: "Completed", icon: "✅" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 font-medium text-sm md:text-base transition-colors border-b-2 ${
                activeTab === tab.id
                  ? "text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400"
                  : "text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          {activeTab === "overview" && <OverviewTab user={user} solved={solved} progressPercent={progressPercent} />}
          {activeTab === "solved" && <SolvedTab user={user} />}
        </div>
      </div>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">Loading dashboard...</p>
      </div>
    </div>
  );
}

function ErrorDisplay({ error }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-4xl mb-4">⚠️</div>
        <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">Error Loading Dashboard</h3>
        <p className="text-gray-600 dark:text-gray-400">{error}</p>
      </div>
    </div>
  );
}

function StatCard({ title, value, subtitle, icon, color, borderColor, progress }) {
  return (
    <div className={`${color} rounded-xl p-5 border ${borderColor} transition-transform hover:scale-[1.02]`}>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">{title}</p>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">{value}</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</p>
        </div>
        <span className="text-2xl">{icon}</span>
      </div>
      
      {progress !== undefined && (
        <div className="mt-4">
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

function OverviewTab({ user, solved, progressPercent }) {
  const nextLevelPoints = Math.max(0, 1000 - user.points);
  const level = Math.floor(user.points / 100) + 1;

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Learning Progress</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Progress Section */}
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Level Progress</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Current Level</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">Level {level}</span>
              </div>
              <div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-1">
                  <span>Challenges Completed</span>
                  <span>{solved}/10</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-700"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 dark:text-gray-400">Points to Next Level</span>
                <span className="font-semibold text-amber-600 dark:text-amber-400">{nextLevelPoints} XP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-5 border border-gray-200 dark:border-gray-700 h-full">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Achievements</h3>
            <div className="space-y-3">
              {solved >= 1 && (
                <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <span className="text-xl">🥉</span>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">First Challenge</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">Completed your first challenge</p>
                  </div>
                </div>
              )}
              {solved >= 5 && (
                <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <span className="text-xl">🥈</span>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Halfway There</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">5 challenges completed</p>
                  </div>
                </div>
              )}
              {solved === 0 && (
                <div className="text-center py-4">
                  <p className="text-gray-500 dark:text-gray-400">No achievements yet. Complete challenges to earn badges!</p>
                </div>
              )}
            </div>
          </div>
        </div>
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
        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-sm font-medium rounded-full">
          {solvedChallenges.length} Completed
        </span>
      </div>

      {solvedChallenges.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-5xl mb-4 text-gray-300 dark:text-gray-600">🎯</div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Challenges Completed Yet</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">Start your coding journey by solving your first challenge</p>
          <button 
            onClick={() => window.location.href = '/challenges'}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-6 rounded-lg transition-colors"
          >
            Start Your First Challenge
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {solvedChallenges.map((challenge, index) => (
            <div
              key={index}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:border-blue-300 dark:hover:border-blue-700 transition-colors bg-white dark:bg-gray-900"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">
                  {challenge.title}
                </h3>
                <span className="bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 text-xs font-medium px-2 py-1 rounded">
                  +{challenge.points} XP
                </span>
              </div>
              
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
                <div className="flex items-center gap-2">
                  <span className="text-green-500">✓</span>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Completed</span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  #{index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {solvedChallenges.length > 0 && (
        <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Great Progress!</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                You've completed {solvedChallenges.length} challenge{solvedChallenges.length !== 1 ? 's' : ''}.
                {solvedChallenges.length >= 5 ? " Keep up the good work!" : ""}
              </p>
            </div>
            <span className="text-2xl">
              {solvedChallenges.length >= 10 ? "🏆" : "⭐"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;