// import React, { useEffect, useState } from "react";

// // const API_URL = "https://codeforces.com/api/problemset.problems";
// const PAGE_SIZE = 10; // ek page me 10 questions

// function Challenges() {
//   const [allQuestions, setAllQuestions] = useState([]);
//   const [displayedQuestions, setDisplayedQuestions] = useState([]);
//   const [solvedQuestions, setSolvedQuestions] = useState([]);
//   const [points, setPoints] = useState(0);
//   const [currentPage, setCurrentPage] = useState(1);

//   // Fetch API questions and solved questions from localStorage
//   useEffect(() => {
//     fetchQuestions();

//     const storedSolved = JSON.parse(localStorage.getItem("solvedQuestions")) || [];
//     setSolvedQuestions(storedSolved);

//     const storedPoints = parseInt(localStorage.getItem("totalPoints")) || 0;
//     setPoints(storedPoints);
//   }, []);

//   const fetchQuestions = async () => {
//     try {
//       const res = await fetch(API_URL);
//       const data = await res.json();
//       const questions = data.result.problems.map((q) => ({
//         id: q.contestId + q.index,
//         title: q.name,
//         description: q.tags.join(", "),
//         points: q.rating || 10,
//       }));
//       setAllQuestions(questions);
//       setDisplayedQuestions(questions.slice(0, PAGE_SIZE)); // first page
//     } catch (err) {
//       console.log("Error fetching questions:", err);
//     }
//   };

//   const handleSolve = (question) => {
//     const alreadySolved = solvedQuestions.find((q) => q.id === question.id);
//     if (alreadySolved) {
//       alert("You already solved this question!");
//       return;
//     }

//     const updatedSolved = [...solvedQuestions, question];
//     setSolvedQuestions(updatedSolved);
//     localStorage.setItem("solvedQuestions", JSON.stringify(updatedSolved));

//     const newPoints = points + question.points;
//     setPoints(newPoints);
//     localStorage.setItem("totalPoints", newPoints);

//     alert("Solved successfully! + " + question.points + " points");
//   };

//   const loadMore = () => {
//     const nextPage = currentPage + 1;
//     const start = currentPage * PAGE_SIZE;
//     const end = start + PAGE_SIZE;
//     const nextQuestions = allQuestions.slice(start, end);
//     setDisplayedQuestions([...displayedQuestions, ...nextQuestions]);
//     setCurrentPage(nextPage);
//   };

//   // Split displayed questions into unsolved and solved
//   const unsolvedQuestions = displayedQuestions.filter(
//     (q) => !solvedQuestions.find((s) => s.id === q.id)
//   );
//   const solvedDisplayed = displayedQuestions.filter((q) =>
//     solvedQuestions.find((s) => s.id === q.id)
//   );

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold mb-6 text-indigo-600">💡 Coding Challenges</h1>
//       <p className="mb-4 text-gray-700 font-semibold">Total Points: {points}</p>

//       <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//         {/* Unsolved Questions first */}
//         {unsolvedQuestions.map((ch) => (
//           <div
//             key={ch.id}
//             className="p-5 bg-white shadow-lg rounded-xl border hover:shadow-xl transition"
//           >
//             <h2 className="text-lg font-semibold text-gray-800">{ch.title}</h2>
//             <p className="text-gray-600 mt-2 line-clamp-2">{ch.description}</p>
//             <p className="text-sm text-gray-500 mt-3">Points: {ch.points}</p>
//             <button
//               onClick={() => handleSolve(ch)}
//               className="mt-4 inline-block px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
//             >
//               Solve 🚀
//             </button>
//           </div>
//         ))}

//         {/* Solved Questions below */}
//         {solvedDisplayed.map((ch) => (
//           <div
//             key={ch.id}
//             className="p-5 bg-gray-100 shadow rounded-xl border line-through"
//           >
//             <h2 className="text-lg font-semibold text-gray-500">{ch.title}</h2>
//             <p className="text-gray-400 mt-2 line-clamp-2">{ch.description}</p>
//             <p className="text-sm text-gray-400 mt-3">Points: {ch.points}</p>
//             <button
//               disabled
//               className="mt-4 inline-block px-4 py-2 bg-gray-400 text-white rounded-lg cursor-not-allowed"
//             >
//               Solved ✅
//             </button>
//           </div>
//         ))}
//       </div>

//       {/* Load More button */}
//       {displayedQuestions.length < allQuestions.length && (
//         <div className="mt-6 text-center">
//           <button
//             onClick={loadMore}
//             className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
//           >
//             Load More Questions
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Challenges;


import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { 
  Trophy, 
  Lightbulb, 
  CheckCircle, 
  Clock, 
  AlertCircle, 
  Loader,
  ChevronDown,
  Filter,
  Search
} from "lucide-react";

const PAGE_SIZE = 6;

function Challenges() {
  const [questions, setQuestions] = useState([]);
  const [displayedQuestions, setDisplayedQuestions] = useState([]);
  const [solvedQuestions, setSolvedQuestions] = useState([]);
  const [points, setPoints] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [showSolved, setShowSolved] = useState(true);

  // Enhanced data fetching with error handling
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [challengesRes] = await Promise.all([
          // axios.get("http://localhost:3000/challenges"), //for development
          axios.get("https://json-server-infinacode.onrender.com"), // for vercle
          new Promise(resolve => setTimeout(resolve, 500)) // Simulated delay for better UX
        ]);

        const data = challengesRes.data || [];
        setQuestions(data);
        setDisplayedQuestions(data.slice(0, PAGE_SIZE));
        
        // Load user progress
        const storedSolved = JSON.parse(localStorage.getItem("solvedQuestions")) || [];
        setSolvedQuestions(storedSolved);
        
        const storedPoints = parseInt(localStorage.getItem("totalPoints")) || 0;
        setPoints(storedPoints);
        
      } catch (err) {
        setError("Failed to load challenges. Please try again later.");
        console.error("Error fetching questions:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter and sort questions
  const filteredAndSortedQuestions = useCallback(() => {
    let filtered = questions.filter(q => 
      q.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Filter by solved status
    if (!showSolved) {
      filtered = filtered.filter(q => !solvedQuestions.find(s => s.id === q.id));
    }

    // Sort questions
    switch (sortBy) {
      case "points-high":
        return filtered.sort((a, b) => b.points - a.points);
      case "points-low":
        return filtered.sort((a, b) => a.points - b.points);
      case "title":
        return filtered.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return filtered;
    }
  }, [questions, searchTerm, sortBy, showSolved, solvedQuestions]);

  // Update displayed questions when filters change
  useEffect(() => {
    const filtered = filteredAndSortedQuestions();
    setDisplayedQuestions(filtered.slice(0, currentPage * PAGE_SIZE));
  }, [filteredAndSortedQuestions, currentPage]);

  const handleSolve = async (question, selectedOption) => {
    if (solvedQuestions.find((q) => q.id === question.id)) {
      alert("You already solved this question!");
      return;
    }

    if (selectedOption !== question.correct) {
      alert("Incorrect! Try again.");
      return;
    }

    // Enhanced solve handling with animation feedback
    const updatedSolved = [...solvedQuestions, question];
    setSolvedQuestions(updatedSolved);
    localStorage.setItem("solvedQuestions", JSON.stringify(updatedSolved));

    const newPoints = points + question.points;
    setPoints(newPoints);
    localStorage.setItem("totalPoints", newPoints.toString());

    // Enhanced earnings history
    const storedHistory = JSON.parse(localStorage.getItem("earningsHistory")) || [];
    const newEntry = {
      date: new Date().toISOString().split("T")[0],
      time: new Date().toLocaleTimeString(),
      challenge: question.title,
      points: question.points,
      status: "Earned",
    };

    const updateHistory = [...storedHistory, newEntry];
    localStorage.setItem("earningsHistory", JSON.stringify(updateHistory));

    // Visual feedback
    alert(`🎉 Correct! +${question.points} points earned!`);
  };

  const loadMore = () => {
    setCurrentPage(prev => prev + 1);
  };

  const resetProgress = () => {
    if (window.confirm("Are you sure you want to reset all progress? This cannot be undone.")) {
      setSolvedQuestions([]);
      setPoints(0);
      localStorage.removeItem("solvedQuestions");
      localStorage.removeItem("totalPoints");
    }
  };

  // Progress calculation
  const totalQuestions = questions.length;
  const solvedCount = solvedQuestions.length;
  const progressPercentage = totalQuestions > 0 ? (solvedCount / totalQuestions) * 100 : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center lg:ml-64">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading challenges...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center lg:ml-64 p-6">
        <div className="text-center max-w-md">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-800 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 lg:p-6 lg:ml-15 mt-16 lg:mt-0 ">
      {/* Header Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Lightbulb className="w-8 h-8 text-indigo-600" />
              Coding Challenges
            </h1>
            <p className="text-gray-600 mt-2">Test your skills and earn points!</p>
          </div>
          
          {/* Points Display */}
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4 rounded-xl min-w-[200px]">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Points</p>
                <p className="text-2xl font-bold">{points}</p>
              </div>
              <Trophy className="w-8 h-8" />
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Progress: {solvedCount}/{totalQuestions} solved</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-green-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Controls Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search challenges..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="default">Sort by Default</option>
              <option value="points-high">Points: High to Low</option>
              <option value="points-low">Points: Low to High</option>
              <option value="title">Sort by Title</option>
            </select>

            <label className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={showSolved}
                onChange={(e) => setShowSolved(e.target.checked)}
                className="rounded text-indigo-600"
              />
              <span className="text-sm">Show Solved</span>
            </label>

            <button
              onClick={resetProgress}
              className="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition"
            >
              Reset Progress
            </button>
          </div>
        </div>
      </div>

      {/* Challenges Grid */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {displayedQuestions.map((q) => {
          const isSolved = solvedQuestions.find(s => s.id === q.id);
          
          return (
            <div 
              key={q.id} 
              className={`
                p-6 rounded-2xl shadow-sm border transition-all duration-300 hover:shadow-md
                ${isSolved 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-white border-gray-200 hover:border-indigo-300'
                }
              `}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <h2 className={`text-lg font-semibold ${isSolved ? 'text-green-700 line-through' : 'text-gray-800'}`}>
                  {q.title}
                </h2>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  isSolved 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-indigo-100 text-indigo-800'
                }`}>
                  {q.points} pts
                </span>
              </div>

              {/* Description */}
              <p className={`text-sm mb-4 ${isSolved ? 'text-green-600' : 'text-gray-600'}`}>
                {q.description}
              </p>

              {/* Options */}
              <div className="space-y-2">
                {q.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => !isSolved && handleSolve(q, opt)}
                    disabled={isSolved}
                    className={`
                      w-full text-left px-3 py-2 rounded-lg border transition
                      ${isSolved
                        ? 'bg-gray-100 text-gray-400 border-gray-300 cursor-not-allowed'
                        : 'border-gray-300 hover:bg-indigo-50 hover:border-indigo-400 hover:text-indigo-700'
                      }
                    `}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {/* Status */}
              {isSolved && (
                <div className="mt-4 flex items-center gap-2 text-green-600">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Solved</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {displayedQuestions.length === 0 && (
        <div className="text-center py-12">
          <Lightbulb className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600">No challenges found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Load More Button */}
      {displayedQuestions.length < filteredAndSortedQuestions().length && (
        <div className="text-center">
          <button
            onClick={loadMore}
            className="px-8 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition flex items-center gap-2 mx-auto"
          >
            Load More
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Footer Stats */}
      <div className="text-center text-sm text-gray-500 py-4">
        Showing {displayedQuestions.length} of {filteredAndSortedQuestions().length} challenges
      </div>
    </div>
  );
}

export default Challenges;