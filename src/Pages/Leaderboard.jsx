// import React, { useEffect, useState } from "react";

// const Leaderboard = () => {
//   const [players, setPlayers] = useState([]);

//   useEffect(() => {
//     // fetch("https://json-server-infinacode.onrender.com/leaderboard")
//      fetch("http://localhost:3000/leaderboard")
//       .then((res) => res.json())
//       .then((data) => {
//         // Sort by points descending
//         const sorted = data.sort((a, b) => b.points - a.points);
//         setPlayers(sorted);
//       })
//       .catch((err) => console.error("Error fetching leaderboard:", err));
//   }, []);

//   return (
//     <div className="p-6 mt-15">
//       <h2 className="text-2xl font-bold text-indigo-600 mb-4">🏆 Leaderboard</h2>
//       <div className="bg-white shadow-md rounded-lg overflow-hidden">
//         <table className="w-full border-collapse">
//           <thead className="bg-indigo-600 text-white">
//             <tr>
//               <th className="py-3 px-4 text-left">Rank</th>
//               <th className="py-3 px-4 text-left">Player</th>
//               <th className="py-3 px-4 text-left">Points</th>
//             </tr>
//           </thead>
//           <tbody>
//             {players.map((player, index) => (
//               <tr
//                 key={player.id}
//                 className={`${
//                   index % 2 === 0 ? "bg-gray-50" : "bg-white"
//                 } hover:bg-indigo-50`}
//               >
//                 <td className="py-3 px-4 font-semibold">#{index + 1}</td>
//                 <td className="py-3 px-4">{player.name}</td>
//                 <td className="py-3 px-4">{player.points}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Leaderboard;


import React, { useEffect, useState } from "react";

const Leaderboard = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Load current user
        const storedUser = localStorage.getItem("user");
        if (storedUser) setCurrentUser(JSON.parse(storedUser));

        const response = await fetch("https://json-server-infinacode.onrender.com/leaderboard");
        const data = await response.json();
        
        // Sort by points descending
        const sorted = data.sort((a, b) => b.points - a.points);
        setPlayers(sorted);
      } catch (err) {
        setError("Failed to load leaderboard. Please try again later.");
        console.error("Error fetching leaderboard:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getRankBadge = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
  };

  const getRankColor = (rank) => {
    if (rank === 1) return "from-yellow-400 to-amber-500";
    if (rank === 2) return "from-gray-400 to-gray-500";
    if (rank === 3) return "from-amber-600 to-orange-500";
    return "from-indigo-500 to-purple-600";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center lg:ml-64 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center lg:ml-64 p-6 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center max-w-md">
          <div className="text-red-600 text-4xl mb-3">⚠️</div>
          <h2 className="text-xl font-semibold text-red-800 mb-2">Oops! Something went wrong</h2>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 lg:p-8 lg:ml-0 mt-16 lg:mt-0">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 lg:mb-8">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-2">🏆 Leaderboard</h1>
            <p className="text-sm lg:text-lg text-gray-600">Compete with other learners and climb to the top!</p>
          </div>
          
          {currentUser && (
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm shadow-lg px-4 py-2 lg:px-6 lg:py-3 rounded-xl lg:rounded-2xl w-full lg:w-auto">
              <img
                src={
                  currentUser.userprofile && currentUser.userprofile !== "null"
                    ? currentUser.userprofile
                    : `https://ui-avatars.com/api/?name=${currentUser.username}&background=6366f1&color=fff`
                }
                alt={currentUser.username}
                className="w-10 h-10 lg:w-14 lg:h-14 rounded-full border-2 border-indigo-300 shadow-md"
              />
              <div>
                <span className="font-bold text-gray-800 capitalize text-sm lg:text-lg">{currentUser.username}</span>
                <p className="text-xs lg:text-sm text-gray-600">
                  Rank: #{players.findIndex(p => p.name === currentUser.username) + 1 || "Not ranked"}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
          {/* Total Players Card */}
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-indigo-200 text-xs lg:text-sm mb-1">Total Players</p>
                <h2 className="text-2xl lg:text-3xl font-bold">{players.length}</h2>
                <p className="text-indigo-200 text-xs lg:text-sm mt-1 lg:mt-2">Active learners</p>
              </div>
              <div className="text-2xl lg:text-3xl bg-white/20 p-2 lg:p-3 rounded-full">👥</div>
            </div>
          </div>

          {/* Top Player Card */}
          <div className="bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-yellow-200 text-xs lg:text-sm mb-1">Top Player</p>
                <h2 className="text-xl lg:text-2xl font-bold truncate">
                  {players[0]?.name || "No one yet"}
                </h2>
                <p className="text-yellow-200 text-xs lg:text-sm mt-1 lg:mt-2">
                  {players[0]?.points || 0} points
                </p>
              </div>
              <div className="text-2xl lg:text-3xl bg-white/20 p-2 lg:p-3 rounded-full">👑</div>
            </div>
          </div>

          {/* Your Rank Card */}
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-green-200 text-xs lg:text-sm mb-1">Your Rank</p>
                <h2 className="text-2xl lg:text-3xl font-bold">
                  #{players.findIndex(p => p.name === currentUser?.username) + 1 || "--"}
                </h2>
                <p className="text-green-200 text-xs lg:text-sm mt-1 lg:mt-2">
                  {players.find(p => p.name === currentUser?.username)?.points || 0} points
                </p>
              </div>
              <div className="text-2xl lg:text-3xl bg-white/20 p-2 lg:p-3 rounded-full">⭐</div>
            </div>
          </div>

          {/* Average Points Card */}
          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-200 text-xs lg:text-sm mb-1">Average Points</p>
                <h2 className="text-2xl lg:text-3xl font-bold">
                  {players.length > 0 ? Math.round(players.reduce((sum, p) => sum + p.points, 0) / players.length) : 0}
                </h2>
                <p className="text-blue-200 text-xs lg:text-sm mt-1 lg:mt-2">Per player</p>
              </div>
              <div className="text-2xl lg:text-3xl bg-white/20 p-2 lg:p-3 rounded-full">📊</div>
            </div>
          </div>
        </div>

        {/* Leaderboard Content */}
        <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg overflow-hidden">
          {/* Desktop Table */}
          <div className="hidden lg:block">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <tr>
                  <th className="py-4 px-6 text-left font-semibold text-sm uppercase">Rank</th>
                  <th className="py-4 px-6 text-left font-semibold text-sm uppercase">Player</th>
                  <th className="py-4 px-6 text-left font-semibold text-sm uppercase">Points</th>
                  <th className="py-4 px-6 text-left font-semibold text-sm uppercase">Progress</th>
                </tr>
              </thead>
              <tbody>
                {players.map((player, index) => {
                  const rank = index + 1;
                  const isCurrentUser = currentUser && player.name === currentUser.username;
                  const maxPoints = players[0]?.points || 1;
                  const progressPercent = (player.points / maxPoints) * 100;

                  return (
                    <tr 
                      key={player.id}
                      className={`border-b border-gray-100 hover:bg-indigo-50 transition-all duration-200 ${
                        isCurrentUser ? 'bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-l-indigo-500' : ''
                      }`}
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r ${getRankColor(rank)} text-white font-bold text-sm`}>
                            {getRankBadge(rank)}
                          </span>
                          {isCurrentUser && (
                            <span className="ml-2 px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full font-medium">
                              You
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <img
                            src={`https://ui-avatars.com/api/?name=${player.name}&background=6366f1&color=fff`}
                            alt={player.name}
                            className="w-8 h-8 rounded-full mr-3"
                          />
                          <span className={`font-medium ${isCurrentUser ? 'text-indigo-600' : 'text-gray-800'}`}>
                            {player.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className="font-bold text-gray-900">{player.points.toLocaleString()}</span>
                        <span className="text-gray-500 text-sm ml-1">pts</span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <div className="w-24 bg-gray-200 rounded-full h-2 mr-3">
                            <div 
                              className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                              style={{ width: `${progressPercent}%` }}
                            ></div>
                          </div>
                          <span className="text-gray-600 text-sm">{Math.round(progressPercent)}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4 p-4">
            {players.map((player, index) => {
              const rank = index + 1;
              const isCurrentUser = currentUser && player.name === currentUser.username;
              const maxPoints = players[0]?.points || 1;
              const progressPercent = (player.points / maxPoints) * 100;

              return (
                <div 
                  key={player.id}
                  className={`bg-white rounded-xl shadow-lg border-2 transition-all duration-200 ${
                    isCurrentUser ? 'border-indigo-500 bg-gradient-to-r from-indigo-50 to-purple-50' : 'border-gray-100'
                  }`}
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <span className={`inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r ${getRankColor(rank)} text-white font-bold`}>
                          {getRankBadge(rank)}
                        </span>
                        <div className="ml-3">
                          <div className="flex items-center">
                            <span className={`font-bold ${isCurrentUser ? 'text-indigo-600' : 'text-gray-800'}`}>
                              {player.name}
                            </span>
                            {isCurrentUser && (
                              <span className="ml-2 px-2 py-1 bg-indigo-100 text-indigo-800 text-xs rounded-full font-medium">
                                You
                              </span>
                            )}
                          </div>
                          <span className="text-gray-600 text-sm">{player.points.toLocaleString()} points</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex-1 mr-4">
                        <div className="flex justify-between text-xs text-gray-600 mb-1">
                          <span>Progress</span>
                          <span>{Math.round(progressPercent)}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${progressPercent}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Empty State */}
          {players.length === 0 && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Players Yet</h3>
              <p className="text-gray-600">Be the first to join the leaderboard!</p>
            </div>
          )}
        </div>

        {/* Legend */}
        <div className="mt-6 bg-white rounded-xl lg:rounded-2xl shadow-lg p-4 lg:p-6">
          <h3 className="font-semibold text-gray-900 mb-3">🏅 Ranking System</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex items-center">
              <span className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">1</span>
              <span className="text-sm text-gray-600">Gold Medal</span>
            </div>
            <div className="flex items-center">
              <span className="w-6 h-6 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">2</span>
              <span className="text-sm text-gray-600">Silver Medal</span>
            </div>
            <div className="flex items-center">
              <span className="w-6 h-6 bg-gradient-to-r from-amber-600 to-orange-500 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">3</span>
              <span className="text-sm text-gray-600">Bronze Medal</span>
            </div>
            <div className="flex items-center">
              <span className="w-6 h-6 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold mr-2">4+</span>
              <span className="text-sm text-gray-600">Top Contender</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;