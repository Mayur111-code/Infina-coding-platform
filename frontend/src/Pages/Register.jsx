// import { useState } from "react";
// import { Upload, X } from "lucide-react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// export default function RegistrationForm() {
//   const [formData, setFormData] = useState({
//     username: "",
//     useremail: "",
//     userpass: "",
//     userbirthdate: "",
//     userprofile: null,
//   });

//   const [previewUrl, setPreviewUrl] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Handle text inputs
//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   // Handle file upload + preview
//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData({
//         ...formData,
//         userprofile: file,
//       });

//       const reader = new FileReader();
//       reader.onloadend = () => setPreviewUrl(reader.result);
//       reader.readAsDataURL(file);
//     }
//   };

//   // Remove profile image
//   const removeImage = () => {
//     setFormData({
//       ...formData,
//       userprofile: null,
//     });
//     setPreviewUrl(null);
//   };

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   setLoading(true);

//   try {
//     const submitData = new FormData();
//     submitData.append("username", formData.username);
//     submitData.append("useremail", formData.useremail);
//     submitData.append("userpass", formData.userpass);
//     submitData.append("userbirthdate", formData.userbirthdate);
//     if (formData.userprofile) {
//       submitData.append("userprofile", formData.userprofile);
//     }

//     const res = await fetch("https://infina-coding-platform-3.onrender.com/api/users/register",
//       {
//         method: "POST",
//         body: submitData,   
//       }
//     );

//     const data = await res.json();
//     setLoading(false);

//     if (res.ok) {
//       toast.success("✅ Registration Successful!", { position: "top-right" });

//       localStorage.setItem("user", JSON.stringify(data.user));

//       setTimeout(() => {
//         window.location.href = "/signin";
//       }, 1500);
//     } else {
//       toast.error(data.message || "Registration failed!");
//     }
//   } catch (error) {
//     console.error("Error:", error);
//     toast.error("Something went wrong!");
//     setLoading(false);
//   }
// };

  

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
//       <ToastContainer />
//       <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-bold text-gray-800 mb-2">
//             Create Account
//           </h2>
//           <p className="text-gray-600">Join us today</p>
//         </div>

//         <form
//           onSubmit={handleSubmit}
//           method="post"
//           encType="multipart/form-data"
//           className="space-y-5"
//         >
//           {/* Profile Picture Upload */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               Profile Picture
//             </label>
//             <div className="flex flex-col items-center">
//               {previewUrl ? (
//                 <div className="relative">
//                   <img
//                     src={previewUrl}
//                     alt="Profile preview"
//                     className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100"
//                   />
//                   <button
//                     onClick={removeImage}
//                     type="button"
//                     className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
//                   >
//                     <X size={16} />
//                   </button>
//                 </div>
//               ) : (
//                 <label className="w-32 h-32 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-full cursor-pointer hover:border-indigo-500 transition">
//                   <Upload className="text-gray-400" size={32} />
//                   <span className="text-xs text-gray-500 mt-2">Upload</span>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleFileChange}
//                     className="hidden"
//                   />
//                 </label>
//               )}
//             </div>
//           </div>

//           {/* Username */}
//           <div>
//             <label
//               htmlFor="username"
//               className="block text-sm font-medium text-gray-700 mb-2"
//             >
//               Username
//             </label>
//             <input
//               type="text"
//               id="username"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
//               placeholder="Enter your username"
//               required
//             />
//           </div>

//           {/* Email */}
//           <div>
//             <label
//               htmlFor="useremail"
//               className="block text-sm font-medium text-gray-700 mb-2"
//             >
//               Email
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

//           {/* Password */}
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

//           {/* Birthdate */}
//           <div>
//             <label
//               htmlFor="userbirthdate"
//               className="block text-sm font-medium text-gray-700 mb-2"
//             >
//               Birth Date
//             </label>
//             <input
//               type="date"
//               id="userbirthdate"
//               name="userbirthdate"
//               value={formData.userbirthdate}
//               onChange={handleChange}
//               className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition"
//               required
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition duration-200 shadow-lg hover:shadow-xl"
//           >
//             {loading ? "Registering..." : "Register"}
//           </button>
//         </form>

//         <p className="text-center text-sm text-gray-600 mt-6">
//           Already have an account?{" "}
//           <a
//             href="/signin"
//             className="text-indigo-600 font-semibold hover:underline"
//           >
//             Sign in
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { Upload, X, User, Mail, Lock, Calendar, ArrowRight, Loader2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: "",
    useremail: "",
    userpass: "",
    userbirthdate: "",
    userprofile: null,
  });

  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isHoveringFile, setIsHoveringFile] = useState(false);

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

  // Handle text inputs
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle file upload + preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        userprofile: file,
      });

      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Remove profile image
  const removeImage = (e) => {
    if(e) e.stopPropagation(); // Prevent triggering file input if button is inside label
    setFormData({
      ...formData,
      userprofile: null,
    });
    setPreviewUrl(null);
  };

  // YOUR EXACT BACKEND LOGIC
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = new FormData();
      submitData.append("username", formData.username);
      submitData.append("useremail", formData.useremail);
      submitData.append("userpass", formData.userpass);
      submitData.append("userbirthdate", formData.userbirthdate);
      if (formData.userprofile) {
        submitData.append("userprofile", formData.userprofile);
      }

      const res = await fetch("https://infina-coding-platform-3.onrender.com/api/users/register",
        {
          method: "POST",
          body: submitData,   
        }
      );

      const data = await res.json();
      setLoading(false);

      if (res.ok) {
        toast.success("✅ Registration Successful!", { position: "top-right" });

        localStorage.setItem("user", JSON.stringify(data.user));

        setTimeout(() => {
          window.location.href = "/signin";
        }, 1500);
      } else {
        toast.error(data.message || "Registration failed!");
      }
    } catch (error) {
      console.error("Error:", error);
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
            Join the community where developers build the future.
          </motion.p>
        </div>

        <div className="relative z-10 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
          <p className="italic text-indigo-50">"Code is like humor. When you have to explain it, it’s bad."</p>
          <div className="mt-4 flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500"></div>
             <div>
                <p className="text-sm font-bold">Start Building</p>
                <p className="text-xs text-indigo-200">Free forever</p>
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
          <div className="mb-6 text-center lg:text-left">
            <motion.h2 variants={itemVariants} className="text-3xl font-bold text-gray-900">Create Account</motion.h2>
            <motion.p variants={itemVariants} className="text-gray-500 mt-1">Please enter your details to register.</motion.p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* PROFILE UPLOAD - Compact Circular Design */}
            <motion.div variants={itemVariants} className="flex justify-center lg:justify-start mb-4">
              <div 
                className="relative group cursor-pointer"
                onMouseEnter={() => setIsHoveringFile(true)}
                onMouseLeave={() => setIsHoveringFile(false)}
              >
                <label className={`w-20 h-20 rounded-full flex items-center justify-center border-2 border-dashed transition-all duration-300 overflow-hidden relative ${previewUrl ? 'border-indigo-500' : 'border-gray-300 hover:border-indigo-400'}`}>
                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <Upload className="text-gray-400" size={20} />
                  )}
                  
                  {/* Overlay */}
                  <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-200 ${isHoveringFile || !previewUrl ? 'opacity-100' : 'opacity-0'}`}>
                     {!previewUrl && <span className="text-[9px] text-white font-medium">Upload</span>}
                     {previewUrl && <span className="text-[9px] text-white font-medium">Change</span>}
                  </div>

                  <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </label>

                {previewUrl && (
                  <button onClick={removeImage} type="button" className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors z-20">
                    <X size={10} />
                  </button>
                )}
              </div>
            </motion.div>

            {/* FORM GRID - 2 Columns to prevent scrolling */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Username */}
              <motion.div variants={itemVariants}>
                <label className="block text-xs font-semibold text-gray-700 mb-1 ml-1">Username</label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={16} />
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm"
                    placeholder="johndoe"
                    required
                  />
                </div>
              </motion.div>

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
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm"
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
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </motion.div>

              {/* Birthdate */}
              <motion.div variants={itemVariants}>
                <label className="block text-xs font-semibold text-gray-700 mb-1 ml-1">Date of Birth</label>
                <div className="relative group">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={16} />
                  <input
                    type="date"
                    name="userbirthdate"
                    value={formData.userbirthdate}
                    onChange={handleChange}
                    className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm text-gray-600"
                    required
                  />
                </div>
              </motion.div>
            </div>

            {/* Submit Button */}
            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition duration-300 flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={18} /> Registering...
                </>
              ) : (
                <>
                  Create Account <ArrowRight size={18} />
                </>
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <motion.p variants={itemVariants} className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{" "}
            <a href="/signin" className="text-indigo-600 font-bold hover:text-indigo-800 transition">
              Sign in
            </a>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
}