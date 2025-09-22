import React, { useState, useEffect } from "react";
import { Gift, Star, Filter, TrendingUp, Zap, Crown, ShoppingBag } from "lucide-react";

function Marketplace() {
  const [subscriptions, setSubscriptions] = useState([
    {
      id: 1,
      title: "Netflix Premium",
      description: "4K Ultra HD streaming on 4 devices simultaneously",
      originalPrice: 649,
      discountPrice: 519,
      pointsRequired: 2076,
      validity: "1 Month",
      category: "entertainment",
      icon: "🎬",
      bgColor: "bg-gradient-to-br from-red-500 to-pink-600",
      popular: true,
      rating: 4.8
    },
    {
      id: 2,
      title: "Zomato Pro",
      description: "Free delivery & exclusive discounts on food orders",
      originalPrice: 299,
      discountPrice: 149,
      pointsRequired: 596,
      validity: "3 Months",
      category: "food",
      icon: "🍕",
      bgColor: "bg-gradient-to-br from-orange-500 to-amber-600",
      popular: false,
      rating: 4.5
    },
    {
      id: 3,
      title: "Amazon Prime",
      description: "Free delivery, Prime Video, Music & more",
      originalPrice: 1499,
      discountPrice: 899,
      pointsRequired: 3596,
      validity: "1 Year",
      category: "shopping",
      icon: "📦",
      bgColor: "bg-gradient-to-br from-blue-500 to-cyan-600",
      popular: true,
      rating: 4.9
    },
    {
      id: 4,
      title: "Spotify Premium",
      description: "Ad-free music, offline downloads, high quality audio",
      originalPrice: 119,
      discountPrice: 59,
      pointsRequired: 236,
      validity: "1 Month",
      category: "music",
      icon: "🎵",
      bgColor: "bg-gradient-to-br from-green-500 to-emerald-600",
      popular: false,
      rating: 4.7
    },
    {
      id: 5,
      title: "YouTube Premium",
      description: "Ad-free videos, background play, YouTube Music",
      originalPrice: 129,
      discountPrice: 79,
      pointsRequired: 316,
      validity: "1 Month",
      category: "video",
      icon: "📺",
      bgColor: "bg-gradient-to-br from-gray-600 to-gray-700",
      popular: true,
      rating: 4.6
    },
    {
      id: 6,
      title: "Swiggy One",
      description: "Unlimited free delivery & extra discounts",
      originalPrice: 399,
      discountPrice: 299,
      pointsRequired: 1196,
      validity: "3 Months",
      category: "food",
      icon: "🍔",
      bgColor: "bg-gradient-to-br from-yellow-500 to-orange-500",
      popular: false,
      rating: 4.4
    },
    {
      id: 7,
      title: "Disney+ Hotstar",
      description: "Live sports, movies, TV shows & originals",
      originalPrice: 499,
      discountPrice: 399,
      pointsRequired: 1596,
      validity: "1 Year",
      category: "entertainment",
      icon: "🌟",
      bgColor: "bg-gradient-to-br from-purple-500 to-pink-600",
      popular: true,
      rating: 4.8
    },
    {
      id: 8,
      title: "New York Times",
      description: "Digital subscription with full access",
      originalPrice: 799,
      discountPrice: 499,
      pointsRequired: 1996,
      validity: "6 Months",
      category: "news",
      icon: "📰",
      bgColor: "bg-gradient-to-br from-indigo-500 to-blue-600",
      popular: false,
      rating: 4.3
    }
  ]);

  const [userPoints, setUserPoints] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("points");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Load user points from localStorage
    const storedPoints = parseInt(localStorage.getItem("totalPoints")) || 0;
    setUserPoints(storedPoints);
  }, []);

  const categories = [
    { id: "all", name: "All Categories", icon: "📱", color: "from-gray-500 to-gray-700" },
    { id: "entertainment", name: "Entertainment", icon: "🎬", color: "from-purple-500 to-pink-600" },
    { id: "food", name: "Food Delivery", icon: "🍕", color: "from-orange-500 to-red-600" },
    { id: "shopping", name: "Shopping", icon: "🛒", color: "from-blue-500 to-cyan-600" },
    { id: "music", name: "Music", icon: "🎵", color: "from-green-500 to-emerald-600" },
    { id: "video", name: "Video", icon: "📺", color: "from-red-500 to-pink-600" },
    { id: "news", name: "News", icon: "📰", color: "from-indigo-500 to-blue-600" }
  ];

  const filteredSubscriptions = subscriptions
    .filter(sub => selectedCategory === "all" || sub.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === "points") return a.pointsRequired - b.pointsRequired;
      if (sortBy === "price") return a.discountPrice - b.discountPrice;
      if (sortBy === "popular") return b.popular - a.popular;
      if (sortBy === "rating") return b.rating - a.rating;
      return 0;
    });

  const handleRedeem = (subscription) => {
    if (userPoints >= subscription.pointsRequired) {
      const newPoints = userPoints - subscription.pointsRequired;
      setUserPoints(newPoints);
      localStorage.setItem("totalPoints", newPoints.toString());
      
      // Add to redemption history
      const redemptionHistory = JSON.parse(localStorage.getItem("redemptionHistory")) || [];
      const newRedemption = {
        id: Date.now(),
        subscription: subscription.title,
        pointsUsed: subscription.pointsRequired,
        date: new Date().toISOString().split('T')[0],
        status: "Active"
      };
      localStorage.setItem("redemptionHistory", JSON.stringify([...redemptionHistory, newRedemption]));
      
      alert(`🎉 Successfully redeemed ${subscription.title}! Check your email for activation details.`);
    } else {
      alert(`❌ Oops! You need ${subscription.pointsRequired - userPoints} more points to redeem this.`);
    }
  };

  const getCategoryColor = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.color : "from-gray-500 to-gray-700";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 lg:p-6 lg:ml-0 mt-16 lg:mt-0">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 lg:mb-8">
          <div className="mb-4 lg:mb-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-2 rounded-xl">
                <Gift className="text-white" size={28} />
              </div>
              <h1 className="text-2xl lg:text-4xl font-bold text-gray-900">🎁 Rewards Marketplace</h1>
            </div>
            <p className="text-sm lg:text-lg text-gray-600">Redeem your points for premium subscriptions</p>
          </div>

          {/* Mobile Filter Toggle */}
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center gap-2 bg-white border border-gray-300 px-4 py-2 rounded-lg mb-4"
          >
            <Filter size={18} />
            Filters
          </button>
        </div>

        {/* User Points Card */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-white shadow-xl mb-6 lg:mb-8">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-purple-200 text-sm lg:text-base">Available Balance</p>
              <h2 className="text-2xl lg:text-3xl font-bold">{userPoints.toLocaleString()} Points</h2>
              <p className="text-purple-200 text-xs lg:text-sm mt-1">≈ ₹{(userPoints * 0.25).toLocaleString()}</p>
            </div>
            <div className="text-2xl lg:text-4xl bg-white/20 p-2 lg:p-3 rounded-full">💰</div>
          </div>
        </div>

        {/* Filters Section */}
        <div className={`bg-white rounded-xl lg:rounded-2xl shadow-lg p-4 lg:p-6 mb-6 lg:mb-8 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-6">
            <div className="w-full">
              <h3 className="font-semibold text-gray-900 mb-3 text-sm lg:text-base flex items-center gap-2">
                <Filter size={18} />
                Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs lg:text-sm transition-all ${
                      selectedCategory === category.id
                        ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <span>{category.icon}</span>
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="w-full lg:w-auto">
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort by</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full lg:w-auto px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
              >
                <option value="points">Points (Low to High)</option>
                <option value="price">Price (Low to High)</option>
                <option value="popular">Popular First</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-6 lg:mb-8">
          <div className="bg-white rounded-lg p-3 text-center shadow-sm">
            <div className="text-lg lg:text-xl font-bold text-purple-600">{filteredSubscriptions.length}</div>
            <div className="text-xs lg:text-sm text-gray-600">Available</div>
          </div>
          <div className="bg-white rounded-lg p-3 text-center shadow-sm">
            <div className="text-lg lg:text-xl font-bold text-green-600">
              {subscriptions.filter(sub => userPoints >= sub.pointsRequired).length}
            </div>
            <div className="text-xs lg:text-sm text-gray-600">Affordable</div>
          </div>
          <div className="bg-white rounded-lg p-3 text-center shadow-sm">
            <div className="text-lg lg:text-xl font-bold text-orange-600">
              {subscriptions.filter(sub => sub.popular).length}
            </div>
            <div className="text-xs lg:text-sm text-gray-600">Popular</div>
          </div>
          <div className="bg-white rounded-lg p-3 text-center shadow-sm">
            <div className="text-lg lg:text-xl font-bold text-blue-600">
              ₹{Math.max(...subscriptions.map(sub => sub.pointsRequired * 0.25), 0).toFixed(0)}
            </div>
            <div className="text-xs lg:text-sm text-gray-600">Max Value</div>
          </div>
        </div>

        {/* Subscription Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {filteredSubscriptions.map(subscription => {
            const canRedeem = userPoints >= subscription.pointsRequired;
            const pointsNeeded = subscription.pointsRequired - userPoints;
            const progressPercent = Math.min((userPoints / subscription.pointsRequired) * 100, 100);

            return (
              <div
                key={subscription.id}
                className={`relative rounded-xl lg:rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-white overflow-hidden border ${
                  canRedeem ? 'border-green-200' : 'border-gray-200'
                }`}
              >
                {/* Popular Badge */}
                {subscription.popular && (
                  <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-bold z-10 flex items-center gap-1">
                    <Star size={12} />
                    Popular
                  </div>
                )}

                {/* Rating Badge */}
                <div className="absolute top-3 left-3 bg-black/80 text-white px-2 py-1 rounded-full text-xs font-medium z-10 flex items-center gap-1">
                  <Star size={10} className="fill-yellow-400 text-yellow-400" />
                  {subscription.rating}
                </div>

                <div className="p-4 lg:p-6">
                  {/* Header */}
                  <div className={`${subscription.bgColor} rounded-xl p-4 mb-4 text-white`}>
                    <div className="flex items-center justify-between">
                      <div className="text-3xl lg:text-4xl">{subscription.icon}</div>
                      <div className="text-right">
                        <span className="text-lg lg:text-xl font-bold">{subscription.pointsRequired.toLocaleString()}</span>
                        <span className="text-xs opacity-90 ml-1">points</span>
                      </div>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-lg lg:text-xl font-bold text-gray-900 mb-2 line-clamp-1">{subscription.title}</h3>
                  <p className="text-gray-600 text-xs lg:text-sm mb-4 leading-relaxed line-clamp-2">{subscription.description}</p>

                  {/* Pricing */}
                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="text-lg lg:text-xl font-bold text-green-600">₹{subscription.discountPrice}</span>
                        <span className="text-sm text-gray-500 line-through ml-2">₹{subscription.originalPrice}</span>
                      </div>
                      <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded">
                        Save ₹{subscription.originalPrice - subscription.discountPrice}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">Validity: {subscription.validity}</div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Your progress</span>
                      <span>{Math.min(userPoints, subscription.pointsRequired).toLocaleString()}/{subscription.pointsRequired.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${
                          canRedeem ? 'bg-green-500' : 'bg-blue-500'
                        }`}
                        style={{ width: `${progressPercent}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Redeem Button */}
                  <button
                    onClick={() => handleRedeem(subscription)}
                    disabled={!canRedeem}
                    className={`w-full py-2 lg:py-3 px-4 rounded-lg font-semibold transition-all duration-300 text-sm lg:text-base ${
                      canRedeem
                        ? "bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl hover:scale-105"
                        : "bg-gray-100 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {canRedeem ? (
                      <span className="flex items-center justify-center gap-2">
                        <Zap size={16} />
                        Redeem Now
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <span>Need {pointsNeeded.toLocaleString()} points</span>
                      </span>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredSubscriptions.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No subscriptions found</h3>
            <p className="text-gray-600 mb-4">Try selecting a different category or check back later for new rewards!</p>
            <button 
              onClick={() => setSelectedCategory("all")}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg hover:shadow-lg transition"
            >
              Show All Subscriptions
            </button>
          </div>
        )}

        {/* Footer CTA */}
        <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl lg:rounded-2xl p-6 lg:p-8 text-white text-center mt-8 lg:mt-12">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Crown size={24} />
            <h3 className="text-lg lg:text-xl font-bold">Want more premium subscriptions?</h3>
          </div>
          <p className="text-orange-100 text-sm lg:text-base mb-4">
            Solve more coding challenges to earn points and unlock exclusive rewards!
          </p>
          <button className="bg-white text-orange-600 px-6 py-2 rounded-lg font-semibold hover:bg-orange-50 transition">
            Start Coding Challenges
          </button>
        </div>
      </div>
    </div>
  );
}

export default Marketplace;