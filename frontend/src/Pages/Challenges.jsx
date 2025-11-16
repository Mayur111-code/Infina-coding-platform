import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Challenges() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [solving, setSolving] = useState({});
  const [solvedIds, setSolvedIds] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all"); // all, unsolved, solved

  // ⭐ Fetch all challenges + solved list (UNCHANGED BACKEND LOGIC)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return toast.error("Please login first!");

        // 1️⃣ Fetch challenges
        const res = await fetch("http://127.0.0.1:3000/api/challenges");
        const data = await res.json();

        // 2️⃣ Fetch user dashboard data → including solved challenges
        const solvedRes = await fetch("http://127.0.0.1:3000/api/users/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const solvedData = await solvedRes.json();

        // ⭐ FIX HERE — extract ONLY challengeId
        const userSolvedIds =
          solvedData?.user?.solvedChallenges?.map((c) =>
            c.challengeId?._id ? c.challengeId._id : c.challengeId
          ) || [];

        setChallenges(data.challenges || []);
        setSolvedIds(userSolvedIds);
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Failed to load challenges!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ⭐ Solve challenge (UNCHANGED BACKEND LOGIC)
  const handleAnswer = async (challengeId, selectedOption) => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Please login first!");

    if (solvedIds.includes(challengeId))
      return toast.info("You already solved this!");

    setSolving((prev) => ({ ...prev, [challengeId]: true }));

    try {
      const res = await fetch(
        `http://127.0.0.1:3000/api/challenges/solve/${challengeId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ selectedOption }),
        }
      );

      const data = await res.json();

      if (res.ok) {
        if (data.isCorrect) {
          toast.success(`🎉 Correct! +${data.pointsEarned} XP Earned!`);
        } else {
          toast.error("💥 Wrong answer! Try again!");
        }

        // ⭐ Add solved challenge ID
        setSolvedIds((prev) => [...prev, challengeId]);
      } else {
        toast.error(data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Solve error:", error);
      toast.error("Network error!");
    } finally {
      setSolving((prev) => ({ ...prev, [challengeId]: false }));
    }
  };

  // Filter challenges based on active filter
  const filteredChallenges = challenges.filter(challenge => {
    const isSolved = solvedIds.includes(challenge._id);
    if (activeFilter === "solved") return isSolved;
    if (activeFilter === "unsolved") return !isSolved;
    return true; // "all"
  });

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <h2 className="text-xl font-bold text-white">Loading Challenges...</h2>
          <p className="text-blue-200 mt-2">Preparing your coding quests! ⚡</p>
        </div>
      </div>
    );

  const totalSolved = solvedIds.length;
  const totalChallenges = challenges.length;
  const progressPercent = totalChallenges > 0 ? (totalSolved / totalChallenges) * 100 : 0;

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
            ⚡ Code Quest Challenges
          </h1>
          <p className="text-blue-200 text-lg">
            Test your skills and earn XP! 🚀
          </p>
        </div>

        {/* Progress Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 text-center border border-blue-500/30">
            <div className="text-2xl mb-2">🎯</div>
            <h3 className="text-white font-bold">Total Challenges</h3>
            <p className="text-blue-300 text-xl font-bold">{totalChallenges}</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 text-center border border-green-500/30">
            <div className="text-2xl mb-2">✅</div>
            <h3 className="text-white font-bold">Completed</h3>
            <p className="text-green-300 text-xl font-bold">{totalSolved}</p>
          </div>
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 text-center border border-yellow-500/30">
            <div className="text-2xl mb-2">📈</div>
            <h3 className="text-white font-bold">Progress</h3>
            <p className="text-yellow-300 text-xl font-bold">{progressPercent.toFixed(1)}%</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 mb-6 border border-gray-600/30">
          <div className="flex justify-between text-sm text-gray-300 mb-2">
            <span>Your Quest Progress</span>
            <span>{totalSolved}/{totalChallenges} Completed</span>
          </div>
          <div className="w-full bg-gray-600 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-1000"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-2 mb-6 flex gap-2 border border-gray-600/30">
          {[
            { id: "all", label: "🌎 All Quests", icon: "🗺️" },
            { id: "unsolved", label: "⚔️ Unsolved", icon: "🎯" },
            { id: "solved", label: "✅ Completed", icon: "🏆" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`flex-1 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
                activeFilter === tab.id
                  ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30"
                  : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
              }`}
            >
              <span className="flex items-center justify-center gap-2">
                <span className="text-lg">{tab.icon}</span>
                {tab.label}
              </span>
            </button>
          ))}
        </div>

        {/* Challenges Grid */}
        {filteredChallenges.length === 0 ? (
          <div className="text-center py-12 bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-600/30">
            <div className="text-6xl mb-4">
              {activeFilter === "solved" ? "🎉" : "🎯"}
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {activeFilter === "solved" ? "No Completed Quests Yet!" : "All Quests Completed!"}
            </h3>
            <p className="text-gray-400 mb-6">
              {activeFilter === "solved" 
                ? "Start solving challenges to see them here!" 
                : "You've completed all available challenges! 🏆"}
            </p>
            {activeFilter === "solved" && (
              <button 
                onClick={() => setActiveFilter("unsolved")}
                className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Find Unsolved Quests 🚀
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredChallenges.map((challenge) => (
              <ChallengeCard 
                key={challenge._id} 
                challenge={challenge} 
                solved={solvedIds.includes(challenge._id)}
                solving={solving[challenge._id]}
                onAnswer={handleAnswer}
              />
            ))}
          </div>
        )}
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

// 🎮 Enhanced Challenge Card Component
function ChallengeCard({ challenge, solved, solving, onAnswer }) {
  const getDifficultyColor = (points) => {
    if (points >= 100) return "from-red-500 to-pink-600";
    if (points >= 75) return "from-orange-500 to-red-500";
    if (points >= 50) return "from-yellow-500 to-orange-500";
    return "from-green-500 to-emerald-600";
  };

  const getDifficultyText = (points) => {
    if (points >= 100) return "Expert";
    if (points >= 75) return "Hard";
    if (points >= 50) return "Medium";
    return "Easy";
  };

  return (
    <div className={`
      bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border overflow-hidden
      transform hover:scale-105 transition-all duration-300 group
      ${solved 
        ? "border-green-500/30 hover:border-green-400/50" 
        : "border-blue-500/30 hover:border-blue-400/50"
      }
    `}>
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white group-hover:text-yellow-300 transition-colors line-clamp-2">
            {challenge.title}
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <span className={`text-xs font-bold px-2 py-1 rounded-full bg-gradient-to-r ${getDifficultyColor(challenge.points)} text-white`}>
              {getDifficultyText(challenge.points)}
            </span>
            <span className="text-yellow-300 text-sm font-bold">
              {challenge.points} XP
            </span>
          </div>
        </div>
        <div className="text-2xl">
          {solved ? "✅" : "🎯"}
        </div>
      </div>

      {/* Description */}
      <p className="text-gray-300 text-sm mb-6 line-clamp-3">
        {challenge.description}
      </p>

      {/* Options */}
      <div className="space-y-3 mb-6">
        {challenge.options.map((option, index) => (
          <button
            key={index}
            onClick={() => !solved && !solving && onAnswer(challenge._id, option)}
            disabled={solved || solving}
            className={`
              w-full text-left p-3 rounded-xl border transition-all duration-300
              ${solved 
                ? "bg-gray-700/50 text-gray-400 border-gray-600 cursor-not-allowed" 
                : solving 
                ? "bg-gray-700/50 text-gray-400 border-gray-600 cursor-not-allowed" 
                : "bg-gray-700/30 text-white border-gray-500 hover:bg-blue-500/20 hover:border-blue-400 hover:scale-102"
              }
            `}
          >
            <div className="flex items-center gap-3">
              <div className={`
                w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold
                ${solved || solving ? "bg-gray-600 text-gray-400" : "bg-blue-500 text-white"}
              `}>
                {String.fromCharCode(65 + index)}
              </div>
              <span className="flex-1">{option}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Action Button */}
      <button
        onClick={() => !solved && !solving && onAnswer(challenge._id, challenge.options[0])}
        disabled={solved || solving}
        className={`
          w-full py-3 rounded-xl font-bold transition-all duration-300
          ${solved 
            ? "bg-green-500/20 text-green-300 border border-green-500/30 cursor-not-allowed" 
            : solving 
            ? "bg-gray-600 text-gray-400 cursor-not-allowed" 
            : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transform hover:scale-105 shadow-lg"
          }
        `}
      >
        {solved ? (
          <span className="flex items-center justify-center gap-2">
            ✅ Quest Completed
          </span>
        ) : solving ? (
          <span className="flex items-center justify-center gap-2">
            ⏳ Checking Answer...
          </span>
        ) : (
          <span className="flex items-center justify-center gap-2">
            ⚔️ Attempt Quest
          </span>
        )}
      </button>

      {/* Status Badge */}
      {solved && (
        <div className="absolute top-4 right-4">
          <div className="bg-green-500/20 text-green-300 px-2 py-1 rounded-full text-xs font-bold border border-green-500/30">
            SOLVED
          </div>
        </div>
      )}
    </div>
  );
}