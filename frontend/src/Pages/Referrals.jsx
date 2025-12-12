import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Copy, Users, Gift, Share2, Award } from "lucide-react";

function Referrals() {
  const [user, setUser] = useState(null);
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copying, setCopying] = useState(false);

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
        const res = await fetch("https://infina-coding-platform-3.onrender.com/api/users/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
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
      toast.success("Referral link copied to clipboard!");
      setTimeout(() => setCopying(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      toast.error("Failed to copy link");
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
        toast.success("Referral shared successfully!");
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      copyToClipboard();
    }
  };

  if (loading) return <LoadingSpinner />;

  const totalReferrals = referrals.length;
  const activeReferrals = referrals.filter(r => r.status === 'active').length;
  const totalPoints = referrals.reduce((sum, ref) => sum + ref.points, 0);
  const pendingReferrals = referrals.filter(r => r.status === 'pending').length;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Refer & Earn
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Invite friends and earn rewards together
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <StatCard
            title="Total Referrals"
            value={totalReferrals}
            icon={<Users className="w-5 h-5" />}
            color="blue"
          />
          <StatCard
            title="Active Friends"
            value={activeReferrals}
            icon={<Users className="w-5 h-5" />}
            color="green"
          />
          <StatCard
            title="Points Earned"
            value={totalPoints}
            icon={<Award className="w-5 h-5" />}
            color="yellow"
          />
          <StatCard
            title="Pending"
            value={pendingReferrals}
            icon={<Users className="w-5 h-5" />}
            color="purple"
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Referral Link Card */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Share2 className="text-blue-500" size={20} />
              Your Referral Link
            </h2>
            
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center gap-3">
                  <code className="text-gray-700 dark:text-gray-300 text-sm font-mono flex-1 break-all">
                    {referralLink}
                  </code>
                  <button
                    onClick={copyToClipboard}
                    disabled={copying}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 p-2 rounded-lg transition-colors"
                  >
                    <Copy size={16} />
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={copyToClipboard}
                  disabled={copying}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  {copying ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      Copy Link
                    </>
                  )}
                </button>
                
                <button
                  onClick={shareReferral}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
                >
                  <Share2 size={16} />
                  Share
                </button>
              </div>
            </div>
          </div>

          {/* Rewards Card */}
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-5">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Gift className="text-purple-500" size={20} />
              Your Rewards
            </h2>
            
            <div className="space-y-3">
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
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 mb-6">
          <div className="p-5 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Users className="text-blue-500" size={20} />
              Your Referred Friends
            </h2>
          </div>
          
          {referrals.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Friends Referred Yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Share your referral link to start earning rewards</p>
              <button 
                onClick={copyToClipboard}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
              >
                Copy Referral Link
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {referrals.map((referral) => (
                <ReferralRow key={referral.id} referral={referral} />
              ))}
            </div>
          )}
        </div>

        {/* Tips Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <TipCard
            title="Share on Social Media"
            description="Post your referral link on social platforms to reach more friends."
          />
          <TipCard
            title="Send to Coding Friends"
            description="Your coding buddies will love the challenges and rewards."
          />
          <TipCard
            title="Track Your Progress"
            description="Monitor your referrals and claim rewards as friends join."
          />
        </div>
      </div>
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Loading Referrals</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Please wait...</p>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  const colorClasses = {
    blue: "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800",
    green: "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-800",
    yellow: "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800",
    purple: "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-200 dark:border-purple-800",
  };

  return (
    <div className={`rounded-lg p-4 border ${colorClasses[color]}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">{title}</p>
          <p className="text-xl font-bold mt-1">{value}</p>
        </div>
        <div className="text-gray-500">
          {icon}
        </div>
      </div>
    </div>
  );
}

function RewardTier({ level, reward, status }) {
  const getStatusStyle = () => {
    switch (status) {
      case 'claimed': 
        return "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-200 dark:border-green-700";
      case 'unlocked': 
        return "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-700";
      default: 
        return "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700";
    }
  };

  return (
    <div className={`rounded-lg p-3 border ${getStatusStyle()}`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium">{level}</div>
          <div className="text-sm opacity-90">{reward}</div>
        </div>
        <div className="text-sm font-medium">
          {status === 'claimed' ? '✓' : status === 'unlocked' ? '→' : '○'}
        </div>
      </div>
    </div>
  );
}

function ReferralRow({ referral }) {
  const getStatusBadge = () => {
    switch (referral.status) {
      case 'active':
        return <span className="bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400 text-xs font-medium px-2 py-1 rounded">Active</span>;
      case 'pending':
        return <span className="bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 text-xs font-medium px-2 py-1 rounded">Pending</span>;
      default:
        return <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs font-medium px-2 py-1 rounded">Inactive</span>;
    }
  };

  return (
    <div className="p-4 hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-medium">
            {referral.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">
              {referral.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Joined {new Date(referral.joined).toLocaleDateString()}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="font-bold text-gray-900 dark:text-white">+{referral.points} XP</div>
            {getStatusBadge()}
          </div>
          <Award className="text-blue-500" size={18} />
        </div>
      </div>
    </div>
  );
}

function TipCard({ title, description }) {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
      <h3 className="font-medium text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
}

export default Referrals;