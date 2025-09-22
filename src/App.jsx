// import React, { useState, useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Sidebar from "./Components/Ui/Sidebar";
// import Dashboard from "./Pages/Dashboard";
// import Earnings from "./Pages/Earnings";
// import Challenges from "./Pages/Challenges";
// import Marketplace from "./Pages/Marketplace";
// import Leaderboard from "./Pages/Leaderboard";
// import History from "./Pages/History";
// import Referrals from "./Pages/Referrals";
// import Settings from "./Pages/Settings";
// import Register from "./Pages/Register";
// import SignIn from "./Pages/Signin";




// const ProtectedRoute = ({ user, children }) => {
//   if (!user) return <Navigate to="/signin" />;
//   return children;
// };

// function App() {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const loggedUser = localStorage.getItem("user");
//     if (loggedUser) setUser(JSON.parse(loggedUser));
//   }, []);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/register" element={<Register setUser={setUser} />} />
//         <Route path="/signin" element={<SignIn setUser={setUser} />} />

//         {/* Protected routes */}
//         <Route
//           path="/*"
//           element={
//             <ProtectedRoute user={user}>
//               <div className="app-container flex">
//                 <Sidebar />
//                 <main className="flex-1 p-5 bg-gray-100 min-h-screen">
//                   <Routes>
//                     <Route path="/" element={<Dashboard />} />
//                     <Route path="/earnings" element={<Earnings />} />
//                     <Route path="/challenges" element={<Challenges />} />
//                     <Route path="/marketplace" element={<Marketplace />} />
//                     <Route path="/leaderboard" element={<Leaderboard />} />
//                     <Route path="/history" element={<History />} />
//                     <Route path="/referrals" element={<Referrals />} />
//                     <Route path="/settings" element={<Settings />} />
//                      <Route path="/challenges" element={<Challenges />} />
  
//                   </Routes>
//                 </main>
//               </div>
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Components/Ui/Sidebar";
import Dashboard from "./Pages/Dashboard";
import Earnings from "./Pages/Earnings";
import Challenges from "./Pages/Challenges";
import Marketplace from "./Pages/Marketplace";
import Leaderboard from "./Pages/Leaderboard";
import History from "./Pages/History";
import Referrals from "./Pages/Referrals";
import Settings from "./Pages/Settings";
import Register from "./Pages/Register";
import SignIn from "./Pages/Signin";

const ProtectedRoute = ({ user, loading, children }) => {
  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (!user) return <Navigate to="/signin" replace />;
  return children;
};

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loggedUser = localStorage.getItem("user");
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
    setLoading(false); // ✅ localStorage check ho gaya
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/signin" element={<SignIn setUser={setUser} />} />

        {/* Protected routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute user={user} loading={loading}>
              <div className="app-container flex">
                <Sidebar />
                <main className="flex-1 p-5 bg-gray-100 min-h-screen">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/earnings" element={<Earnings />} />
                    <Route path="/challenges" element={<Challenges />} />
                    <Route path="/marketplace" element={<Marketplace />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/history" element={<History />} />
                    <Route path="/referrals" element={<Referrals />} />
                    <Route path="/settings" element={<Settings />} />
                  </Routes>
                </main>
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
