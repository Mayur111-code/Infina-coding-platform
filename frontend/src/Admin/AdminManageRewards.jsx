import React, { useEffect, useState } from "react";
import { Edit, Trash2, PlusCircle } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function AdminManageRewards() {
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API = "http://127.0.0.1:3000/api"; // ⭐ LOCAL API ONLY

  const fetchRewards = async () => {
    try {
      const res = await fetch(`${API}/rewards`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setRewards(data.rewards || []);
    } catch (err) {
      toast.error("Failed to load rewards");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRewards();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this reward?")) return;

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API}/rewards/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success("Reward deleted!");

      // Remove from UI
      setRewards((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      toast.error(err.message || "Delete failed");
    }
  };


  if (loading)
    return (
      <div className="p-6 text-center text-xl font-semibold">
        Loading rewards...
      </div>
    );

  return (
    <div className="p-6">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Rewards</h1>
        <button
          onClick={() => navigate("/admin/add-reward")}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700"
        >
          <PlusCircle size={18} /> Add New Reward
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rewards.map((r) => (
          <div key={r._id} className="bg-white p-4 rounded-xl shadow-md border">
            <img
              src={r.image}
              alt={r.title}
              className="w-full h-40 object-cover rounded-lg"
            />
            <h2 className="text-xl font-semibold mt-2">{r.title}</h2>
            <p className="text-sm text-gray-600">{r.description}</p>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => navigate(`/admin/edit-reward/${r._id}`)}
                className="flex items-center gap-2 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                <Edit size={16} /> Edit
              </button>

              <button
                onClick={() => handleDelete(r._id)}
                className="flex items-center gap-2 bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
