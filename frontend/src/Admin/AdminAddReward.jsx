// src/pages/AdminAddReward.jsx
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function AdminAddReward() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    pointsRequired: "",
    price: "",
    originalPrice: "",
    validity: "1 Month",
    rating: 4.5,
    category: "",
    image: "",
    isPopular: false,
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Admin token required");

    // Basic validation
    if (!form.title || !form.pointsRequired || !form.image) {
      return toast.error("Title, image and points are required");
    }

    setLoading(true);
    try {
      const body = {
        title: form.title,
        description: form.description,
        pointsRequired: Number(form.pointsRequired),
        price: Number(form.price || 0),
        originalPrice: Number(form.originalPrice || 0),
        validity: form.validity,
        rating: Number(form.rating),
        category: form.category,
        image: form.image,
        isPopular: form.isPopular,
      };

      const res = await fetch("http://127.0.0.1:3000/api/rewards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Failed to create reward");

      toast.success("Reward created!");
      setForm({
        title: "",
        description: "",
        pointsRequired: "",
        price: "",
        originalPrice: "",
        validity: "1 Month",
        rating: 4.5,
        category: "",
        image: "",
        isPopular: false,
      });
    } catch (err) {
      console.error("Create reward error:", err);
      toast.error(err.message || "Creation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin — Add Reward</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input name="title" value={form.title} onChange={handleChange} className="w-full border rounded p-2" />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea name="description" value={form.description} onChange={handleChange} className="w-full border rounded p-2" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium">Points Required</label>
            <input name="pointsRequired" value={form.pointsRequired} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Image URL</label>
            <input name="image" value={form.image} onChange={handleChange} className="w-full border rounded p-2" placeholder="https://..." />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm font-medium">Price</label>
            <input name="price" value={form.price} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Original Price</label>
            <input name="originalPrice" value={form.originalPrice} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
          <div>
            <label className="block text-sm font-medium">Rating</label>
            <input name="rating" value={form.rating} onChange={handleChange} className="w-full border rounded p-2" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="isPopular" checked={form.isPopular} onChange={handleChange} />
            <span>Mark as popular</span>
          </label>

          <label className="ml-auto">
            <span className="text-sm text-gray-500">Category</span>
            <input name="category" value={form.category} onChange={handleChange} className="ml-2 border rounded p-1" />
          </label>
        </div>

        <div className="flex gap-3">
          <button type="submit" className="px-4 py-2 bg-indigo-600 text-white rounded" disabled={loading}>
            {loading ? "Creating..." : "Create Reward"}
          </button>
        </div>
      </form>
    </div>
  );
}
