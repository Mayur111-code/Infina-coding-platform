// import { useState } from "react";
// import { Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
// import { toast } from "sonner";
// import { motion } from "framer-motion";

// export default function SigninForm() {
//   const [formData, setFormData] = useState({
//     useremail: "",
//     userpass: "",
//   });

//   const [loading, setLoading] = useState(false);

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
//         toast.success("Login successful!");

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
//             Sign in and continue building amazing projects.
//           </motion.p>
//         </div>

//         <div className="relative z-10 bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
//           <p className="italic text-indigo-50">"The greatest enemy of knowledge is not ignorance, it is the illusion of knowledge."</p>
//           <div className="mt-4 flex items-center gap-3">
//              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500"></div>
//              <div>
//                 <p className="text-sm font-bold">Secure Access</p>
//                 <p className="text-xs text-indigo-200">2 Factor ready</p>
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
//           <div className="mb-8 text-center lg:text-left">
//             <motion.h2 variants={itemVariants} className="text-3xl font-bold text-gray-900">Welcome Back</motion.h2>
//             <motion.p variants={itemVariants} className="text-gray-500 mt-1">Sign in to your account to continue.</motion.p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
            
//             {/* Email */}
//             <motion.div variants={itemVariants}>
//               <label className="block text-xs font-semibold text-gray-700 mb-1 ml-1">Email</label>
//               <div className="relative group">
//                 <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={16} />
//                 <input
//                   type="email"
//                   name="useremail"
//                   value={formData.useremail}
//                   onChange={handleChange}
//                   className="w-full pl-9 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm"
//                   placeholder="john@example.com"
//                   required
//                 />
//               </div>
//             </motion.div>

//             {/* Password */}
//             <motion.div variants={itemVariants}>
//               <label className="block text-xs font-semibold text-gray-700 mb-1 ml-1">Password</label>
//               <div className="relative group">
//                 <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" size={16} />
//                 <input
//                   type="password"
//                   name="userpass"
//                   value={formData.userpass}
//                   onChange={handleChange}
//                   className="w-full pl-9 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all text-sm"
//                   placeholder="••••••••"
//                   required
//                 />
//               </div>
//             </motion.div>

//             {/* Submit Button */}
//             <motion.button
//               variants={itemVariants}
//               whileHover={{ scale: 1.01 }}
//               whileTap={{ scale: 0.98 }}
//               type="submit"
//               disabled={loading}
//               className="w-full bg-indigo-600 text-white py-3 rounded-lg font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition duration-300 flex items-center justify-center gap-2 mt-4"
//             >
//               {loading ? (
//                 <>
//                   <Loader2 className="animate-spin" size={18} /> Signing In...
//                 </>
//               ) : (
//                 <>
//                   Sign In <ArrowRight size={18} />
//                 </>
//               )}
//             </motion.button>
//           </form>

//           {/* Footer */}
//           <motion.p variants={itemVariants} className="text-center text-sm text-gray-500 mt-6">
//             Don’t have an account?{" "}
//             <a href="/register" className="text-indigo-600 font-bold hover:text-indigo-800 transition">
//               Create one
//             </a>
//           </motion.p>
//         </motion.div>
//       </div>
//     </div>
//   );
// }





import { useState } from "react";
import { Mail, Lock, ArrowRight, Loader2, Code2 } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function SigninForm() {
  const [formData, setFormData] = useState({ useremail: "", userpass: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`https://infina-coding-platform-3.onrender.com/api/users/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setLoading(false);
      if (res.ok) {
        toast.success("Login successful!");
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        const role = data?.user?.role?.toLowerCase();
        if (role === "admin") {
          localStorage.setItem("isAdmin", "true");
          setTimeout(() => { window.location.href = "/admin/dashboard"; }, 1200);
        } else {
          localStorage.removeItem("isAdmin");
          setTimeout(() => { window.location.href = "/"; }, 1200);
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const itemVariants = {
    hidden: { y: 16, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
  };

  /* ── Decorative floating orbs ── */
  const Orb = ({ style }) => (
    <motion.div
      animate={{ y: [0, -18, 0], scale: [1, 1.06, 1] }}
      transition={{ duration: 7 + Math.random() * 4, repeat: Infinity, ease: "easeInOut" }}
      style={{
        position: "absolute",
        borderRadius: "50%",
        filter: "blur(60px)",
        opacity: 0.18,
        ...style,
      }}
    />
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        overflow: "hidden",
        background: "linear-gradient(135deg, #0f1117 0%, #161b27 50%, #0f1117 100%)",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      }}
    >
      {/* ── LEFT PANEL ── */}
      <div
        className="hidden lg:flex"
        style={{
          width: "42%",
          position: "relative",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "3rem",
          overflow: "hidden",
          background: "linear-gradient(160deg, #1a1f2e 0%, #141824 100%)",
          borderRight: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        {/* Orbs */}
        <Orb style={{ width: 340, height: 340, top: -80, left: -80, background: "#7c3aed" }} />
        <Orb style={{ width: 280, height: 280, bottom: 60, right: -60, background: "#06b6d4" }} />
        <Orb style={{ width: 200, height: 200, top: "45%", left: "30%", background: "#10b981" }} />

        {/* Grid overlay */}
        <div
          style={{
            position: "absolute", inset: 0,
            backgroundImage: "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Brand */}
        <div style={{ position: "relative", zIndex: 10 }}>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "2.5rem" }}
          >
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: "linear-gradient(135deg, #7c3aed, #4f46e5)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Code2 size={20} color="#fff" />
            </div>
            <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", letterSpacing: "-0.02em" }}>
              Infina Coding
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            style={{ fontSize: "2.8rem", fontWeight: 800, color: "#fff", lineHeight: 1.15, letterSpacing: "-0.04em", marginBottom: "1rem" }}
          >
            Welcome<br />
            <span style={{
              background: "linear-gradient(90deg, #7c3aed, #06b6d4)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              Back.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.45 }}
            style={{ color: "rgba(255,255,255,0.45)", fontSize: "1rem", maxWidth: 260, lineHeight: 1.6 }}
          >
            Sign in and keep building. Your challenges await.
          </motion.p>
        </div>

        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          style={{ position: "relative", zIndex: 10, display: "flex", gap: "1rem" }}
        >
          {[
            { label: "Challenges", value: "500+" },
            { label: "Coders", value: "12K" },
            { label: "Languages", value: "10" },
          ].map((s) => (
            <div key={s.label} style={{
              flex: 1, background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 12, padding: "1rem 0.75rem", textAlign: "center",
            }}>
              <div style={{ fontSize: "1.4rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.04em" }}>{s.value}</div>
              <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.35)", marginTop: 2, textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          style={{
            position: "relative", zIndex: 10,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 16, padding: "1.25rem",
          }}
        >
          <div style={{ width: 3, height: 40, background: "linear-gradient(180deg, #7c3aed, #06b6d4)", borderRadius: 2, float: "left", marginRight: "0.875rem" }} />
          <p style={{ fontSize: "0.85rem", color: "rgba(255,255,255,0.55)", fontStyle: "italic", lineHeight: 1.6 }}>
            "The greatest enemy of knowledge is not ignorance, it is the illusion of knowledge."
          </p>
        </motion.div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          position: "relative",
        }}
      >
        {/* Subtle bg orb */}
        <div style={{
          position: "absolute", width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)",
          top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          pointerEvents: "none",
        }} />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ width: "100%", maxWidth: 420, position: "relative", zIndex: 1 }}
        >
          {/* Mobile logo */}
          <motion.div variants={itemVariants} className="flex lg:hidden" style={{ alignItems: "center", gap: "0.5rem", marginBottom: "2rem" }}>
            <div style={{ width: 34, height: 34, borderRadius: 8, background: "linear-gradient(135deg, #7c3aed, #4f46e5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Code2 size={16} color="#fff" />
            </div>
            <span style={{ fontSize: "1rem", fontWeight: 700, color: "#fff" }}>Infina Coding</span>
          </motion.div>

          <motion.div variants={itemVariants} style={{ marginBottom: "2rem" }}>
            <h2 style={{ fontSize: "1.85rem", fontWeight: 800, color: "#fff", letterSpacing: "-0.04em", margin: 0 }}>Sign In</h2>
            <p style={{ color: "rgba(255,255,255,0.4)", marginTop: "0.4rem", fontSize: "0.9rem" }}>
              Enter your credentials to continue
            </p>
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            {/* Email */}
            <motion.div variants={itemVariants}>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: "0.45rem", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                Email Address
              </label>
              <div style={{ position: "relative" }}>
                <Mail size={15} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)" }} />
                <input
                  type="email"
                  name="useremail"
                  value={formData.useremail}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  style={{
                    width: "100%", boxSizing: "border-box",
                    paddingLeft: 42, paddingRight: 16, paddingTop: 13, paddingBottom: 13,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 10, color: "#fff", fontSize: "0.9rem",
                    outline: "none", transition: "border-color 0.2s, background 0.2s",
                  }}
                  onFocus={(e) => { e.target.style.borderColor = "rgba(124,58,237,0.7)"; e.target.style.background = "rgba(124,58,237,0.06)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.background = "rgba(255,255,255,0.05)"; }}
                />
              </div>
            </motion.div>

            {/* Password */}
            <motion.div variants={itemVariants}>
              <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: "0.45rem", textTransform: "uppercase", letterSpacing: "0.07em" }}>
                Password
              </label>
              <div style={{ position: "relative" }}>
                <Lock size={15} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(255,255,255,0.3)" }} />
                <input
                  type="password"
                  name="userpass"
                  value={formData.userpass}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  style={{
                    width: "100%", boxSizing: "border-box",
                    paddingLeft: 42, paddingRight: 16, paddingTop: 13, paddingBottom: 13,
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 10, color: "#fff", fontSize: "0.9rem",
                    outline: "none", transition: "border-color 0.2s, background 0.2s",
                  }}
                  onFocus={(e) => { e.target.style.borderColor = "rgba(124,58,237,0.7)"; e.target.style.background = "rgba(124,58,237,0.06)"; }}
                  onBlur={(e) => { e.target.style.borderColor = "rgba(255,255,255,0.1)"; e.target.style.background = "rgba(255,255,255,0.05)"; }}
                />
              </div>
            </motion.div>

            {/* Submit */}
            <motion.div variants={itemVariants} style={{ paddingTop: "0.25rem" }}>
              <motion.button
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.975 }}
                onClick={handleSubmit}
                disabled={loading}
                style={{
                  width: "100%", padding: "13px 24px",
                  background: loading ? "rgba(124,58,237,0.5)" : "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
                  border: "none", borderRadius: 10,
                  color: "#fff", fontWeight: 700, fontSize: "0.9rem",
                  cursor: loading ? "not-allowed" : "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  letterSpacing: "0.01em",
                  boxShadow: "0 4px 24px rgba(124,58,237,0.35)",
                  transition: "background 0.2s",
                }}
              >
                {loading ? (
                  <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Signing In...</>
                ) : (
                  <>Sign In <ArrowRight size={16} /></>
                )}
              </motion.button>
            </motion.div>
          </div>

          {/* Divider */}
          <motion.div variants={itemVariants} style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "1.5rem 0" }}>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
            <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.25)", textTransform: "uppercase", letterSpacing: "0.08em" }}>or</span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.08)" }} />
          </motion.div>

          <motion.p variants={itemVariants} style={{ textAlign: "center", fontSize: "0.875rem", color: "rgba(255,255,255,0.35)", margin: 0 }}>
            Don't have an account?{" "}
            <a href="/register" style={{ color: "#7c3aed", fontWeight: 700, textDecoration: "none" }}>
              Create one
            </a>
          </motion.p>
        </motion.div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        input::placeholder { color: rgba(255,255,255,0.2); }
      `}</style>
    </div>
  );
}