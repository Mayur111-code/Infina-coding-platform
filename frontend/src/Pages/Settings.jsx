import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Upload, X, Settings as SettingsIcon, User, Mail, Calendar, Save, Loader2 } from "lucide-react";
import PageTransition, { AnimatedHeader } from "../Components/ui/PageTransition";
import { SettingsSkeleton } from "../Components/ui/Skeleton";

export default function Settings() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [preview, setPreview] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    useremail: "",
    userbirthdate: "",
    userprofile: null,
  });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setFormData({
        username: parsed.username || "",
        useremail: parsed.useremail || "",
        userbirthdate: parsed.userbirthdate ? parsed.userbirthdate.split("T")[0] : "",
        userprofile: null,
      });
      setPreview(parsed.userprofile || null);
    }
    setInitialLoading(false);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      setFormData({ ...formData, userprofile: file });
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, userprofile: null });
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("User not found!");

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please sign in again");
      navigate("/signin");
      return;
    }

    try {
      setLoading(true);

      const formDataToSend = new FormData();
      formDataToSend.append("username", formData.username.trim());
      formDataToSend.append("useremail", formData.useremail.trim());
      formDataToSend.append("userbirthdate", formData.userbirthdate);
      if (formData.userprofile) {
        formDataToSend.append("userprofile", formData.userprofile);
      }

      const res = await fetch(
        `https://infina-coding-platform-3.onrender.com/api/users/update/${user.id}`,
        {
          method: "PUT",
          headers: { Authorization: `Bearer ${token}` },
          body: formDataToSend,
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");

      toast.success("Profile updated successfully!");
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading || !user) return <SettingsSkeleton />;

  const profileComplete = formData.username && formData.useremail && formData.userbirthdate;

  return (
    <PageTransition className="p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        <AnimatedHeader
          title={
            <span className="flex items-center gap-3">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2.5 rounded-xl">
                <SettingsIcon className="text-indigo-600 dark:text-indigo-400" size={22} />
              </div>
              Profile Settings
            </span>
          }
          subtitle="Update your profile information"
        />

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/60 dark:border-gray-700/60 shadow-sm overflow-hidden"
        >
          <div className="p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center justify-center gap-2">
                  <User size={18} /> Profile Picture
                </h3>

                <div className="flex flex-col items-center">
                  {preview ? (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="relative"
                    >
                      <img
                        src={preview}
                        alt="Profile Preview"
                        className="w-24 h-24 rounded-full object-cover border-4 border-indigo-200 dark:border-indigo-800 shadow-lg ring-4 ring-indigo-500/10"
                      />
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        type="button"
                        onClick={removeImage}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 shadow-md"
                        aria-label="Remove image"
                      >
                        <X size={14} />
                      </motion.button>
                    </motion.div>
                  ) : (
                    <label className="group cursor-pointer">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-indigo-300 dark:border-indigo-700 rounded-full bg-indigo-50/50 dark:bg-indigo-950/30 hover:bg-indigo-100/50 dark:hover:bg-indigo-900/30 transition-colors"
                      >
                        <Upload className="text-indigo-400 group-hover:text-indigo-500" size={24} />
                        <span className="text-xs text-indigo-500 dark:text-indigo-400 mt-2">Upload Photo</span>
                      </motion.div>
                      <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} aria-label="Upload profile picture" />
                    </label>
                  )}
                </div>
              </div>

              {[
                { name: "username", label: "Username", icon: User, type: "text", placeholder: "Enter your username" },
                { name: "useremail", label: "Email Address", icon: Mail, type: "email", placeholder: "Enter your email" },
                { name: "userbirthdate", label: "Birthdate", icon: Calendar, type: "date", placeholder: "" },
              ].map((field, index) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="space-y-2"
                >
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <field.icon size={14} /> {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-gray-50/80 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none transition-all"
                    placeholder={field.placeholder}
                    required
                  />
                </motion.div>
              ))}

              <div className="flex gap-3 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={() => navigate("/")}
                  className="flex-1 py-2.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors border border-gray-200 dark:border-gray-600"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading || !profileComplete}
                  className="flex-1 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-medium shadow-lg shadow-indigo-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <><Loader2 size={16} className="animate-spin" /> Saving...</>
                  ) : (
                    <><Save size={16} /> Save Changes</>
                  )}
                </motion.button>
              </div>
            </form>
          </div>

          <div className="bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-950/20 dark:to-purple-950/20 border-t border-gray-200/60 dark:border-gray-700/60 p-4">
            <div className="flex justify-between items-center text-sm">
              <div>
                <div className="text-gray-500 dark:text-gray-400">Profile Status</div>
                <div className={`font-medium ${profileComplete ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}>
                  {profileComplete ? "Complete" : "Incomplete"}
                </div>
              </div>
              <div className="text-right">
                <div className="text-gray-500 dark:text-gray-400">Last Updated</div>
                <div className="font-medium text-gray-900 dark:text-white">Now</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </PageTransition>
  );
}
