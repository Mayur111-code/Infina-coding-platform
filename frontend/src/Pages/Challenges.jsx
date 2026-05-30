import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { CheckCircle2, Loader2, Zap } from "lucide-react";
import PageTransition, { AnimatedHeader, StaggerGrid, StaggerItem } from "../Components/ui/PageTransition";
import { ChallengesSkeleton } from "../Components/ui/Skeleton";

export default function Challenges() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [solving, setSolving] = useState({});
  const [solvedIds, setSolvedIds] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedAnswers, setSelectedAnswers] = useState({});

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
          }),
        ]);

        const challengesData = await challengesRes.json();
        const dashboardData = await dashboardRes.json();

        const userSolvedIds =
          dashboardData?.user?.solvedChallenges?.map((c) =>
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

    setSolving((prev) => ({ ...prev, [challengeId]: true }));

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
          setSolvedIds((prev) => [...prev, challengeId]);
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
      setSolving((prev) => ({ ...prev, [challengeId]: false }));
    }
  };

  const filteredChallenges = challenges.filter((challenge) => {
    const isSolved = solvedIds.includes(challenge._id);
    if (activeFilter === "solved") return isSolved;
    if (activeFilter === "unsolved") return !isSolved;
    return true;
  });

  if (loading) return <ChallengesSkeleton />;

  const totalSolved = solvedIds.length;
  const totalChallenges = challenges.length;
  const progressPercent = totalChallenges > 0 ? (totalSolved / totalChallenges) * 100 : 0;

  return (
    <PageTransition className="p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <AnimatedHeader
          title="Coding Challenges"
          subtitle="Test your skills and earn experience points"
        />

        <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[
            { title: "Total Challenges", value: totalChallenges, color: "from-blue-500 to-cyan-500" },
            { title: "Completed", value: totalSolved, color: "from-emerald-500 to-teal-500" },
            { title: "Progress", value: `${progressPercent.toFixed(0)}%`, color: "from-purple-500 to-violet-500" },
          ].map((stat) => (
            <StaggerItem key={stat.title}>
              <motion.div
                whileHover={{ y: -3 }}
                className="rounded-2xl p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/60 dark:border-gray-700/60"
              >
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{stat.title}</p>
                <p className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGrid>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-5 mb-6 border border-white/60 dark:border-gray-700/60"
        >
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span className="flex items-center gap-1"><Zap size={14} className="text-indigo-500" /> Your Progress</span>
            <span>{totalSolved} of {totalChallenges} completed</span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full"
            />
          </div>
        </motion.div>

        <div className="flex space-x-1 mb-6 p-1 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200/60 dark:border-gray-700/60 w-fit">
          {[
            { id: "all", label: "All Challenges" },
            { id: "unsolved", label: "Unsolved" },
            { id: "solved", label: "Completed" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-4 py-2 font-medium text-sm rounded-lg transition-all duration-200 ${
                activeFilter === tab.id
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md"
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {filteredChallenges.length === 0 ? (
          <EmptyState activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
        ) : (
          <StaggerGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredChallenges.map((challenge) => (
              <StaggerItem key={challenge._id}>
                <ChallengeCard
                  challenge={challenge}
                  solved={solvedIds.includes(challenge._id)}
                  solving={solving[challenge._id]}
                  selectedAnswer={selectedAnswers[challenge._id]}
                  onSelect={(option) =>
                    setSelectedAnswers((prev) => ({ ...prev, [challenge._id]: option }))
                  }
                  onAnswer={handleAnswer}
                />
              </StaggerItem>
            ))}
          </StaggerGrid>
        )}
      </div>
    </PageTransition>
  );
}

function EmptyState({ activeFilter, setActiveFilter }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-gray-200/60 dark:border-gray-700/60"
    >
      <div className="text-4xl mb-4">{activeFilter === "solved" ? "✅" : "🎯"}</div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {activeFilter === "solved" ? "No Completed Challenges" : "All Challenges Completed"}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md mx-auto">
        {activeFilter === "solved"
          ? "Start solving challenges to see them here!"
          : "Great job! You've completed all available challenges."}
      </p>
      {activeFilter === "solved" && (
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setActiveFilter("unsolved")}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium py-2 px-6 rounded-xl shadow-lg shadow-indigo-500/25"
        >
          View Unsolved Challenges
        </motion.button>
      )}
    </motion.div>
  );
}

function ChallengeCard({ challenge, solved, solving, selectedAnswer, onSelect, onAnswer }) {
  const getDifficultyInfo = (points) => {
    if (points >= 100) return { color: "bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400", text: "Expert" };
    if (points >= 75) return { color: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400", text: "Hard" };
    if (points >= 50) return { color: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400", text: "Medium" };
    return { color: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400", text: "Easy" };
  };

  const difficultyInfo = getDifficultyInfo(challenge.points);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border overflow-hidden transition-shadow hover:shadow-lg hover:shadow-indigo-500/10 ${
        solved ? "border-emerald-300/60 dark:border-emerald-700/60" : "border-white/60 dark:border-gray-700/60"
      }`}
    >
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className="font-bold text-gray-900 dark:text-white text-lg mb-2 line-clamp-2">{challenge.title}</h3>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${difficultyInfo.color}`}>
                {difficultyInfo.text}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400">• {challenge.points} XP</span>
            </div>
          </div>
          {solved && <CheckCircle2 className="text-emerald-500 shrink-0" size={22} />}
        </div>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-5 line-clamp-3">{challenge.description}</p>

        <div className="space-y-2 mb-5">
          {challenge.options.map((option, index) => {
            const isSelected = selectedAnswer === option;
            return (
              <motion.button
                key={index}
                whileHover={!solved && !solving ? { x: 4 } : {}}
                whileTap={!solved && !solving ? { scale: 0.98 } : {}}
                onClick={() => !solved && !solving && onSelect(option)}
                disabled={solved || solving}
                className={`w-full text-left p-3 rounded-xl border transition-all duration-200 ${
                  solved || solving
                    ? "bg-gray-50 dark:bg-gray-900 text-gray-400 border-gray-200 dark:border-gray-700 cursor-not-allowed"
                    : isSelected
                    ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-600 ring-2 ring-indigo-500/20"
                    : "bg-gray-50/80 dark:bg-gray-900/50 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 hover:border-indigo-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                      isSelected
                        ? "bg-indigo-600 text-white"
                        : "bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                    }`}
                  >
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="flex-1 text-sm">{option}</span>
                </div>
              </motion.button>
            );
          })}
        </div>

        <motion.button
          whileHover={!solved && !solving && selectedAnswer ? { scale: 1.02 } : {}}
          whileTap={!solved && !solving && selectedAnswer ? { scale: 0.98 } : {}}
          onClick={() => selectedAnswer && !solved && !solving && onAnswer(challenge._id, selectedAnswer)}
          disabled={solved || solving || !selectedAnswer}
          className={`w-full py-3 rounded-xl font-medium transition-all duration-200 ${
            solved
              ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-700 cursor-not-allowed"
              : solving
              ? "bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
              : selectedAnswer
              ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/25"
              : "bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed"
          }`}
        >
          {solved ? (
            <span className="flex items-center justify-center gap-2"><CheckCircle2 size={16} /> Completed</span>
          ) : solving ? (
            <span className="flex items-center justify-center gap-2"><Loader2 size={16} className="animate-spin" /> Checking...</span>
          ) : (
            "Submit Answer"
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
