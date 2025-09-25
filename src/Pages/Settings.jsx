
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(true);
  const [autoSave, setAutoSave] = useState(true);

  useEffect(() => {
    // Load user info from localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
    }
    

    // Load preferences from localStorage
    // const storedDarkMode = localStorage.getItem("darkMode") === "true";
    // const storedNotifications = localStorage.getItem("notifications") !== "false";
    // const storedSoundEffects = localStorage.getItem("soundEffects") !== "false";
    // const storedAutoSave = localStorage.getItem("autoSave") !== "false";

    // setDarkMode(storedDarkMode);
    // setNotifications(storedNotifications);
    // setSoundEffects(storedSoundEffects);
    // setAutoSave(storedAutoSave);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    alert("You have been logged out!");
    navigate("/signin");
  };

  const handleSupport = () => {
    window.open("https://mail.google.com/mail/?view=cm&fs=1&to=mayurborse7440@gmail.com");

  };

  const handleFeedback = () => {
    window.open("https://mail.google.com/mail/?view=cm&fs=1&to=mayurborse7440@gmail.com");
  };

  const handleToggle = (setting, value) => {
    switch (setting) {
      case 'darkMode':
        setDarkMode(value);
        localStorage.setItem("darkMode", value);
        // Apply dark mode to body
        if (value) {
          document.body.classList.add('dark');
        } else {
          document.body.classList.remove('dark');
        }
        break;
      case 'notifications':
        setNotifications(value);
        localStorage.setItem("notifications", value);
        break;
      case 'soundEffects':
        setSoundEffects(value);
        localStorage.setItem("soundEffects", value);
        break;
      case 'autoSave':
        setAutoSave(value);
        localStorage.setItem("autoSave", value);
        break;
      default:
        break;
    }
  };

  const handleClearData = () => {
    if (window.confirm("Are you sure you want to clear all your progress? This action cannot be undone.")) {
      localStorage.removeItem("solvedQuestions");
      localStorage.removeItem("totalPoints");
      localStorage.removeItem("earningsHistory");
      alert("All your progress has been cleared!");
      window.location.reload();
    }
  };

  const handleExportData = () => {
    const userData = {
      user: user,
      points: localStorage.getItem("totalPoints"),
      solvedQuestions: JSON.parse(localStorage.getItem("solvedQuestions") || "[]"),
      earningsHistory: JSON.parse(localStorage.getItem("earningsHistory") || "[]"),
      preferences: {
        darkMode,
        notifications,
        soundEffects,
        autoSave
      }
    };

    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `infinacode-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 lg:p-8 lg:ml-0 mt-16 lg:mt-0">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 lg:mb-8">
          <div className="mb-4 lg:mb-0">
            <h1 className="text-2xl lg:text-4xl font-bold text-gray-900 mb-2">⚙️ Settings</h1>
            <p className="text-sm lg:text-lg text-gray-600">Manage your account preferences and settings</p>
          </div>
          
          {user && (
            <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm shadow-lg px-4 py-2 lg:px-6 lg:py-3 rounded-xl lg:rounded-2xl w-full lg:w-auto">
              <img
                src={
                  user.userprofile && user.userprofile !== "null"
                    ? user.userprofile
                    : `https://ui-avatars.com/api/?name=${user.username}&background=6366f1&color=fff`
                }
                alt={user.username}
                className="w-10 h-10 lg:w-14 lg:h-14 rounded-full border-2 border-indigo-300 shadow-md"
              />
              <div>
                <span className="font-bold text-gray-800 capitalize text-sm lg:text-lg">{user.username}</span>
                <p className="text-xs lg:text-sm text-gray-600">Account Settings</p>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            {/* Account Information */}
            <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 lg:px-6 py-4">
                <h2 className="text-lg lg:text-xl font-semibold text-white flex items-center">
                  <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">👤</span>
                  Account Information
                </h2>
              </div>
              <div className="p-4 lg:p-6">
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 bg-indigo-50 rounded-lg">
                    <span className="text-gray-700 font-medium text-sm lg:text-base">Username</span>
                    <span className="text-indigo-600 font-semibold text-sm lg:text-base capitalize">{user?.username || "N/A"}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 bg-green-50 rounded-lg">
                    <span className="text-gray-700 font-medium text-sm lg:text-base">Email</span>
                    <span className="text-green-600 font-semibold text-sm lg:text-base">{user?.email || "N/A"}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 bg-blue-50 rounded-lg">
                    <span className="text-gray-700 font-medium text-sm lg:text-base">Member Since</span>
                    <span className="text-blue-600 font-semibold text-sm lg:text-base">
                      {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Recent"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-4 lg:px-6 py-4">
                <h2 className="text-lg lg:text-xl font-semibold text-white flex items-center">
                  <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">🎛️</span>
                  Preferences
                </h2>
              </div>
              <div className="p-4 lg:p-6">
                <div className="space-y-4">
                  {[
                    { label: "Dark Mode", value: darkMode, onChange: handleToggle, key: 'darkMode' },
                    { label: "Notifications", value: notifications, onChange: handleToggle, key: 'notifications' },
                    { label: "Sound Effects", value: soundEffects, onChange: handleToggle, key: 'soundEffects' },
                    { label: "Auto Save Progress", value: autoSave, onChange: handleToggle, key: 'autoSave' }
                  ].map((pref) => (
                    <div key={pref.key} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors">
                      <div>
                        <span className="text-gray-800 font-medium text-sm lg:text-base">{pref.label}</span>
                        <p className="text-gray-500 text-xs lg:text-sm mt-1">
                          {pref.key === 'darkMode' && "Switch between light and dark themes"}
                          {pref.key === 'notifications' && "Receive updates and notifications"}
                          {pref.key === 'soundEffects' && "Enable sound effects for interactions"}
                          {pref.key === 'autoSave' && "Automatically save your progress"}
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={pref.value}
                          onChange={(e) => pref.onChange(pref.key, e.target.checked)}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Data Management */}
            <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-amber-600 to-orange-600 px-4 lg:px-6 py-4">
                <h2 className="text-lg lg:text-xl font-semibold text-white flex items-center">
                  <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">💾</span>
                  Data Management
                </h2>
              </div>
              <div className="p-4 lg:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={handleExportData}
                    className="flex items-center justify-center gap-2 p-4 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors border border-blue-200"
                  >
                    <span className="text-lg">📥</span>
                    <div className="text-left">
                      <div className="font-semibold text-sm lg:text-base">Export Data</div>
                      <div className="text-xs text-blue-500">Download your progress</div>
                    </div>
                  </button>
                  <button
                    onClick={handleClearData}
                    className="flex items-center justify-center gap-2 p-4 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors border border-red-200"
                  >
                    <span className="text-lg">🗑️</span>
                    <div className="text-left">
                      <div className="font-semibold text-sm lg:text-base">Clear Data</div>
                      <div className="text-xs text-red-500">Reset all progress</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Actions */}
          <div className="space-y-6 lg:space-y-8">
            {/* Support Card */}
            <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-4 lg:px-6 py-4">
                <h2 className="text-lg lg:text-xl font-semibold text-white flex items-center">
                  <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">💬</span>
                  Support
                </h2>
              </div>
              <div className="p-4 lg:p-6">
                <div className="space-y-4">
                  <button
                    onClick={handleSupport} 
                    className="w-full flex items-center justify-center gap-3 p-3 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors border border-indigo-200"
                  >
                    <span className="text-xl">📧</span>
                    <span className="font-semibold text-sm lg:text-base">Contact Support</span>
                  </button>
                  <button
                    onClick={handleFeedback}
                    className="w-full flex items-center justify-center gap-3 p-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors border border-green-200"
                  >
                    <span className="text-xl">💡</span>
                    <span className="font-semibold text-sm lg:text-base">Send Feedback</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg border border-red-200 overflow-hidden">
              <div className="bg-gradient-to-r from-red-600 to-rose-600 px-4 lg:px-6 py-4">
                <h2 className="text-lg lg:text-xl font-semibold text-white flex items-center">
                  <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">⚠️</span>
                  Danger Zone
                </h2>
              </div>
              <div className="p-4 lg:p-6">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center justify-center gap-3 p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold"
                >
                  <span className="text-xl">🚪</span>
                  <span className="text-sm lg:text-base">Logout</span>
                </button>
                <p className="text-red-500 text-xs mt-3 text-center">
                  This will log you out of your current session
                </p>
              </div>
            </div>

            {/* App Info */}
            <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-600 to-slate-600 px-4 lg:px-6 py-4">
                <h2 className="text-lg lg:text-xl font-semibold text-white flex items-center">
                  <span className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">ℹ️</span>
                  App Info
                </h2>
              </div>
              <div className="p-4 lg:p-6">
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Version</span>
                    <span className="font-semibold">11.2.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Updated</span>
                    <span className="font-semibold">2025</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status</span>
                    <span className="font-semibold text-green-600">Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;