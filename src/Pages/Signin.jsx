import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = ({ setUser }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.length === 0) {
      alert("No account found! Please register first.");
      navigate("/register");
      return;
    }

    const loggedUser = users.find(
      (u) => u.useremail === formData.email && u.userpass === formData.password
    );

    if (loggedUser) {
      alert("Login successful!");
      localStorage.setItem("user", JSON.stringify(loggedUser));
      setUser(loggedUser);
      navigate("/"); // dashboard
    } else {
      alert("Invalid email or password!");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700"
          >
            Sign In
          </button>

          <p className="text-center text-sm">
            Don't have an account?{" "}
            <span
              className="text-indigo-600 cursor-pointer hover:underline"
              onClick={() => navigate("/register")}
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
