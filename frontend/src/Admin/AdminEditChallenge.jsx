import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminEditChallenge() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  const API = "http://127.0.0.1:3000/api"; // ⭐ LOCAL ONLY

  // Fetch specific challenge
  const fetchChallenge = async () => {
    try {
      const res = await fetch(`${API}/challenges`);
      const data = await res.json();

      const challenge = data.challenges.find((c) => c._id === id);
      setFormData(challenge);
    } catch (err) {
      toast.error("Failed to load challenge");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChallenge();
  }, []);

  // Handle input editing
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // editing MCQ options
  const handleOptionChange = (index, value) => {
    const updated = [...formData.options];
    updated[index] = value;

    setFormData({
      ...formData,
      options: updated,
    });
  };

  // Submit updated challenge
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    try {
      const res = await fetch(`${API}/challenges/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const json = await res.json();

      if (!res.ok) throw new Error(json.message);

      toast.success("Challenge updated!");
      navigate("/admin/manage-challenges");

    } catch (err) {
      toast.error(err.message || "Update failed!");
    }
  };


  if (loading || !formData) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Challenge</h2>

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="number"
          name="points"
          value={formData.points}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <div>
          <label className="font-medium">Options:</label>
          {formData.options.map((opt, index) => (
            <input
              key={index}
              className="w-full border p-2 rounded mt-2"
              value={opt}
              onChange={(e) => handleOptionChange(index, e.target.value)}
            />
          ))}
        </div>

        <input
          name="correct"
          value={formData.correct}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button className="bg-indigo-600 text-white px-4 py-2 rounded">
          Update Challenge
        </button>
      </form>
    </div>
  );
}
