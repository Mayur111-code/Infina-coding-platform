// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { PlusCircle, Edit, Trash2, Users, Trophy, LogOut } from "lucide-react";
// import { toast } from "react-toastify";

// function AdminDashboard() {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     localStorage.removeItem("isAdmin");
//     toast.info("Admin logged out successfully 👋");
//     setTimeout(() => navigate("/signin"), 1000);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 p-6">
//       {/* Header */}
//       <header className="flex items-center justify-between bg-white shadow-md rounded-xl px-6 py-4 mb-8">
//         <h1 className="text-2xl font-bold text-indigo-700">🧑‍💼 Admin Dashboard</h1>
//         <button
//           onClick={handleLogout}
//           className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
//         >
//           <LogOut size={18} /> Logout
//         </button>
//       </header>
      

//       {/* Main Grid */}
// <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

//   {/* Add Challenge */}
//   <div
//     onClick={() => navigate("/admin/add-challenge")}
//     className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl p-6 cursor-pointer shadow-lg hover:scale-105 transition-all"
//   >
//     <div className="flex items-center justify-between">
//       <h2 className="text-lg font-semibold">Add Challenge</h2>
//       <PlusCircle size={28} />
//     </div>
//     <p className="text-sm mt-2 text-indigo-100">
//       Create new coding challenges for users.
//     </p>
//   </div>

//   {/* Add Reward */}
//   <div
//     onClick={() => navigate("/admin/add-reward")}
//     className="bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-xl p-6 cursor-pointer shadow-lg hover:scale-105 transition-all"
//   >
//     <div className="flex items-center justify-between">
//       <h2 className="text-lg font-semibold">Add Reward</h2>
//       <PlusCircle size={28} />
//     </div>
//     <p className="text-sm mt-2 text-pink-100">
//       Add marketplace reward items for users to redeem.
//     </p>
//   </div>

//   {/* Manage Challenges */}
//   <div
//     onClick={() => navigate("/admin/manage-challenges")}
//     className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl p-6 cursor-pointer shadow-lg hover:scale-105 transition-all"
//   >
//     <div className="flex items-center justify-between">
//       <h2 className="text-lg font-semibold">Manage Challenges</h2>
//       <Edit size={28} />
//     </div>
//     <p className="text-sm mt-2 text-green-100">
//       View, edit or delete existing challenges.
//     </p>
//   </div>

//   {/* Manage Users */}
//   <div
//     onClick={() => navigate("/admin/users")}
//     className="bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-xl p-6 cursor-pointer shadow-lg hover:scale-105 transition-all"
//   >
//     <div className="flex items-center justify-between">
//       <h2 className="text-lg font-semibold">Manage Users</h2>
//       <Users size={28} />
//     </div>
//     <p className="text-sm mt-2 text-amber-100">
//       Monitor registered users and their activity.
//     </p>
//   </div>

//   {/* Leaderboard */}
//   <div
//     onClick={() => navigate("/admin/leaderboard")}
//     className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-xl p-6 cursor-pointer shadow-lg hover:scale-105 transition-all"
//   >
//     <div className="flex items-center justify-between">
//       <h2 className="text-lg font-semibold">Leaderboard</h2>
//       <Trophy size={28} />
//     </div>
//     <p className="text-sm mt-2 text-blue-100">
//       View top performers and rank positions.
//     </p>
//   </div>

// </div>
//    </div>
//   );
// }

// export default AdminDashboard;



import React from "react";
import { useNavigate } from "react-router-dom";
import { PlusCircle, Edit, Users, Trophy, LogOut } from "lucide-react";
import { toast } from "react-toastify";

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("isAdmin");
    toast.info("Admin logged out successfully 👋");
    setTimeout(() => navigate("/signin"), 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 p-6">

      {/* Header */}
      <header className="flex items-center justify-between bg-white shadow-md rounded-xl px-6 py-4 mb-8">
        <h1 className="text-2xl font-bold text-indigo-700">🧑‍💼 Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          <LogOut size={18} /> Logout
        </button>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {/* Add Challenge */}
        <div
          onClick={() => navigate("/admin/add-challenge")}
          className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl p-6 cursor-pointer shadow-lg hover:scale-105 transition-all"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Add Challenge</h2>
            <PlusCircle size={28} />
          </div>
          <p className="text-sm mt-2 text-indigo-100">
            Create new coding challenges for users.
          </p>
        </div>

        {/* Add Reward */}
        <div
          onClick={() => navigate("/admin/add-reward")}
          className="bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-xl p-6 cursor-pointer shadow-lg hover:scale-105 transition-all"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Add Reward</h2>
            <PlusCircle size={28} />
          </div>
          <p className="text-sm mt-2 text-pink-100">
            Add marketplace reward items for users to redeem.
          </p>
        </div>

        {/* Manage Challenges */}
        <div
          onClick={() => navigate("/admin/manage-challenges")}
          className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-xl p-6 cursor-pointer shadow-lg hover:scale-105 transition-all"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Manage Challenges</h2>
            <Edit size={28} />
          </div>
          <p className="text-sm mt-2 text-green-100">
            View, edit or delete existing challenges.
          </p>
        </div>

        {/* Manage Users
        <div
          onClick={() => navigate("/admin/users")}
          className="bg-gradient-to-br from-amber-500 to-orange-600 text-white rounded-xl p-6 cursor-pointer shadow-lg hover:scale-105 transition-all"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Manage Users</h2>
            <Users size={28} />
          </div>
          <p className="text-sm mt-2 text-amber-100">
            Monitor registered users and their activity.
          </p>
        </div> */}

        {/* Leaderboard
        <div
          onClick={() => navigate("/admin/leaderboard")}
          className="bg-gradient-to-br from-blue-500 to-cyan-600 text-white rounded-xl p-6 cursor-pointer shadow-lg hover:scale-105 transition-all"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Leaderboard</h2>
            <Trophy size={28} />
          </div>
          <p className="text-sm mt-2 text-blue-100">
            View top performers and rank positions.
          </p>
        </div> */}

        {/* 🔥 Manage Rewards (ADDED NEW CARD) */}
        <div
          onClick={() => navigate("/admin/manage-rewards")}
          className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white rounded-xl p-6 cursor-pointer shadow-lg hover:scale-105 transition-all"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Manage Rewards</h2>
            <Edit size={28} />
          </div>
          <p className="text-sm mt-2 text-indigo-100">
            Edit or delete marketplace rewards.
          </p>
        </div>

      </div>
      
    </div>
  );
}

export default AdminDashboard;
