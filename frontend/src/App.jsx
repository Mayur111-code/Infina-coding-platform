import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import { AnimatePresence } from "framer-motion";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Pages/Dashboard";
import Register from "./Pages/Register";
import SignIn from "./Pages/Signin";
import Settings from "./Pages/Settings";
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

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) return <Navigate to="/signin" replace />;
  return children;
};

const AdminRoute = ({ children }) => {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  if (!isAdmin) return <Navigate to="/signin" replace />;
  return children;
};

function UserLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 min-h-screen pt-16 lg:pt-0 lg:ml-24 bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/40 dark:from-gray-950 dark:via-indigo-950/20 dark:to-purple-950/20">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/referrals" element={<Referrals />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  );
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  return (
    <Router>
      <Toaster
        position="top-right"
        richColors
        closeButton
        duration={2500}
        toastOptions={{
          classNames: {
            toast: "rounded-xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm",
          },
        }}
      />

      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<SignIn />} />

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

        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <UserLayout />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
