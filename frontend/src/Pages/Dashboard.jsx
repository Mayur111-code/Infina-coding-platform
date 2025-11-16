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

  // ✅ Fetch real user data + rank from backend (unchanged)
  useEffect(() => {
    const fetchDashboardData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/signin");
        return;
      }

      try {
        // Fetch user data
        const res = await fetch("http://127.0.0.1:3000/api/users/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();

        if (!res.ok) {
          toast.error(data.message || "Failed to fetch user data");
          navigate("/signin");
          return;
        }

        setUser(data.user);

        // Fetch leaderboard for rank
        const leaderboardRes = await fetch("http://127.0.0.1:3000/api/leaderboard");
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

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen text-lg font-semibold">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-blue-500 h-12 w-12"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-blue-500 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-blue-500 rounded"></div>
              <div className="h-4 bg-blue-500 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-red-500 text-lg">
        {error}
      </div>
    );

  const solved = user?.solvedChallenges?.length || 0;
  const totalPoints = user?.points || 0;
  const earnings = (totalPoints * 0.25).toFixed(2);
  const progressPercent = solved > 0 ? Math.min((solved / 10) * 100, 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4 lg:p-6">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-20 animate-float"
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
        <div className="flex flex-col lg:flex-row justify-between items-center mb-8 gap-4">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold text-white mb-2 animate-pulse mt-20">
              🎮 Infina Code Dashboard
            </h1>
            <p className="text-blue-200 text-lg">
              Welcome back, <span className="font-bold text-yellow-300">{user.username}</span>! Ready to level up? 🚀
            </p>
          </div>
          <div className="flex items-center gap-4 bg-gray-800/50 backdrop-blur-sm border border-blue-500/30 px-6 py-3 rounded-2xl shadow-2xl hover:shadow-blue-500/20 hover:scale-105 transition-all duration-300 group">
            <div className="relative">
              <img
                src={
                  user.userprofile
                    ? user.userprofile
                    : `https://ui-avatars.com/api/?name=${user.username}&background=0D8ABC&color=fff&bold=true`
                }
                alt="profile"
                className="w-14 h-14 rounded-full border-2 border-yellow-400 group-hover:border-green-400 transition-colors duration-300"
              />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-gray-900"></div>
            </div>
            <div>
              <p className="font-bold text-white text-lg">{user.username}</p>
              <p className="text-sm text-blue-300">{user.useremail}</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Points"
            value={totalPoints}
            subtitle={`≈ ₹${earnings}`}
            emoji="💰"
            color="from-yellow-500 to-orange-600"
            points={totalPoints}
          />
          <StatCard
            title="Challenges Solved"
            value={solved}
            subtitle="Keep the streak! 🔥"
            emoji="✅"
            color="from-green-500 to-emerald-600"
            challenges={solved}
          />
          <StatCard
            title="Progress"
            value={`${progressPercent}%`}
            subtitle="Learning Journey 📈"
            emoji="📘"
            color="from-blue-500 to-cyan-600"
            progress={progressPercent}
          />
          <StatCard
            title="Global Rank"
            value={`#${rank || "N/A"}`}
            subtitle={
              rank === 1
                ? "🥇 Champion!"
                : rank <= 5
                ? "🎯 Elite Ranker!"
                : rank
                ? `Top ${Math.ceil((rank / 100) * 100)}% 🏆`
                : "Calculating..."
            }
            emoji="🏅"
            color="from-purple-500 to-pink-600"
            rank={rank}
          />
        </div>

        {/* Tabs */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-2 mb-8 flex gap-2 border border-gray-600/30">
          {[
            { id: "overview", label: "📊 Mission Overview", icon: "🎯" },
            { id: "solved", label: "✅ Completed Quests", icon: "🛡️" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-2xl shadow-blue-500/30"
                  : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <span className="text-xl">{tab.icon}</span>
                {tab.label}
              </span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-600/30 overflow-hidden">
          {activeTab === "overview" && <OverviewTab user={user} solved={solved} progressPercent={progressPercent} />}
          {activeTab === "solved" && <SolvedTab user={user} />}
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
}

// 🎮 Enhanced Stat Card with Gaming Effects
function StatCard({ title, value, subtitle, emoji, color, points, challenges, progress, rank }) {
  return (
    <div
      className={`bg-gradient-to-br ${color} rounded-2xl p-6 shadow-2xl transform hover:scale-105 hover:rotate-1 transition-all duration-300 group relative overflow-hidden`}
    >
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
      
      <div className="relative z-10 flex justify-between items-start">
        <div className="flex-1">
          <p className="text-sm text-white/80 font-semibold mb-2">{title}</p>
          <h2 className="text-4xl font-bold mb-2 text-white drop-shadow-lg">{value}</h2>
          <p className="text-xs font-medium text-white/90">{subtitle}</p>
        </div>
        <span className="text-3xl transform group-hover:scale-125 group-hover:rotate-12 transition-transform duration-300">
          {emoji}
        </span>
      </div>
      
      {/* Progress bar for progress card */}
      {progress !== undefined && (
        <div className="mt-4 bg-white/20 rounded-full h-2">
          <div 
            className="bg-white h-2 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
    </div>
  );
}

// 🎯 Enhanced Overview Tab
function OverviewTab({ user, solved, progressPercent }) {
  const nextLevelPoints = Math.max(0, 1000 - user.points);
  const level = Math.floor(user.points / 100) + 1;

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
        🎯 Mission Control Center
        <span className="text-sm bg-blue-600 px-3 py-1 rounded-full">Level {level}</span>
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Progress Section */}
        <div className="bg-gray-700/30 rounded-2xl p-6 border border-blue-500/20">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            📈 Learning Progress
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Current Level</span>
              <span className="text-yellow-300 font-bold">Level {level}</span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-4">
              <div 
                className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Challenges Completed</span>
              <span className="text-green-400 font-bold">{solved}/10</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-300">Points to Next Level</span>
              <span className="text-blue-400 font-bold">{nextLevelPoints} XP</span>
            </div>
          </div>
        </div>

        {/* Achievements Preview */}
        <div className="bg-gray-700/30 rounded-2xl p-6 border border-purple-500/20">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            🏆 Recent Achievements
          </h3>
          <div className="space-y-3">
            {solved >= 1 && (
              <div className="flex items-center gap-3 p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                <span className="text-2xl">🥉</span>
                <div>
                  <p className="text-white font-semibold">First Challenge</p>
                  <p className="text-green-300 text-sm">Completed your first challenge!</p>
                </div>
              </div>
            )}
            {solved >= 5 && (
              <div className="flex items-center gap-3 p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
                <span className="text-2xl">🥈</span>
                <div>
                  <p className="text-white font-semibold">Halfway There</p>
                  <p className="text-blue-300 text-sm">5 challenges completed!</p>
                </div>
              </div>
            )}
            {solved === 0 && (
              <div className="text-center py-4">
                <p className="text-gray-400">No achievements yet. Complete challenges to earn badges!</p>
              </div>
            )}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="lg:col-span-2 bg-gray-700/30 rounded-2xl p-6 border border-yellow-500/20">
          <h3 className="text-xl font-bold text-white mb-4">⚡ Performance Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-gray-600/30 rounded-lg">
              <div className="text-2xl mb-2">🔥</div>
              <p className="text-white font-bold">{solved}</p>
              <p className="text-gray-400 text-sm">Solved</p>
            </div>
            <div className="text-center p-4 bg-gray-600/30 rounded-lg">
              <div className="text-2xl mb-2">⚡</div>
              <p className="text-white font-bold">{user.points || 0}</p>
              <p className="text-gray-400 text-sm">XP</p>
            </div>
            <div className="text-center p-4 bg-gray-600/30 rounded-lg">
              <div className="text-2xl mb-2">⭐</div>
              <p className="text-white font-bold">{Math.floor(user.points / 100)}</p>
              <p className="text-gray-400 text-sm">Stars</p>
            </div>
            <div className="text-center p-4 bg-gray-600/30 rounded-lg">
              <div className="text-2xl mb-2">🎯</div>
              <p className="text-white font-bold">{10 - solved}</p>
              <p className="text-gray-400 text-sm">Remaining</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ✅ Enhanced Solved Tab
function SolvedTab({ user }) {
  const solvedChallenges = user.solvedChallenges || [];

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
        ✅ Completed Quests
        <span className="text-sm bg-green-600 px-3 py-1 rounded-full">
          {solvedChallenges.length} Challenges
        </span>
      </h2>

      {solvedChallenges.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎯</div>
          <h3 className="text-2xl font-bold text-white mb-2">No Quests Completed Yet</h3>
          <p className="text-gray-400 mb-6">Start your coding journey by solving your first challenge!</p>
          <button 
            onClick={() => window.location.href = '/challenges'}
            className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-3 px-8 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-2xl"
          >
            Start Your First Quest 🚀
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solvedChallenges.map((challenge, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl p-6 border border-green-500/30 hover:border-green-400 hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300 transform hover:-translate-y-2 group"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold text-white group-hover:text-green-300 transition-colors">
                  {challenge.title}
                </h3>
                <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm font-bold">
                  +{challenge.points} XP
                </span>
              </div>
              
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-600">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">✅</span>
                  <span className="text-green-400 text-sm font-semibold">Completed</span>
                </div>
                <div className="text-yellow-300 text-sm font-bold">
                  #{index + 1}
                </div>
              </div>
              
              {/* Difficulty indicator */}
              <div className="mt-3 flex justify-between items-center">
                <span className="text-xs text-gray-400">Difficulty:</span>
                <div className="flex gap-1">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        i < (challenge.points / 50) ? 'bg-yellow-400' : 'bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Completion Celebration */}
      {solvedChallenges.length > 0 && (
        <div className="mt-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl p-6 border border-purple-500/30">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-white mb-2">🎉 Amazing Progress!</h3>
              <p className="text-gray-300">
                You've completed {solvedChallenges.length} challenge{solvedChallenges.length !== 1 ? 's' : ''}. 
                {solvedChallenges.length >= 5 ? " You're on fire! 🔥" : " Keep going! 💪"}
              </p>
            </div>
            <div className="text-4xl animate-bounce">
              {solvedChallenges.length >= 10 ? "🏆" : "⭐"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;