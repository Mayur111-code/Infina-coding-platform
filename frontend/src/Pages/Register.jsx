// import { useState } from "react";
// import { Upload, X, User, Mail, Lock, Calendar, ArrowRight, Loader2 } from "lucide-react";
// import { toast } from "sonner";
// import { motion } from "framer-motion";

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
//   const [isHoveringFile, setIsHoveringFile] = useState(false);

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
//   const removeImage = (e) => {
//     if(e) e.stopPropagation(); // Prevent triggering file input if button is inside label
//     setFormData({
//       ...formData,
//       userprofile: null,
//     });
//     setPreviewUrl(null);
//   };

//   // YOUR EXACT BACKEND LOGIC
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const submitData = new FormData();
//       submitData.append("username", formData.username);
//       submitData.append("useremail", formData.useremail);
//       submitData.append("userpass", formData.userpass);
//       submitData.append("userbirthdate", formData.userbirthdate);
//       if (formData.userprofile) {
//         submitData.append("userprofile", formData.userprofile);
//       }

//       const res = await fetch("https://infina-coding-platform-3.onrender.com/api/users/register",
//         {
//           method: "POST",
//           body: submitData,   
//         }
//       );

//       const data = await res.json();
//       setLoading(false);

//       if (res.ok) {
//         toast.success("Registration successful!");

//         localStorage.setItem("user", JSON.stringify(data.user));

//         setTimeout(() => {
//           window.location.href = "/signin";
//         }, 1500);
//       } else {
//         toast.error(data.message || "Registration failed!");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       toast.error("Something went wrong!");
//       setLoading(false);
//     }
//   };

//   // Animations
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: { y: 0, opacity: 1 },
//   };

//   return (
//     <div className="h-screen w-full flex overflow-hidden bg-gray-50 font-sans">
//       {/* LEFT SIDE: Decorative Art Panel (Hidden on mobile to save space) */}
//       <div className="hidden lg:flex w-5/12 relative bg-indigo-600 text-white flex-col justify-between p-12 overflow-hidden">
//         {/* Animated Background Shapes */}
//         <motion.div 
//           animate={{ rotate: 360 }}
//           transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
//           className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
//         />
//         <motion.div 
//           animate={{ rotate: -360 }}
//           transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
//           className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-50"
//         />

//         <div className="relative z-10 mt-10">
//           <motion.h1 
//             initial={{ opacity: 0, x: -20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.2 }}
//             className="text-5xl font-extrabold tracking-tight mb-6"
//           >
//             Infina <br /> Coding
//           </motion.h1>
//           <motion.p 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.4 }}
//             className="text-indigo-100 text-lg max-w-xs"
//           >
//             Join the community where developers build the future.
//           </motion.p>
//         </div>

//         <div className="relative z-10 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
//           <p className="italic text-indigo-50">"Code is like humor. When you have to explain it, it’s bad."</p>
//           <div className="mt-4 flex items-center gap-3">
//              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500"></div>
//              <div>
//                 <p className="text-sm font-bold">Start Building</p>
//                 <p className="text-xs text-indigo-200">Free forever</p>
//              </div>
//           </div>
//         </div>
//       </div>

//       {/* RIGHT SIDE: The Form */}
//       <div className="w-full lg:w-7/12 flex items-center justify-center p-4 lg:p-8 relative bg-white">
//         <motion.div 
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//           className="w-full max-w-lg"
//         >
//           <div className="mb-6 text-center lg:text-left">
//             <motion.h2 variants={itemVariants} className="text-3xl font-bold text-gray-900">Create Account</motion.h2>
//             <motion.p variants={itemVariants} className="text-gray-500 mt-1">Please enter your details to register.</motion.p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-4">
            
//             {/* PROFILE UPLOAD - Compact Circular Design */}
//             <motion.div variants={itemVariants} className="flex justify-center lg:justify-start mb-4">
//               <div 
//                 className="relative group cursor-pointer"
//                 onMouseEnter={() => setIsHoveringFile(true)}
//                 onMouseLeave={() => setIsHoveringFile(false)}
//               >
//                 <label className={`w-20 h-20 rounded-full flex items-center justify-center border-2 border-dashed transition-all duration-300 overflow-hidden relative ${previewUrl ? 'border-indigo-500' : 'border-gray-300 hover:border-indigo-400'}`}>
//                   {previewUrl ? (
//                     <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
//                   ) : (
//                     <Upload className="text-gray-400" size={20} />
//                   )}
                  
//                   {/* Overlay */}
//                   <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-200 ${isHoveringFile || !previewUrl ? 'opacity-100' : 'opacity-0'}`}>
//                      {!previewUrl && <span className="text-[9px] text-white font-medium">Upload</span>}
//                      {previewUrl && <span className="text-[9px] text-white font-medium">Change</span>}
//                   </div>

//                   <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
//                 </label>

//                 {previewUrl && (
//                   <button onClick={removeImage} type="button" className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors z-20">
//                     <X size={10} />
//                   </button>
//                 )}
//               </div>
//             </motion.div>

//             {/* FORM GRID - 2 Columns to prevent scrolling */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
//               {/* Username */}
//               <motion.div variants={itemVariants}>
//                 <label className="block text-xs font-semibold text-gray-700 mb-1 ml-1">Username</label>
//                 <div className="relative group">
//                   <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={16} />
//                   <input
//                     type="text"
//                     name="username"
//                     value={formData.username}
//                     onChange={handleChange}
//                     className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm"
//                     placeholder="johndoe"
//                     required
//                   />
//                 </div>
//               </motion.div>

//               {/* Email */}
//               <motion.div variants={itemVariants}>
//                 <label className="block text-xs font-semibold text-gray-700 mb-1 ml-1">Email</label>
//                 <div className="relative group">
//                   <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={16} />
//                   <input
//                     type="email"
//                     name="useremail"
//                     value={formData.useremail}
//                     onChange={handleChange}
//                     className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm"
//                     placeholder="john@example.com"
//                     required
//                   />
//                 </div>
//               </motion.div>

//               {/* Password */}
//               <motion.div variants={itemVariants}>
//                 <label className="block text-xs font-semibold text-gray-700 mb-1 ml-1">Password</label>
//                 <div className="relative group">
//                   <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={16} />
//                   <input
//                     type="password"
//                     name="userpass"
//                     value={formData.userpass}
//                     onChange={handleChange}
//                     className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm"
//                     placeholder="••••••••"
//                     required
//                   />
//                 </div>
//               </motion.div>

//               {/* Birthdate */}
//               <motion.div variants={itemVariants}>
//                 <label className="block text-xs font-semibold text-gray-700 mb-1 ml-1">Date of Birth</label>
//                 <div className="relative group">
//                   <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={16} />
//                   <input
//                     type="date"
//                     name="userbirthdate"
//                     value={formData.userbirthdate}
//                     onChange={handleChange}
//                     className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm text-gray-600"
//                     required
//                   />
//                 </div>
//               </motion.div>
//             </div>

//             {/* Submit Button */}
//             <motion.button
//               variants={itemVariants}
//               whileHover={{ scale: 1.01 }}
//               whileTap={{ scale: 0.98 }}
//               type="submit"
//               disabled={loading}
//               className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition duration-300 flex items-center justify-center gap-2 mt-2"
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="animate-spin" size={18} /> Registering...
//                 </>
//               ) : (
//                 <>
//                   Create Account <ArrowRight size={18} />
//                 </>
//               )}
//             </motion.button>
//           </form>

//           {/* Footer */}
//           <motion.p variants={itemVariants} className="text-center text-sm text-gray-500 mt-6">
//             Already have an account?{" "}
//             <a href="/signin" className="text-indigo-600 font-bold hover:text-indigo-800 transition">
//               Sign in
//             </a>
//           </motion.p>
//         </motion.div>
//       </div>
//     </div>
//   );
// }




import { useState } from "react";
import { Upload, X, User, Mail, Lock, Calendar, ArrowRight, Loader2, Code2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function RegistrationForm() {
  const [formData, setFormData] = useState({
    username: "", useremail: "", userpass: "", userbirthdate: "", userprofile: null,
  });
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isHoveringFile, setIsHoveringFile] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, userprofile: file });
      const reader = new FileReader();
      reader.onloadend = () => setPreviewUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = (e) => {
    if (e) e.stopPropagation();
    setFormData({ ...formData, userprofile: null });
    setPreviewUrl(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const submitData = new FormData();
      submitData.append("username", formData.username);
      submitData.append("useremail", formData.useremail);
      submitData.append("userpass", formData.userpass);
      submitData.append("userbirthdate", formData.userbirthdate);
      if (formData.userprofile) submitData.append("userprofile", formData.userprofile);

      const res = await fetch("https://infina-coding-platform-3.onrender.com/api/users/register", {
        method: "POST",
        body: submitData,
      });
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        toast.success("Registration successful!");
        localStorage.setItem("user", JSON.stringify(data.user));
        setTimeout(() => { window.location.href = "/signin"; }, 1500);
      } else {
        toast.error(data.message || "Registration failed!");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong!");
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.07 } },
  };
  const itemVariants = {
    hidden: { y: 16, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
  };

  const inputStyle = {
    width: "100%", boxSizing: "border-box",
    paddingLeft: 40, paddingRight: 14, paddingTop: 11, paddingBottom: 11,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 10, color: "#fff", fontSize: "0.875rem",
    outline: "none", transition: "border-color 0.2s, background 0.2s",
  };

  const labelStyle = {
    display: "block", fontSize: "0.7rem", fontWeight: 600,
    color: "rgba(255,255,255,0.45)", marginBottom: "0.4rem",
    textTransform: "uppercase", letterSpacing: "0.07em",
  };

  const iconStyle = {
    position: "absolute", left: 13, top: "50%",
    transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)",
  };

  const onFocus = (e) => { e.target.style.borderColor = "rgba(124,58,237,0.7)"; e.target.style.background = "rgba(124,58,237,0.06)"; };
  const onBlur = (e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.background = "rgba(255,255,255,0.05)"; };

  return (
    <div style={{
      minHeight: "100vh", width: "100%", display: "flex", overflow: "hidden",
      background: "linear-gradient(135deg, #0f1117 0%, #161b27 50%, #0f1117 100%)",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    }}>
      {/* ── LEFT PANEL ── */}
      <div className="hidden lg:flex" style={{
        width: "42%", position: "relative", flexDirection: "column",
        justifyContent: "space-between", padding: "3rem", overflow: "hidden",
        background: "linear-gradient(160deg, #1a1f2e 0%, #141824 100%)",
        borderRight: "1px solid rgba(255,255,255,0.05)",
      }}>
        {/* Grid overlay */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />
        {/* Orbs */}
        <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", width: 340, height: 340, top: -80, left: -80, borderRadius: "50%", filter: "blur(70px)", opacity: 0.15, background: "#7c3aed" }} />
        <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{ position: "absolute", width: 260, height: 260, bottom: 60, right: -60, borderRadius: "50%", filter: "blur(70px)", opacity: 0.12, background: "#10b981" }} />

        {/* Brand */}
        <div style={{ position: "relative", zIndex: 10 }}>
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "2.5rem" }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg, #7c3aed, #4f46e5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Code2 size={20} color="#fff" />
            </div>
            <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>Infina Coding</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            style={{ fontSize: "2.6rem", fontWeight: 800, color: "#fff", lineHeight: 1.15, letterSpacing: "-0.04em", marginBottom: "1rem" }}>
            Join the<br />
            <span style={{ background: "linear-gradient(90deg, #10b981, #06b6d4)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Community.
            </span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
            style={{ color: "rgba(255,255,255,0.45)", fontSize: "0.95rem", maxWidth: 260, lineHeight: 1.6 }}>
            Build skills. Earn XP. Climb the leaderboard.
          </motion.p>
        </div>

        {/* Feature list */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
          style={{ position: "relative", zIndex: 10, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {[
            { icon: "🏆", text: "Earn points & global ranking" },
            { icon: "⚡", text: "500+ coding challenges" },
            { icon: "🎯", text: "Track your learning journey" },
          ].map((f) => (
            <div key={f.text} style={{ display: "flex", alignItems: "center", gap: "0.75rem",
              background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 10, padding: "0.75rem 1rem" }}>
              <span style={{ fontSize: "1.1rem" }}>{f.icon}</span>
              <span style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.55)" }}>{f.text}</span>
            </div>
          ))}
        </motion.div>

        {/* Quote */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}
          style={{ position: "relative", zIndex: 10, background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "1.25rem" }}>
          <div style={{ width: 3, height: 40, background: "linear-gradient(180deg, #10b981, #06b6d4)", borderRadius: 2, float: "left", marginRight: "0.875rem" }} />
          <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.5)", fontStyle: "italic", lineHeight: 1.6 }}>
            "Code is like humor. When you have to explain it, it's bad."
          </p>
          <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.25)", marginTop: 8 }}>— Cory House</p>
        </motion.div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", position: "relative", overflowY: "auto" }}>
        <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 70%)",
          top: "50%", left: "50%", transform: "translate(-50%, -50%)", pointerEvents: "none" }} />

        <motion.div variants={containerVariants} initial="hidden" animate="visible"
          style={{ width: "100%", maxWidth: 440, position: "relative", zIndex: 1, paddingTop: "1rem", paddingBottom: "1rem" }}>

          {/* Mobile logo */}
          <motion.div variants={itemVariants} className="flex lg:hidden"
            style={{ alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
            <div style={{ width: 32, height: 32, borderRadius: 8, background: "linear-gradient(135deg, #7c3aed, #4f46e5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Code2 size={15} color="#fff" />
            </div>
            <span style={{ fontSize: "1rem", fontWeight: 700, color: "#fff" }}>Infina Coding</span>
          </motion.div>

          <motion.div variants={itemVariants} style={{ marginBottom: "1.75rem" }}>
            <h2 style={{ fontSize: "1.85rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.04em", margin: 0 }}>Create Account</h2>
            <p style={{ color: "rgba(255,255,255,0.4)", marginTop: "0.4rem", fontSize: "0.875rem" }}>Fill in your details to get started</p>
          </motion.div>

          {/* Avatar Upload */}
          <motion.div variants={itemVariants} style={{ display: "flex", alignItems: "center", gap: "1.25rem", marginBottom: "1.5rem",
            background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "0.9rem 1rem" }}>
            <div
              style={{ position: "relative", cursor: "pointer" }}
              onMouseEnter={() => setIsHoveringFile(true)}
              onMouseLeave={() => setIsHoveringFile(false)}
            >
              <label style={{ cursor: "pointer" }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%", overflow: "hidden",
                  border: `2px dashed ${previewUrl ? "rgba(124,58,237,0.6)" : "rgba(255,255,255,0.2)"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: previewUrl ? "transparent" : "rgba(255,255,255,0.04)",
                  transition: "border-color 0.2s",
                  position: "relative",
                }}>
                  {previewUrl ? (
                    <img src={previewUrl} alt="Preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <Upload size={18} color="rgba(255,255,255,0.3)" />
                  )}
                  {(isHoveringFile || previewUrl) && (
                    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: "0.6rem", color: "#fff", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        {previewUrl ? "Change" : "Upload"}
                      </span>
                    </div>
                  )}
                </div>
                <input type="file" accept="image/*" onChange={handleFileChange} style={{ display: "none" }} />
              </label>
              {previewUrl && (
                <button onClick={removeImage} type="button" style={{
                  position: "absolute", top: -4, right: -4,
                  background: "#ef4444", border: "none", borderRadius: "50%",
                  width: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", zIndex: 20,
                }}>
                  <X size={10} color="#fff" />
                </button>
              )}
            </div>
            <div>
              <p style={{ fontSize: "0.825rem", fontWeight: 600, color: "rgba(255,255,255,0.7)", margin: 0 }}>Profile Photo</p>
              <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.3)", margin: "0.2rem 0 0" }}>Optional · JPG, PNG, GIF</p>
            </div>
          </motion.div>

          {/* Form Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            {/* Username */}
            <motion.div variants={itemVariants}>
              <label style={labelStyle}>Username</label>
              <div style={{ position: "relative" }}>
                <User size={14} style={iconStyle} />
                <input type="text" name="username" value={formData.username} onChange={handleChange}
                  placeholder="johndoe" required style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
              </div>
            </motion.div>

            {/* Email */}
            <motion.div variants={itemVariants}>
              <label style={labelStyle}>Email</label>
              <div style={{ position: "relative" }}>
                <Mail size={14} style={iconStyle} />
                <input type="email" name="useremail" value={formData.useremail} onChange={handleChange}
                  placeholder="john@example.com" required style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div variants={itemVariants}>
              <label style={labelStyle}>Password</label>
              <div style={{ position: "relative" }}>
                <Lock size={14} style={iconStyle} />
                <input type="password" name="userpass" value={formData.userpass} onChange={handleChange}
                  placeholder="••••••••" required style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
              </div>
            </motion.div>

            {/* Date of Birth */}
            <motion.div variants={itemVariants}>
              <label style={labelStyle}>Date of Birth</label>
              <div style={{ position: "relative" }}>
                <Calendar size={14} style={iconStyle} />
                <input type="date" name="userbirthdate" value={formData.userbirthdate} onChange={handleChange}
                  required style={{ ...inputStyle, colorScheme: "dark" }} onFocus={onFocus} onBlur={onBlur} />
              </div>
            </motion.div>
          </div>

          {/* Submit */}
          <motion.div variants={itemVariants} style={{ marginTop: "1.25rem" }}>
            <motion.button
              whileHover={{ scale: 1.015 }}
              whileTap={{ scale: 0.975 }}
              onClick={handleSubmit}
              disabled={loading}
              style={{
                width: "100%", padding: "13px 24px",
                background: loading ? "rgba(16,185,129,0.4)" : "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                border: "none", borderRadius: 10, color: "#fff",
                fontWeight: 700, fontSize: "0.9rem",
                cursor: loading ? "not-allowed" : "pointer",
                display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                boxShadow: "0 4px 24px rgba(16,185,129,0.3)",
                transition: "background 0.2s",
              }}
            >
              {loading ? (
                <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Registering...</>
              ) : (
                <>Create Account <ArrowRight size={16} /></>
              )}
            </motion.button>
          </motion.div>

          {/* Divider + Footer */}
          <motion.div variants={itemVariants} style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "1.25rem 0" }}>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
            <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.08em" }}>or</span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
          </motion.div>

          <motion.p variants={itemVariants} style={{ textAlign: "center", fontSize: "0.875rem", color: "rgba(255,255,255,0.35)", margin: 0 }}>
            Already have an account?{" "}
            <a href="/signin" style={{ color: "#10b981", fontWeight: 700, textDecoration: "none" }}>Sign in</a>
          </motion.p>
        </motion.div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        input::placeholder { color: rgba(255,255,255,0.2) !important; }
        input[type="date"]::-webkit-calendar-picker-indicator { filter: invert(1) opacity(0.3); cursor: pointer; }
      `}</style>
    </div>
  );
}