import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Copy, Users, Gift, Share2, Award, Check } from "lucide-react";
import PageTransition, { AnimatedHeader, StaggerGrid, StaggerItem } from "../Components/ui/PageTransition";
import { ReferralsSkeleton } from "../Components/ui/Skeleton";

function Referrals() {
  const [user, setUser] = useState(null);
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copying, setCopying] = useState(false);

  const referralCode = user
    ? user._id
      ? user._id.slice(-8).toUpperCase()
      : user.username?.slice(0, 8).toUpperCase()
    : "LOADING";

  const referralLink = `https://codeon.dev/signup?ref=${referralCode}`;

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
    setReferrals([
      { id: 1, name: "Alex Johnson", joined: "2024-01-15", status: "active", points: 50 },
      { id: 2, name: "Sarah Miller", joined: "2024-01-10", status: "active", points: 75 },
      { id: 3, name: "Mike Chen", joined: "2024-01-08", status: "pending", points: 0 },
      { id: 4, name: "Emily Davis", joined: "2024-01-05", status: "active", points: 100 },
    ]);
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
          title: "Join me on CodeOn!",
          text: "Learn coding and earn rewards with me on CodeOn!",
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

  if (loading) return <ReferralsSkeleton />;

  const totalReferrals = referrals.length;
  const activeReferrals = referrals.filter((r) => r.status === "active").length;
  const totalPoints = referrals.reduce((sum, ref) => sum + ref.points, 0);
  const pendingReferrals = referrals.filter((r) => r.status === "pending").length;

  return (
    <PageTransition className="p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        <AnimatedHeader title="Refer & Earn" subtitle="Invite friends and earn rewards together" />

        <StaggerGrid className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { title: "Total Referrals", value: totalReferrals, icon: Users, gradient: "from-blue-500 to-cyan-500" },
            { title: "Active Friends", value: activeReferrals, icon: Users, gradient: "from-emerald-500 to-teal-500" },
            { title: "Points Earned", value: totalPoints, icon: Award, gradient: "from-amber-500 to-orange-500" },
            { title: "Pending", value: pendingReferrals, icon: Users, gradient: "from-purple-500 to-violet-500" },
          ].map((stat) => (
            <StaggerItem key={stat.title}>
              <motion.div
                whileHover={{ y: -3 }}
                className="rounded-2xl p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-white/60 dark:border-gray-700/60"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
                    <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
                  </div>
                  <div className={`p-2 rounded-xl bg-gradient-to-br ${stat.gradient} text-white`}>
                    <stat.icon size={18} />
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGrid>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/60 dark:border-gray-700/60 p-5"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Share2 className="text-indigo-500" size={20} /> Your Referral Link
            </h2>

            <div className="space-y-4">
              <div className="bg-gray-50/80 dark:bg-gray-900/50 rounded-xl p-3 border border-gray-200/60 dark:border-gray-700/60">
                <div className="flex items-center gap-3">
                  <code className="text-gray-700 dark:text-gray-300 text-sm font-mono flex-1 break-all">{referralLink}</code>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={copyToClipboard}
                    disabled={copying}
                    className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 p-2 rounded-lg transition-colors"
                  >
                    {copying ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
                  </motion.button>
                </div>
              </div>

              <div className="flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={copyToClipboard}
                  disabled={copying}
                  className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white py-2.5 px-4 rounded-xl font-medium shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2"
                >
                  {copying ? (
                    <><Check size={16} /> Copied!</>
                  ) : (
                    <><Copy size={16} /> Copy Link</>
                  )}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={shareReferral}
                  className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white py-2.5 px-4 rounded-xl font-medium shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2"
                >
                  <Share2 size={16} /> Share
                </motion.button>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/60 dark:border-gray-700/60 p-5"
          >
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Gift className="text-purple-500" size={20} /> Your Rewards
            </h2>
            <div className="space-y-3">
              <RewardTier level="1 Friend" reward="100 XP Points" status={totalReferrals >= 1 ? "claimed" : "locked"} />
              <RewardTier level="3 Friends" reward="Premium Badge + 300 XP" status={totalReferrals >= 3 ? "claimed" : totalReferrals >= 1 ? "unlocked" : "locked"} />
              <RewardTier level="5 Friends" reward="Exclusive Avatar + 500 XP" status={totalReferrals >= 5 ? "claimed" : totalReferrals >= 3 ? "unlocked" : "locked"} />
              <RewardTier level="10 Friends" reward="Mentor Status + 1000 XP" status={totalReferrals >= 10 ? "claimed" : totalReferrals >= 5 ? "unlocked" : "locked"} />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl border border-white/60 dark:border-gray-700/60 mb-6 overflow-hidden"
        >
          <div className="p-5 border-b border-gray-200/60 dark:border-gray-700/60">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Users className="text-indigo-500" size={20} /> Your Referred Friends
            </h2>
          </div>

          {referrals.length === 0 ? (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No Friends Referred Yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">Share your referral link to start earning rewards</p>
              <motion.button
                whileHover={{ scale: 1.03 }}
                onClick={copyToClipboard}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium py-2 px-6 rounded-xl shadow-lg shadow-indigo-500/25"
              >
                Copy Referral Link
              </motion.button>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-gray-700/50">
              {referrals.map((referral, index) => (
                <ReferralRow key={referral.id} referral={referral} index={index} />
              ))}
            </div>
          )}
        </motion.div>

        <StaggerGrid className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "Share on Social Media", description: "Post your referral link on social platforms to reach more friends." },
            { title: "Send to Coding Friends", description: "Your coding buddies will love the challenges and rewards." },
            { title: "Track Your Progress", description: "Monitor your referrals and claim rewards as friends join." },
          ].map((tip) => (
            <StaggerItem key={tip.title}>
              <motion.div
                whileHover={{ y: -3 }}
                className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-4 border border-gray-200/60 dark:border-gray-700/60"
              >
                <h3 className="font-medium text-gray-900 dark:text-white mb-2">{tip.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{tip.description}</p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGrid>
      </div>
    </PageTransition>
  );
}

function RewardTier({ level, reward, status }) {
  const styles = {
    claimed: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-700/50",
    unlocked: "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-200 dark:border-amber-700/50",
    locked: "bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700/50",
  };

  return (
    <motion.div whileHover={{ x: 4 }} className={`rounded-xl p-3 border ${styles[status]}`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="font-medium">{level}</div>
          <div className="text-sm opacity-90">{reward}</div>
        </div>
        <div className="text-sm font-medium">{status === "claimed" ? "✓" : status === "unlocked" ? "→" : "○"}</div>
      </div>
    </motion.div>
  );
}

function ReferralRow({ referral, index }) {
  const getStatusBadge = () => {
    switch (referral.status) {
      case "active":
        return <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 text-xs font-medium px-2 py-1 rounded-lg">Active</span>;
      case "pending":
        return <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 text-xs font-medium px-2 py-1 rounded-lg">Pending</span>;
      default:
        return <span className="bg-gray-100 dark:bg-gray-800 text-gray-600 text-xs font-medium px-2 py-1 rounded-lg">Inactive</span>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ backgroundColor: "rgba(99, 102, 241, 0.03)" }}
      className="p-4 transition-colors"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium shadow-md">
            {referral.name.charAt(0)}
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-white">{referral.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Joined {new Date(referral.joined).toLocaleDateString()}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="font-bold text-indigo-600 dark:text-indigo-400">+{referral.points} XP</div>
            {getStatusBadge()}
          </div>
          <Award className="text-indigo-500" size={18} />
        </div>
      </div>
    </motion.div>
  );
}

export default Referrals;
