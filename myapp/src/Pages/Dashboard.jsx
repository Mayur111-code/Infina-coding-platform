import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [totalPoints, setTotalPoints] = useState(0);
  const [solvedQuestions, setSolvedQuestions] = useState([]);
  const [allQuestionsCount, setAllQuestionsCount] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Load user info
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));

    // Load solved questions & points
    const storedSolved = JSON.parse(localStorage.getItem("solvedQuestions")) || [];
    setSolvedQuestions(storedSolved);

    const points = parseInt(localStorage.getItem("totalPoints")) || 0;
    setTotalPoints(points);

    // Fetch all questions from JSON server
    // axios.get("http://localhost:3000/challenges") // for development
    //  axios.get("https://json-server-infinacode.onrender.com") // for vercle
    axios.get("https://json-server-infinacode.onrender.com/challenges")

      .then((res) => {
        const questionsArray = res.data;
        setAllQuestionsCount(questionsArray.length);
      })
      .catch((err) => console.log("Error fetching total questions:", err));
  }, []);

  // Progress calculation
  const progressPercent =
    allQuestionsCount > 0 ? Math.round((solvedQuestions.length / allQuestionsCount) * 100) : 0;

  // Calculate earnings
  const earnings = (totalPoints * 0.25).toFixed(2);


 const navigate = useNavigate();


  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 lg:p-6 lg:ml-0 mt-16 lg:mt-0">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 lg:mb-8">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-2">📊 Dashboard</h1>
            <p className="text-sm lg:text-lg text-gray-600">Welcome back! Here's your learning progress</p>
          </div>
          
          {user && (
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm shadow-lg px-4 py-2 lg:px-6 lg:py-3 rounded-xl lg:rounded-2xl w-full lg:w-auto">
              <img
                src={
                  user.userprofile && user.userprofile !== "null"
                    ? user.userprofile
                    : `https://ui-avatars.com/api/?name=${user.username}&background=6366f1&color=fff`
                }
                alt={user.username}
                className="w-10 h-10 lg:w-14 lg:h-14 rounded-full border-2 border-indigo-300 shadow-md"
              />
              <div>
                <span className="font-bold text-gray-800 capitalize text-sm lg:text-lg">{user.username}</span>
                <p className="text-xs lg:text-sm text-gray-600">Code Learner</p>
              </div>
            </div>
          )}
        </div>

        {/* Stats Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
          {/* Total Points Card */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-indigo-200 text-xs lg:text-sm mb-1">Total Points</p>
                <h2 className="text-2xl lg:text-3xl font-bold">{totalPoints.toLocaleString()}</h2>
                <p className="text-indigo-200 text-xs lg:text-sm mt-1 lg:mt-2">≈ ₹{earnings}</p>
              </div>
              <div className="text-2xl lg:text-3xl bg-white/20 p-2 lg:p-3 rounded-full">💰</div>
            </div>
            <div className="mt-3 lg:mt-4 flex items-center text-indigo-200 text-xs lg:text-sm">
              <span>🎯 1 point = ₹0.25</span>
            </div>
          </div>

          {/* Challenges Solved Card */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-green-200 text-xs lg:text-sm mb-1">Challenges Solved</p>
                <h2 className="text-2xl lg:text-3xl font-bold">
                  {solvedQuestions.length}<span className="text-green-200 text-sm lg:text-lg">/{allQuestionsCount}</span>
                </h2>
                <p className="text-green-200 text-xs lg:text-sm mt-1 lg:mt-2">Keep going! 🚀</p>
              </div>
              <div className="text-2xl lg:text-3xl bg-white/20 p-2 lg:p-3 rounded-full">✅</div>
            </div>
            <div className="mt-3 lg:mt-4">
              <div className="flex justify-between text-green-200 text-xs lg:text-sm mb-1">
                <span>Progress</span>
                <span>{progressPercent}%</span>
              </div>
              <div className="w-full bg-white/30 rounded-full h-2">
                <div 
                  className="bg-white h-2 rounded-full transition-all duration-1000 ease-out"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Progress Card */}
          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-200 text-xs lg:text-sm mb-1">Learning Progress</p>
                <h2 className="text-2xl lg:text-3xl font-bold">{progressPercent}%</h2>
                <p className="text-blue-200 text-xs lg:text-sm mt-1 lg:mt-2">
                  {solvedQuestions.length > 0 ? 'Amazing! 🌟' : 'Start! 👇'}
                </p>
              </div>
              <div className="text-2xl lg:text-3xl bg-white/20 p-2 lg:p-3 rounded-full">📈</div>
            </div>
            <div className="mt-3 lg:mt-4">
              <div className="flex items-center gap-2 text-blue-200 text-xs lg:text-sm">
                <span>🎯 {allQuestionsCount - solvedQuestions.length} remaining</span>
              </div>
            </div>
          </div>

          {/* Rank Card */}
          <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-amber-200 text-xs lg:text-sm mb-1">Current Rank</p>
                <h2 className="text-2xl lg:text-3xl font-bold">
                  #{solvedQuestions.length > 0 ? Math.max(1, Math.round(allQuestionsCount / solvedQuestions.length)) : '--'}
                </h2>
                <p className="text-amber-200 text-xs lg:text-sm mt-1 lg:mt-2">Top 20% Learner</p>
              </div>
              <div className="text-2xl lg:text-3xl bg-white/20 p-2 lg:p-3 rounded-full">🏆</div>
            </div>
            <div className="mt-3 lg:mt-4 flex items-center text-amber-200 text-xs lg:text-sm">
              <span>⭐ {solvedQuestions.length * 10} XP</span>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="bg-white rounded-xl lg:rounded-2xl shadow-sm p-1 lg:p-2 mb-4 lg:mb-6">
          <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-1">
            {["overview", "solved", "achievements"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 lg:py-3 px-2 lg:px-4 rounded-lg lg:rounded-xl font-semibold transition-all duration-300 text-sm lg:text-base ${
                  activeTab === tab
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {tab === "overview" && "📊 Overview"}
                {tab === "solved" && "✅ Solved"}
                {tab === "achievements" && "🎖️ Achievements"}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-4 lg:p-6">
          {activeTab === "overview" && (
            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6">Learning Overview</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 lg:p-6 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-3 lg:mb-4 text-sm lg:text-base">📈 Progress Analytics</h3>
                  <div className="space-y-3 lg:space-y-4">
                    <div className="flex justify-between items-center text-xs lg:text-sm">
                      <span className="text-gray-600">Completion Rate</span>
                      <span className="font-bold text-indigo-600">{progressPercent}%</span>
                    </div>
                    <div className="flex justify-between items-center text-xs lg:text-sm">
                      <span className="text-gray-600">Points per Challenge</span>
                      <span className="font-bold text-green-600">
                        {solvedQuestions.length > 0 ? Math.round(totalPoints / solvedQuestions.length) : 0} avg
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs lg:text-sm">
                      <span className="text-gray-600">Learning Streak</span>
                      <span className="font-bold text-amber-600">3 days 🔥</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 lg:p-6 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-3 lg:mb-4 text-sm lg:text-base">🎯 Quick Actions</h3>
                  <div className="space-y-2 lg:space-y-3">
                    <button className="w-full bg-indigo-600 text-white py-2 text-sm lg:text-base rounded-lg hover:bg-indigo-700 transition">
                      Continue Learning →
                    </button>
                    <button className="w-full border border-indigo-600 text-indigo-600 py-2 text-sm lg:text-base rounded-lg hover:bg-indigo-50 transition"  onClick={() => navigate("/challenges")} >
                      View Challenges
                    </button>
                    <button className="w-full border border-green-600 text-green-600 py-2 text-sm lg:text-base rounded-lg hover:bg-green-50 transition" onClick={()=> navigate("/marketplace")}>
                      Redeem Points 🎁
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "solved" && (
            <div>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 lg:mb-6 gap-2">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900">✅ Solved Challenges</h2>
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs lg:text-sm font-medium">
                  {solvedQuestions.length} completed
                </span>
              </div>
              
              {solvedQuestions.length === 0 ? (
                <div className="text-center py-8 lg:py-12">
                  <div className="text-4xl lg:text-6xl mb-3 lg:mb-4">🔍</div>
                  <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">No challenges solved yet</h3>
                  <p className="text-gray-600 text-sm lg:text-base mb-3 lg:mb-4">Start solving challenges to earn points!</p>
                  <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-2 lg:px-6 lg:py-2 rounded-lg hover:shadow-lg transition text-sm lg:text-base">
                    Start Learning 👍
                  </button>
                </div>
              ) : (
                <div className="grid gap-3 lg:gap-4">
                  {solvedQuestions
                    .sort((a, b) => b.id - a.id)
                    .map((q, index) => (
                      <div key={q.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 lg:p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg lg:rounded-xl border border-green-200 hover:shadow-md transition">
                        <div className="flex items-center gap-3 mb-2 sm:mb-0">
                          <div className="bg-green-500 text-white p-2 lg:p-3 rounded-full text-sm lg:text-lg">
                            #{index + 1}
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 text-sm lg:text-base">{q.title}</h4>
                            <p className="text-xs lg:text-sm text-gray-600">+{q.points} points</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs lg:text-sm font-bold">
                            +{q.points} pts
                          </span>
                          <p className="text-xs text-gray-500 mt-1">Completed</p>
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "achievements" && (
            <div>
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6">🎖️ Your Achievements</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                {/* Achievement Cards */}
                <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-4 lg:p-5 rounded-xl border border-amber-200 text-center">
                  <div className="text-3xl lg:text-4xl mb-2 lg:mb-3">🏆</div>
                  <h4 className="font-bold text-gray-900 text-sm lg:text-base">First Steps</h4>
                  <p className="text-gray-600 text-xs lg:text-sm mb-2 lg:mb-3">Complete first challenge</p>
                  <div className={`w-full bg-amber-200 rounded-full h-2 ${solvedQuestions.length > 0 ? 'bg-green-500' : ''}`}></div>
                  <span className="text-xs text-amber-600 mt-2">{solvedQuestions.length > 0 ? 'Unlocked!' : 'Locked'}</span>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 lg:p-5 rounded-xl border border-blue-200 text-center">
                  <div className="text-3xl lg:text-4xl mb-2 lg:mb-3">⭐</div>
                  <h4 className="font-bold text-gray-900 text-sm lg:text-base">Quick Learner</h4>
                  <p className="text-gray-600 text-xs lg:text-sm mb-2 lg:mb-3">Solve 5 challenges</p>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${Math.min((solvedQuestions.length / 5) * 100, 100)}%` }}></div>
                  </div>
                  <span className="text-xs text-blue-600 mt-2">{solvedQuestions.length}/5 completed</span>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-4 lg:p-5 rounded-xl border border-purple-200 text-center">
                  <div className="text-3xl lg:text-4xl mb-2 lg:mb-3">🚀</div>
                  <h4 className="font-bold text-gray-900 text-sm lg:text-base">Code Master</h4>
                  <p className="text-gray-600 text-xs lg:text-sm mb-2 lg:mb-3">Solve all challenges</p>
                  <div className="w-full bg-purple-200 rounded-full h-2">
                    <div className="bg-purple-500 h-2 rounded-full" style={{ width: `${progressPercent}%` }}></div>
                  </div>
                  <span className="text-xs text-purple-600 mt-2">{progressPercent}% completed</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;