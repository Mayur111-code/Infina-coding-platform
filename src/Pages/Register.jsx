import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = ({ setUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    useremail: "",
    userpass: "",
    userbirthdate: "",
    userprofile: null,
  });
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, userprofile: URL.createObjectURL(file) }));
      const reader = new FileReader();
      reader.onload = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if user already exists
    const userExists = users.some((u) => u.useremail === formData.useremail);
    if (userExists) {
      alert("User already registered! Please sign in.");
      navigate("/signin");
      return;
    }

    // Add new user
    users.push(formData);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("user", JSON.stringify(formData)); // log in new user
    setUser(formData);
    alert("Registration successful!");
    navigate("/"); // dashboard
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Create Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover mb-2"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                <span className="text-gray-500">+</span>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              id="userprofile"
            />
            <label htmlFor="userprofile" className="cursor-pointer text-indigo-600 hover:underline">
              Upload Photo
            </label>
          </div>

          <input
            type="text"
            name="username"
            placeholder="Username"
            required
            value={formData.username}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="email"
            name="useremail"
            placeholder="Email"
            required
            value={formData.useremail}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="password"
            name="userpass"
            placeholder="Password"
            required
            value={formData.userpass}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="date"
            name="userbirthdate"
            required
            value={formData.userbirthdate}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />

          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Register
          </button>

          <p className="text-center text-sm">
            Already have an account?{" "}
            <span
              className="text-indigo-600 cursor-pointer hover:underline"
              onClick={() => navigate("/signin")}
            >
              Sign in
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
