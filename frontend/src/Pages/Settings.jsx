import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Upload, X, Settings as SettingsIcon, User, Mail, Calendar } from "lucide-react";

const Settings = () => {
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

  // 🧠 Load user data from localStorage (UNCHANGED)
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
  }, []);

  // 🧾 Handle input changes (UNCHANGED)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🖼 Handle profile image (UNCHANGED)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
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

  // 🚀 Handle form submit (UNCHANGED)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.error("User not found!");

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Unauthorized! Please sign in again.");
      navigate("/signin");
      return;
    }

    try {
      setLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append("username", formData.username);
      formDataToSend.append("useremail", formData.useremail);
      formDataToSend.append("userbirthdate", formData.userbirthdate);
      if (formData.userprofile) formDataToSend.append("userprofile", formData.userprofile);

      const res = await fetch(`http://127.0.0.1:3000/api/users/update/${user._id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: formDataToSend,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Update failed");

      toast.success("✅ Profile updated successfully!");
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser(data.user);

      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!user)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <h2 className="text-xl font-bold text-white">Loading Profile...</h2>
          <p className="text-blue-200 mt-2">Getting your settings ready! ⚙️</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4 lg:p-6">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-20 animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-2xl mt-20">
              <SettingsIcon className="text-white" size={32} />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-white mt-20">
              Player Settings
            </h1>
          </div>
          <p className="text-blue-200 text-lg">
            Customize your gaming profile and preferences! 🎮
          </p>
        </div>

        {/* Settings Card */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-600/30 overflow-hidden">
          <div className="p-6 lg:p-8">
            <form onSubmit={handleSubmit} className="space-y-6" encType="multipart/form-data">
              
              {/* Profile Picture Section */}
              <div className="text-center mb-6">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center justify-center gap-2">
                  <User size={20} />
                  Avatar Customization
                </h3>
                
                <div className="flex flex-col items-center">
                  {preview ? (
                    <div className="relative group">
                      <img
                        src={preview}
                        alt="Profile Preview"
                        className="w-32 h-32 rounded-full object-cover border-4 border-yellow-400 shadow-2xl transform group-hover:scale-110 transition-all duration-300"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600 transition-all duration-300 transform hover:scale-110 shadow-lg"
                      >
                        <X size={16} />
                      </button>
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 rounded-full"></div>
                    </div>
                  ) : (
                    <label className="group cursor-pointer">
                      <div className="w-32 h-32 flex flex-col items-center justify-center border-2 border-dashed border-blue-400 rounded-full bg-blue-500/10 hover:bg-blue-500/20 transition-all duration-300 transform hover:scale-105">
                        <Upload className="text-blue-300 group-hover:text-blue-200" size={30} />
                        <span className="text-xs text-blue-300 mt-2 font-semibold">Upload Avatar</span>
                      </div>
                      <input type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                    </label>
                  )}
                </div>
              </div>

              {/* Username Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
                  <User size={16} />
                  Player Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
                    placeholder="Enter your gaming username"
                    required
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 rounded-xl"></div>
                </div>
              </div>

              {/* Email Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
                  <Mail size={16} />
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="useremail"
                    value={formData.useremail}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>

              {/* Birthdate Field */}
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium text-white mb-2">
                  <Calendar size={16} />
                  Birthdate
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="userbirthdate"
                    value={formData.userbirthdate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-700/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-300"
                    required
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => navigate("/")}
                  className="flex-1 py-3 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 border border-gray-500"
                >
                  ← Back to Dashboard
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg relative overflow-hidden group"
                >
                  {/* Animated background effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        💾 Save Changes
                      </>
                    )}
                  </span>
                </button>
              </div>
            </form>
          </div>

          {/* Stats Footer */}
          <div className="bg-gray-700/30 border-t border-gray-600/30 p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-white font-bold text-sm">Account Status</div>
                <div className="text-green-400 text-xs">Active 🟢</div>
              </div>
              <div>
                <div className="text-white font-bold text-sm">Profile Level</div>
                <div className="text-yellow-400 text-xs">Complete {formData.username && formData.useremail && formData.userbirthdate ? '100%' : 'Incomplete'}</div>
              </div>
              <div>
                <div className="text-white font-bold text-sm">Last Updated</div>
                <div className="text-blue-400 text-xs">Just now</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            💡 Pro tip: A unique avatar helps you stand out in the leaderboards!
          </p>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(180deg); }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Settings;