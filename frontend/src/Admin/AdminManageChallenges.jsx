import React, { useEffect, useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function AdminManageChallenges() {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API = "https://infina-coding-platform-3.onrender.com/api";

  const fetchChallenges = async () => {
    try {
      const res = await fetch(`${API}/challenges`);
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setChallenges(data.challenges || []);
    } catch (err) {
      toast.error("Failed to load challenges!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this challenge?")) return;

    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API}/challenges/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      toast.success("Challenge deleted!");

      // Remove from UI instantly
      setChallenges((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      toast.error(err.message || "Delete failed!");
    }
  };

  

  if (loading)
    return <div className="p-6 text-center text-xl font-semibold">Loading challenges...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Challenges</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {challenges.map((c) => (
          <div key={c._id} className="bg-white p-5 rounded-xl shadow-md border">
            <h2 className="text-xl font-semibold">{c.title}</h2>
            <p className="text-sm text-gray-600 mt-1">{c.description}</p>

            <div className="mt-3">
              <div className="text-sm">
                <strong>Points:</strong> {c.points}
              </div>
              <div className="text-sm">
                <strong>Correct:</strong> {c.correct}
              </div>
            </div>

            <div className="flex justify-between mt-5">
              <button
                onClick={() => navigate(`/admin/edit-challenge/${c._id}`)}
                className="flex items-center gap-2 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                <Edit size={16} /> Edit
              </button>

              <button
                onClick={() => handleDelete(c._id)}
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
