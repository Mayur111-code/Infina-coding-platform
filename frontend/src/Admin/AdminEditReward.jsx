import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function AdminEditReward() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  const API = "http://127.0.0.1:3000/api"; 

  // Fetch one reward
  const fetchReward = async () => {
    try {
      const res = await fetch(`${API}/rewards`);
      const data = await res.json();

      const one = data.rewards.find((r) => r._id === id);
      setForm(one);

    } catch (err) {
      toast.error("Failed to load reward");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReward();
  }, []);

  // Input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  //  updated reward
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API}/rewards/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message);

      toast.success("Reward updated!");
      navigate("/admin/manage-rewards");

    } catch (err) {
      toast.error(err.message || "Update failed");
    }
  };


  if (loading || !form) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Reward</h2>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <input name="title" value={form.title} onChange={handleChange} className="w-full border p-2 rounded" />
        <textarea name="description" value={form.description} onChange={handleChange} className="w-full border p-2 rounded" />

        <input name="pointsRequired" value={form.pointsRequired} onChange={handleChange} className="w-full border p-2 rounded" />
        <input name="image" value={form.image} onChange={handleChange} className="w-full border p-2 rounded" />

        <button className="bg-indigo-600 text-white px-4 py-2 rounded">Update Reward</button>
      </form>
    </div>
  );
}
