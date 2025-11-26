import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Copy, Users, Gift, Share2, Award, TrendingUp } from "lucide-react";

function Referrals() {
  const [user, setUser] = useState(null);
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copying, setCopying] = useState(false);

  // Generate referral code from user ID or username
  const referralCode = user ? 
    (user._id ? user._id.slice(-8).toUpperCase() : user.username?.slice(0, 8).toUpperCase()) : 
    "LOADING";

  const referralLink = `https://infinacode.com/signup?ref=${referralCode}`;

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Please sign in to access referrals");
        return;
      }

      try {
        // Fetch user data
        const res = await fetch("https://infina-coding-platform-3.onrender.com/api/users/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
          
          // In a real app, you'd fetch actual referral data
          // For now, we'll simulate some referral data
          simulateReferralData();
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Failed to load referral data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const simulateReferralData = () => {
    // Simulated referral data
    const simulatedReferrals = [
      { id: 1, name: "Alex Johnson", joined: "2024-01-15", status: "active", points: 50 },
      { id: 2, name: "Sarah Miller", joined: "2024-01-10", status: "active", points: 75 },
      { id: 3, name: "Mike Chen", joined: "2024-01-08", status: "pending", points: 0 },
      { id: 4, name: "Emily Davis", joined: "2024-01-05", status: "active", points: 100 },
    ];
    setReferrals(simulatedReferrals);
  };

  const copyToClipboard = async () => {
    try {
      setCopying(true);
      await navigator.clipboard.writeText(referralLink);
      toast.success("🎉 Referral link copied to clipboard!");
      
      // Reset copying state after a short delay
      setTimeout(() => setCopying(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      toast.error("❌ Failed to copy link");
      setCopying(false);
    }
  };

  const shareReferral = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Join me on Infina Code!',
          text: 'Learn coding and earn rewards with me on Infina Code!',
          url: referralLink,
        });
        toast.success("🚀 Referral shared successfully!");
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      copyToClipboard();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <h2 className="text-xl font-bold text-white">Loading Referral Program...</h2>
          <p className="text-blue-200 mt-2">Preparing your rewards! 🎁</p>
        </div>
      </div>
    );
  }

  const totalReferrals = referrals.length;
  const activeReferrals = referrals.filter(r => r.status === 'active').length;
  const totalPoints = referrals.reduce((sum, ref) => sum + ref.points, 0);
  const pendingReferrals = referrals.filter(r => r.status === 'pending').length;

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

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-white mb-3 mt-20">
            🤝 Refer & Earn Rewards
          </h1>
          <p className="text-blue-200 text-lg">
            Invite friends and earn amazing rewards together! 🚀
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Referrals"
            value={totalReferrals}
            subtitle="Friends Joined"
            emoji="👥"
            color="from-blue-500 to-cyan-600"
          />
          <StatCard
            title="Active Friends"
            value={activeReferrals}
            subtitle="Learning Together"
            emoji="✅"
            color="from-green-500 to-emerald-600"
          />
          <StatCard
            title="Points Earned"
            value={totalPoints}
            subtitle="Reward Points"
            emoji="💰"
            color="from-yellow-500 to-orange-600"
          />
          <StatCard
            title="Pending"
            value={pendingReferrals}
            subtitle="Awaiting Join"
            emoji="⏳"
            color="from-purple-500 to-pink-600"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Referral Link Card */}
          <div className="lg:col-span-2 bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/30">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Share2 className="text-yellow-400" size={28} />
              Your Referral Link
            </h2>
            
            <div className="space-y-4">
              <div className="bg-gray-700/50 rounded-xl p-4 border border-gray-600">
                <div className="flex items-center justify-between">
                  <code className="text-blue-300 text-sm lg:text-base font-mono break-all">
                    {referralLink}
                  </code>
                  <button
                    onClick={copyToClipboard}
                    disabled={copying}
                    className="ml-4 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-all duration-300 transform hover:scale-110 flex-shrink-0"
                  >
                    <Copy size={18} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={copyToClipboard}
                  disabled={copying}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  {copying ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy size={18} />
                      Copy Link
                    </>
                  )}
                </button>
                
                <button
                  onClick={shareReferral}
                  className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-4 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Share2 size={18} />
                  Share
                </button>
              </div>
            </div>
          </div>

          {/* Rewards Card */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/30">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
              <Gift className="text-purple-400" size={28} />
              Your Rewards
            </h2>
            
            <div className="space-y-4">
              <RewardTier
                level="1 Friend"
                reward="100 XP Points"
                status={totalReferrals >= 1 ? "claimed" : "locked"}
              />
              <RewardTier
                level="3 Friends"
                reward="Premium Badge + 300 XP"
                status={totalReferrals >= 3 ? "claimed" : totalReferrals >= 1 ? "unlocked" : "locked"}
              />
              <RewardTier
                level="5 Friends"
                reward="Exclusive Avatar + 500 XP"
                status={totalReferrals >= 5 ? "claimed" : totalReferrals >= 3 ? "unlocked" : "locked"}
              />
              <RewardTier
                level="10 Friends"
                reward="Mentor Status + 1000 XP"
                status={totalReferrals >= 10 ? "claimed" : totalReferrals >= 5 ? "unlocked" : "locked"}
              />
            </div>
          </div>
        </div>

        {/* Referral List */}
        <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-600/30 overflow-hidden">
          <div className="p-6 border-b border-gray-600/30">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <Users className="text-blue-400" size={28} />
              Your Referred Friends
            </h2>
          </div>
          
          {referrals.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-2xl font-bold text-white mb-2">No Friends Referred Yet</h3>
              <p className="text-gray-400 mb-6">Share your referral link to start earning rewards!</p>
              <button 
                onClick={copyToClipboard}
                className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Copy Referral Link
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-600/30">
              {referrals.map((referral) => (
                <ReferralRow key={referral.id} referral={referral} />
              ))}
            </div>
          )}
        </div>

        {/* Tips Section */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TipCard
            icon="📱"
            title="Share on Social Media"
            description="Post your referral link on Twitter, LinkedIn, or Facebook to reach more friends."
          />
          <TipCard
            icon="👨‍💻"
            title="Send to Coding Friends"
            description="Your coding buddies will love the challenges and rewards on Infina Code!"
          />
          <TipCard
            icon="🎯"
            title="Track Your Progress"
            description="Monitor your referrals and claim rewards as your friends join and learn."
          />
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
}

// 🎮 Stat Card Component
function StatCard({ title, value, subtitle, emoji, color }) {
  return (
    <div
      className={`bg-gradient-to-br ${color} rounded-xl p-4 shadow-lg transform hover:scale-105 transition-all duration-300 group relative overflow-hidden`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
      
      <div className="relative z-10 flex justify-between items-start">
        <div className="flex-1">
          <p className="text-xs text-white/80 font-semibold mb-1">{title}</p>
          <h2 className="text-2xl font-bold mb-1 text-white">{value}</h2>
          <p className="text-xs text-white/90">{subtitle}</p>
        </div>
        <span className="text-2xl transform group-hover:scale-110 transition-transform duration-300">
          {emoji}
        </span>
      </div>
    </div>
  );
}

// 🎁 Reward Tier Component
function RewardTier({ level, reward, status }) {
  const getStatusColor = () => {
    switch (status) {
      case 'claimed': return 'from-green-500 to-emerald-600';
      case 'unlocked': return 'from-yellow-500 to-orange-500';
      default: return 'from-gray-600 to-gray-700';
    }
  };

  const getStatusIcon = () => {
    switch (status) {
      case 'claimed': return '✅';
      case 'unlocked': return '🎯';
      default: return '🔒';
    }
  };

  return (
    <div className={`bg-gradient-to-r ${getStatusColor()} rounded-xl p-4 text-white transform hover:scale-105 transition-all duration-300`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="font-bold text-sm">{level}</div>
          <div className="text-xs opacity-90">{reward}</div>
        </div>
        <div className="text-xl">
          {getStatusIcon()}
        </div>
      </div>
    </div>
  );
}

// 👥 Referral Row Component
function ReferralRow({ referral }) {
  const getStatusBadge = () => {
    switch (referral.status) {
      case 'active':
        return <span className="bg-green-500/20 text-green-300 px-2 py-1 rounded-full text-xs font-bold">Active</span>;
      case 'pending':
        return <span className="bg-yellow-500/20 text-yellow-300 px-2 py-1 rounded-full text-xs font-bold">Pending</span>;
      default:
        return <span className="bg-gray-500/20 text-gray-300 px-2 py-1 rounded-full text-xs font-bold">Inactive</span>;
    }
  };

  return (
    <div className="p-4 hover:bg-gray-700/30 transition-all duration-300 group">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
            {referral.name.charAt(0)}
          </div>
          <div>
            <h3 className="text-white font-semibold group-hover:text-yellow-300 transition-colors">
              {referral.name}
            </h3>
            <p className="text-gray-400 text-sm">Joined {new Date(referral.joined).toLocaleDateString()}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-yellow-400 font-bold text-lg">+{referral.points} XP</div>
            {getStatusBadge()}
          </div>
          <Award className="text-blue-400 group-hover:scale-110 transition-transform duration-300" size={20} />
        </div>
      </div>
    </div>
  );
}

// 💡 Tip Card Component
function TipCard({ icon, title, description }) {
  return (
    <div className="bg-gray-800/30 backdrop-blur-sm rounded-xl p-4 border border-gray-600/30 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105 group">
      <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-white font-bold mb-2 group-hover:text-yellow-300 transition-colors">
        {title}
      </h3>
      <p className="text-gray-400 text-sm">
        {description}
      </p>
    </div>
  );
}

export default Referrals;