import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Challenges() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [solving, setSolving] = useState({});
  const [solvedIds, setSolvedIds] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");

  const API = "https://infina-coding-platform-3.onrender.com/api";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Please login first!");
          return;
        }

        const [challengesRes, dashboardRes] = await Promise.all([
          fetch(`${API}/challenges`),
          fetch(`${API}/users/dashboard`, {
            headers: { Authorization: `Bearer ${token}` },
          })
        ]);

        const challengesData = await challengesRes.json();
        const dashboardData = await dashboardRes.json();

        const userSolvedIds = dashboardData?.user?.solvedChallenges?.map(c => 
          c.challengeId?._id ? c.challengeId._id : c.challengeId
        ) || [];

        setChallenges(challengesData.challenges || []);
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

  const handleAnswer = async (challengeId, selectedOption) => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Please login first!");

    if (solvedIds.includes(challengeId)) {
      return toast.info("You already solved this challenge!");
    }

    setSolving(prev => ({ ...prev, [challengeId]: true }));

    try {
      const res = await fetch(`${API}/challenges/solve/${challengeId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ selectedOption }),
      });

      const data = await res.json();

      if (res.ok) {
        if (data.isCorrect) {
          toast.success(`Correct! +${data.pointsEarned} XP Earned!`);
          setSolvedIds(prev => [...prev, challengeId]);
        } else {
          toast.error("Wrong answer! Try again!");
        }
      } else {
        toast.error(data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Solve error:", error);
      toast.error("Network error!");
    } finally {
      setSolving(prev => ({ ...prev, [challengeId]: false }));
    }
  };

  const filteredChallenges = challenges.filter(challenge => {
    const isSolved = solvedIds.includes(challenge._id);
    if (activeFilter === "solved") return isSolved;
    if (activeFilter === "unsolved") return !isSolved;
    return true;
  });

  if (loading) return <LoadingSpinner />;

  const totalSolved = solvedIds.length;
  const totalChallenges = challenges.length;
  const progressPercent = totalChallenges > 0 ? (totalSolved / totalChallenges) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Coding Challenges
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Test your skills and earn experience points
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatCard
            title="Total Challenges"
            value={totalChallenges}
            color="blue"
          />
          <StatCard
            title="Completed"
            value={totalSolved}
            color="green"
          />
          <StatCard
            title="Progress"
            value={`${progressPercent.toFixed(0)}%`}
            color="purple"
          />
        </div>

        {/* Progress Bar */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6 border border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Your Progress</span>
            <span>{totalSolved} of {totalChallenges} completed</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex space-x-2 mb-6 border-b border-gray-200 dark:border-gray-700">
          {[
            { id: "all", label: "All Challenges" },
            { id: "unsolved", label: "Unsolved" },
            { id: "solved", label: "Completed" }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 font-medium text-sm transition-colors border-b-2 ${
                activeFilter === tab.id
                  ? "text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400"
                  : "text-gray-500 dark:text-gray-400 border-transparent hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Challenges Grid */}
        {filteredChallenges.length === 0 ? (
          <EmptyState activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredChallenges.map(challenge => (
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
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Loading Challenges</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Please wait...</p>
      </div>
    </div>
  );
}

function StatCard({ title, value, color }) {
  const colorClasses = {
    blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
    green: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800",
    purple: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800",
  };

  return (
    <div className={`rounded-lg p-4 border ${colorClasses[color]}`}>
      <p className="text-sm font-medium mb-1">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

function EmptyState({ activeFilter, setActiveFilter }) {
  return (
    <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="text-4xl mb-4 text-gray-300 dark:text-gray-600">
        {activeFilter === "solved" ? "✅" : "🎯"}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {activeFilter === "solved" ? "No Completed Challenges" : "All Challenges Completed"}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
        {activeFilter === "solved" 
          ? "Start solving challenges to see them here!" 
          : "Great job! You've completed all available challenges."}
      </p>
      {activeFilter === "solved" && (
        <button 
          onClick={() => setActiveFilter("unsolved")}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
        >
          View Unsolved Challenges
        </button>
      )}
    </div>
  );
}

function ChallengeCard({ challenge, solved, solving, onAnswer }) {
  const getDifficultyInfo = (points) => {
    if (points >= 100) return { color: "bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400", text: "Expert" };
    if (points >= 75) return { color: "bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400", text: "Hard" };
    if (points >= 50) return { color: "bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400", text: "Medium" };
    return { color: "bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400", text: "Easy" };
  };

  const difficultyInfo = getDifficultyInfo(challenge.points);

  return (
    <div className={`
      bg-white dark:bg-gray-800 rounded-lg border overflow-hidden
      transition-all duration-200 hover:shadow-md
      ${solved 
        ? "border-green-300 dark:border-green-700" 
        : "border-gray-200 dark:border-gray-700"
      }
    `}>
      <div className="p-5">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2 line-clamp-2">
              {challenge.title}
            </h3>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-medium px-2 py-1 rounded ${difficultyInfo.color}`}>
                {difficultyInfo.text}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                • {challenge.points} XP
              </span>
            </div>
          </div>
          {solved && (
            <div className="text-green-500">
              ✓
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-5 line-clamp-3">
          {challenge.description}
        </p>

        {/* Options */}
        <div className="space-y-2 mb-5">
          {challenge.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !solved && !solving && onAnswer(challenge._id, option)}
              disabled={solved || solving}
              className={`
                w-full text-left p-3 rounded-lg border transition-colors
                ${solved || solving
                  ? "bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-500 border-gray-200 dark:border-gray-700 cursor-not-allowed"
                  : "bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-200 dark:hover:border-blue-700"
                }
              `}
            >
              <div className="flex items-center gap-3">
                <div className={`
                  w-6 h-6 rounded flex items-center justify-center text-xs font-medium
                  ${solved || solving 
                    ? "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500" 
                    : "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                  }
                `}>
                  {String.fromCharCode(65 + index)}
                </div>
                <span className="flex-1 text-sm">{option}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Submit Button */}
        <button
          onClick={() => !solved && !solving && onAnswer(challenge._id, challenge.options[0])}
          disabled={solved || solving}
          className={`
            w-full py-3 rounded-lg font-medium transition-colors
            ${solved 
              ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border border-green-200 dark:border-green-700 cursor-not-allowed" 
              : solving 
              ? "bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed" 
              : "bg-blue-600 hover:bg-blue-700 text-white"
            }
          `}
        >
          {solved ? (
            <span className="flex items-center justify-center gap-2">
              ✓ Completed
            </span>
          ) : solving ? (
            <span className="flex items-center justify-center gap-2">
              Checking...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              Solve Challenge
            </span>
          )}
        </button>
      </div>
    </div>
  );
}