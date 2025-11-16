import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// export default function Signin() {
//   const [formData, setFormData] = useState({
//     useremail: "",
//     userpass: "",
//   });

//   const [loading, setLoading] = useState(false);

//   // 🧩 Handle input change
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // 🧩 Handle form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await fetch("http://127.0.0.1:3000/api/users/signin", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await res.json();
//       setLoading(false);

//       if (res.ok) {
//         toast.success("✅ Login successful!", { position: "top-right" });

//         // Save token + user info
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("user", JSON.stringify(data.user));

//         // Redirect to dashboard
//         setTimeout(() => {
//           window.location.href = "/";
//         }, 1500);
//       } else {
//         toast.error(data.message || "Invalid email or password!");
//       }
//     } catch (error) {
//       console.error("Error during login:", error);
//       toast.error("Something went wrong!");
//       setLoading(false);
//     }
//   };



export default function Signin() {
  const [formData, setFormData] = useState({
    useremail: "",
    userpass: "",
  });

  const [loading, setLoading] = useState(false);

  // 🧩 Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🧩 Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:3000/api/users/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
  toast.success("✅ Login successful!", { position: "top-right" });

  // Save token + user info
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));

  // ✅ Detect admin role safely (case-insensitive)
  const role = data?.user?.role?.toLowerCase();

  if (role === "admin") {
    localStorage.setItem("isAdmin", "true");
    setTimeout(() => {
      window.location.href = "/admin/dashboard";
    }, 1200);
  } else {
    localStorage.removeItem("isAdmin");
    setTimeout(() => {
      window.location.href = "/";
    }, 1200);
  }
}
 else {
        toast.error(data.message || "Invalid email or password!");
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Something went wrong!");
      setLoading(false);
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
      <ToastContainer />
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <label
              htmlFor="useremail"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="useremail"
              name="useremail"
              value={formData.useremail}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              placeholder="your@email.com"
              required
            />
          </div>

          {/* Password Field */}
          <div>
            <label
              htmlFor="userpass"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="userpass"
              name="userpass"
              value={formData.userpass}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 shadow-lg hover:shadow-xl"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}
