// import React, { useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// export default function Signin() {
//   const [formData, setFormData] = useState({
//     useremail: "",
//     userpass: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const API = "https://infina-coding-platform-3.onrender.com/api"; 

//   // Input change
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const res = await fetch(`https://infina-coding-platform-3.onrender.com/api/users/signin`, {
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

//         // Save token + user in localStorage
//         localStorage.setItem("token", data.token);
//         localStorage.setItem("user", JSON.stringify(data.user));

//         // Detect Admin
//         const role = data?.user?.role?.toLowerCase();

//         if (role === "admin") {
//           localStorage.setItem("isAdmin", "true");
//           setTimeout(() => {
//             window.location.href = "/admin/dashboard";
//           }, 1200);
//         } else {
//           localStorage.removeItem("isAdmin");
//           setTimeout(() => {
//             window.location.href = "/";
//           }, 1200);
//         }

//       } else {
//         toast.error(data.message || "Invalid email or password!");
//       }

//     } catch (error) {
//       console.error("Error during login:", error);
//       toast.error("Something went wrong!");
//       setLoading(false);
//     }
//   };


//   return (
//     <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 flex items-center justify-center p-4">
//       <ToastContainer />
//       <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
//           <p className="text-gray-600">Sign in to your account</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Email Field */}
//           <div>
//             <label
//               htmlFor="useremail"
//               className="block text-sm font-medium text-gray-700 mb-2"
//             >
//               Email Address
//             </label>
//             <input
//               type="email"
//               id="useremail"
//               name="useremail"
//               value={formData.useremail}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
//               placeholder="your@email.com"
//               required
//             />
//           </div>

//           {/* Password Field */}
//           <div>
//             <label
//               htmlFor="userpass"
//               className="block text-sm font-medium text-gray-700 mb-2"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="userpass"
//               name="userpass"
//               value={formData.userpass}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
//               placeholder="Enter your password"
//               required
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 shadow-lg hover:shadow-xl"
//           >
//             {loading ? "Signing In..." : "Sign In"}
//           </button>
//         </form>

//         <p className="text-center text-sm text-gray-600 mt-6">
//           Don’t have an account?{" "}
//           <a
//             href="/register"
//             className="text-indigo-600 font-semibold hover:underline"
//           >
//             Create one
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }



import { useState, useEffect } from "react";
import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";

export default function SigninForm() {
  const [formData, setFormData] = useState({
    useremail: "",
    userpass: "",
  });

  const [loading, setLoading] = useState(false);

  // Inject Toastify CSS dynamically to avoid build errors
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://cdn.jsdelivr.net/npm/react-toastify@9.1.3/dist/ReactToastify.min.css";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`https://infina-coding-platform-3.onrender.com/api/users/signin`, {
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

        // Save token + user in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        // Detect Admin
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

      } else {
        toast.error(data.message || "Invalid email or password!");
      }

    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Something went wrong!");
      setLoading(false);
    }
  };

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };


  return (
    <div className="h-screen w-full flex overflow-hidden bg-gray-50 font-sans">
      <ToastContainer />

      {/* LEFT SIDE: Decorative Art Panel (Hidden on mobile to save space) */}
      <div className="hidden lg:flex w-5/12 relative bg-indigo-600 text-white flex-col justify-between p-12 overflow-hidden">
        {/* Animated Background Shapes */}
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
        />

        <div className="relative z-10 mt-10">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl font-extrabold tracking-tight mb-6"
          >
            Infina <br /> Coding
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-indigo-100 text-lg max-w-xs"
          >
            Sign in and continue building amazing projects.
          </motion.p>
        </div>

        <div className="relative z-10 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
          <p className="italic text-indigo-50">"The greatest enemy of knowledge is not ignorance, it is the illusion of knowledge."</p>
          <div className="mt-4 flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500"></div>
             <div>
                <p className="text-sm font-bold">Secure Access</p>
                <p className="text-xs text-indigo-200">2 Factor ready</p>
             </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: The Form */}
      <div className="w-full lg:w-7/12 flex items-center justify-center p-4 lg:p-8 relative bg-white">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-lg"
        >
          <div className="mb-8 text-center lg:text-left">
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-gray-900">Welcome Back</motion.h2>
            <motion.p variants={itemVariants} className="text-gray-500 mt-1">Sign in to your account to continue.</motion.p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email */}
            <motion.div variants={itemVariants}>
              <label className="block text-xs font-semibold text-gray-700 mb-1 ml-1">Email</label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={16} />
                <input
                  type="email"
                  name="useremail"
                  value={formData.useremail}
                  onChange={handleChange}
                  className="w-full pl-9 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm"
                  placeholder="john@example.com"
                  required
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div variants={itemVariants}>
              <label className="block text-xs font-semibold text-gray-700 mb-1 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={16} />
                <input
                  type="password"
                  name="userpass"
                  value={formData.userpass}
                  onChange={handleChange}
                  className="w-full pl-9 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm"
                  placeholder="••••••••"
                  required
                />
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition duration-300 flex items-center justify-center gap-2 mt-4"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} /> Signing In...
                </>
              ) : (
                <>
                  Sign In <ArrowRight size={18} />
                </>
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <motion.p variants={itemVariants} className="text-center text-sm text-gray-500 mt-6">
            Don’t have an account?{" "}
            <a href="/register" className="text-indigo-600 font-bold hover:text-indigo-800 transition">
              Create one
            </a>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}