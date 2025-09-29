import React, { useState, useEffect } from "react";
import { Copy, Share2, Users, Gift, TrendingUp, Award, Zap, Mail, MessageCircle, Twitter } from "lucide-react";

const Referrals = () => {
  const [referralCode] = useState("INFINA123");
  const [referrals, setReferrals] = useState([
    { id: 1, name: "Sanket Batwal", email: "sanket@example.com", status: "Joined", reward: 50, date: "2025-04-15", avatar: "👨‍💻" },
    { id: 2, name: "Disha Patel", email: "disha@example.com", status: "Pending", reward: 0, date: "2025-03-18", avatar: "👩‍💼" },
    { id: 3, name: "Vishal Pawar", email: "vishal@example.com", status: "Joined", reward: 50, date: "2024-08-20", avatar: "👨‍🎓" },
    { id: 4, name: "Mayur Borse", email: "mayur@example.com", status: "Joined", reward: 50, date: "2024-01-22", avatar: "👨‍💻" },
  ]);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [showShareOptions, setShowShareOptions] = useState(false);

  // Calculate statistics
  const totalRewards = referrals.reduce((acc, r) => acc + r.reward, 0);
  const joinedCount = referrals.filter(r => r.status === "Joined").length;
  const pendingCount = referrals.filter(r => r.status === "Pending").length;

  useEffect(() => {
    // Load referrals from localStorage if available
    const storedReferrals = JSON.parse(localStorage.getItem("userReferrals")) || [];
    if (storedReferrals.length > 0) {
      setReferrals(storedReferrals);
    }
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert("Failed to copy referral code");
    }
  };

  const shareViaEmail = () => {
    const subject = "Join me on InfiCode!";
    const body = `Hey! Join InfiCode using my referral code: ${referralCode}. You'll get bonus points when you sign up!\n\nSign up here: http://inficode.com/signup`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
    setShowShareOptions(false);
  };

  const shareViaWhatsApp = () => {
    const text = `Hey! Join InfiCode using my referral code: ${referralCode}. You'll get bonus points when you sign up! Sign up here: http://inficode.com/signup`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
    setShowShareOptions(false);
  };

  const shareViaTwitter = () => {
    const text = `Join me on InfiCode! Use my referral code ${referralCode} to get bonus points. Start coding and earning! 🚀`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`);
    setShowShareOptions(false);
  };

  const filteredReferrals = referrals.filter(ref => {
    if (activeTab === "all") return true;
    return ref.status.toLowerCase() === activeTab.toLowerCase();
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Joined": return "bg-green-100 text-green-800 border-green-200";
      case "Pending": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const referralLink = `http://inficode.com/signup?ref=${referralCode}`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 lg:p-6 lg:ml-0 mt-16 lg:mt-0">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 lg:mb-8">
          <div className="mb-4 lg:mb-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-2 rounded-xl">
                <Gift className="text-white" size={28} />
              </div>
              <h1 className="text-2xl lg:text-4xl font-bold text-gray-900">🎁 Refer & Earn</h1>
            </div>
            <p className="text-sm lg:text-lg text-gray-600">Invite friends and earn rewards together!</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4 mb-6 lg:mb-8">
          <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-xs lg:text-sm mb-1">Total Rewards</p>
                <h2 className="text-xl lg:text-2xl font-bold">₹{totalRewards}</h2>
              </div>
              <Award className="text-white opacity-80" size={24} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-200 text-xs lg:text-sm mb-1">Friends Joined</p>
                <h2 className="text-xl lg:text-2xl font-bold">{joinedCount}</h2>
              </div>
              <Users className="text-white opacity-80" size={24} />
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-xs lg:text-sm mb-1">Pending</p>
                <h2 className="text-xl lg:text-2xl font-bold">{pendingCount}</h2>
              </div>
              <TrendingUp className="text-white opacity-80" size={24} />
            </div>
          </div>
        </div>

        {/* Referral Code Section */}
        <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-4 lg:p-6 mb-6 lg:mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-6">
            <div className="flex-1">
              <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
                <Zap size={20} />
                Your Referral Code
              </h3>
              <p className="text-gray-600 text-sm lg:text-base mb-4">
                Share your code with friends. When they join and complete their first challenge, you both get ₹50!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <div className="bg-gray-50 border border-gray-300 rounded-lg p-3 lg:p-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-lg lg:text-xl font-bold text-gray-900">{referralCode}</span>
                      <button
                        onClick={handleCopy}
                        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                          copied 
                            ? "bg-green-500 text-white" 
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        <Copy size={16} />
                        {copied ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Or share this link: <span className="font-mono text-purple-600">{referralLink}</span>
                  </p>
                </div>

                <div className="relative">
                  <button
                    onClick={() => setShowShareOptions(!showShareOptions)}
                    className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-3 rounded-lg hover:shadow-lg transition-all w-full sm:w-auto justify-center"
                  >
                    <Share2 size={18} />
                    Share
                  </button>

                  {/* Share Options Dropdown */}
                  {showShareOptions && (
                    <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-xl z-10 w-48">
                      <button
                        onClick={shareViaEmail}
                        className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100"
                      >
                        <Mail size={16} className="text-gray-600" />
                        <span className="text-sm">Email</span>
                      </button>
                      <button
                        onClick={shareViaWhatsApp}
                        className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100"
                      >
                        <MessageCircle size={16} className="text-green-600" />
                        <span className="text-sm">WhatsApp</span>
                      </button>
                      <button
                        onClick={shareViaTwitter}
                        className="flex items-center gap-3 w-full px-4 py-3 text-left hover:bg-gray-50"
                      >
                        <Twitter size={16} className="text-blue-400" />
                        <span className="text-sm">Twitter</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-4 lg:p-6 mb-6 lg:mb-8">
          <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-4">How It Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl mb-2">1</div>
              <h4 className="font-semibold text-gray-900 mb-2">Share Your Code</h4>
              <p className="text-sm text-gray-600">Send your referral code to friends</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl mb-2">2</div>
              <h4 className="font-semibold text-gray-900 mb-2">They Join</h4>
              <p className="text-sm text-gray-600">Friends sign up using your code</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl mb-2">3</div>
              <h4 className="font-semibold text-gray-900 mb-2">Earn Rewards</h4>
              <p className="text-sm text-gray-600">Get ₹50 when they complete first challenge</p>
            </div>
          </div>
        </div>

        {/* Referral History */}
        <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg overflow-hidden">
          <div className="p-4 lg:p-6 border-b border-gray-200">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 flex items-center gap-2">
                <Users size={24} />
                Referral History
              </h2>
              
              {/* Filter Tabs */}
              <div className="flex bg-gray-100 rounded-lg p-1">
                {["all", "joined", "pending"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1 rounded text-sm transition-all ${
                      activeTab === tab
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {filteredReferrals.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900 mb-2">No referrals yet</h3>
              <p className="text-gray-600 mb-4">Start sharing your referral code to see your friends here!</p>
            </div>
          ) : (
            <>
              {/* Mobile Card View */}
              <div className="p-4 space-y-3 lg:hidden">
                {filteredReferrals.map((ref) => (
                  <div key={ref.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{ref.avatar}</div>
                        <div>
                          <div className="font-medium text-gray-900">{ref.name}</div>
                          <div className="text-xs text-gray-500">{ref.email}</div>
                        </div>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(ref.status)}`}>
                        {ref.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        {new Date(ref.date).toLocaleDateString('en-IN')}
                      </div>
                      <div className="text-lg font-bold text-green-600">
                        ₹{ref.reward}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Friend
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reward
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredReferrals.map((ref) => (
                      <tr key={ref.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="text-xl">{ref.avatar}</div>
                            <div>
                              <div className="font-medium text-gray-900">{ref.name}</div>
                              <div className="text-sm text-gray-500">{ref.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(ref.status)}`}>
                            {ref.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {new Date(ref.date).toLocaleDateString('en-IN', { 
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-lg font-bold text-green-600">
                            ₹{ref.reward}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Referrals;