import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Pages/Dashboard";
import Register from "./Pages/Register";
import SignIn from "./Pages/Signin";
import Settings from "./Pages/Settings";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from "./Admin/AdminDashboard";
import AddChallenge from "./Admin/AddChallenge";
import Challenges from "./Pages/Challenges";
import Leaderboard from "./Pages/Leaderboard";
import Marketplace from "./Pages/Marketplace";
import AdminAddReward from "./Admin/AdminAddReward";
import AdminManageRewards from "./Admin/AdminManageRewards";
import AdminEditReward from "./Admin/AdminEditReward";
import AdminManageChallenges from "./Admin/AdminManageChallenges";
import AdminEditChallenge from "./Admin/AdminEditChallenge";
import Referrals from "./Pages/Referrals";

// Protected Route
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/signin" replace />;
  return children;
};

// Admin Protected Route
const AdminRoute = ({ children }) => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  if (!isAdmin) return <Navigate to="/signin" replace />;
  return children;
};

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />

      <Routes>

        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<SignIn />} />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/add-reward"
          element={
            <AdminRoute>
              <AdminAddReward />
            </AdminRoute>
          }
        />

        <Route
          path="/admin/add-challenge"
          element={
            <AdminRoute>
              <AddChallenge />
            </AdminRoute>
          }
        />


<Route path="/admin/manage-rewards" element={<AdminManageRewards />} />
<Route path="/admin/edit-reward/:id" element={<AdminEditReward />} />


<Route path="/admin/manage-challenges" element={<AdminManageChallenges />} />
<Route path="/admin/edit-challenge/:id" element={<AdminEditChallenge />} />


      

        {/* Logged-in User Routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <div className="flex">
                <Sidebar />
                <main className="flex-1 bg-gray-100 min-h-screen p-5">
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/challenges" element={<Challenges />} />
                    <Route path="/marketplace" element={<Marketplace />} />
                    <Route path="/leaderboard" element={<Leaderboard />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/referrals" element={<Referrals/>} />
                  </Routes>
                </main>
              </div>
            </ProtectedRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
