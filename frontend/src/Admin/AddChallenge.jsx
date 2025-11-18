import React, { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function AddChallenge() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    points: "",
    options: ["", "", "", ""],
    correct: "",
  });

  const [loading, setLoading] = useState(false);

  const API = "http://127.0.0.1:3000/api"; // ⭐ LOCAL ONLY

  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // MCQ options
  const handleOptionChange = (index, value) => {
    const updated = [...formData.options];
    updated[index] = value;
    setFormData({ ...formData, options: updated });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

   
    if (
      !formData.title ||
      !formData.description ||
      !formData.points ||
      !formData.correct ||
      formData.options.some((opt) => !opt)
    ) {
      toast.error("Please fill all fields!");
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API}/challenges`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        toast.success("✅ Challenge added successfully!");

        // Reset form
        setFormData({
          title: "",
          description: "",
          points: "",
          options: ["", "", "", ""],
          correct: "",
        });

        // Redirect
        setTimeout(() => navigate("/admin/dashboard"), 1000);
      } else {
        toast.error(data.message || "Failed to add challenge!");
      }

    } catch (error) {
      console.error("Error adding challenge:", error);
      toast.error("Something went wrong!");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-8">
        <h2 className="text-2xl font-bold text-center text-indigo-700 mb-6">
          ➕ Add New Challenge
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Enter challenge title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Enter challenge description"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Points
            </label>
            <input
              type="number"
              name="points"
              value={formData.points}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Enter points (e.g. 10)"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-700">
              Options
            </label>
            {formData.options.map((option, index) => (
              <input
                key={index}
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg mb-2 focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder={`Option ${index + 1}`}
                required
              />
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">
              Correct Answer
            </label>
            <input
              type="text"
              name="correct"
              value={formData.correct}
              onChange={handleChange}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:ring-2 focus:ring-green-500 outline-none"
              placeholder="Enter correct option text"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold shadow-md transition ${
              loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            {loading ? "Adding..." : "Add Challenge"}
          </button>
        </form>
      </div>
    </div>
  );
}
