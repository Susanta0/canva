import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BsLightbulb,
  BsBookmark,
  BsBookmarkFill,
  BsStar,
  BsStarFill,
} from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";
import api from "../utils/api";
import toast from "react-hot-toast";

const DesignTips = () => {
  const [tips, setTips] = useState([]);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [savedTips, setSavedTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPersonalized, setIsPersonalized] = useState(false);
  const [userRatings, setUserRatings] = useState({});
  const [showRating, setShowRating] = useState(false);

  // Fetch tips from backend
  useEffect(() => {
    const fetchTips = async () => {
      try {
        setLoading(true);
        // Try to get personalized tips first
        const { data } = await api.get("/api/personalized-tips");
        setTips(data.tips);
        setIsPersonalized(data.isPersonalized);
        console.log(data);

        // Also fetch saved tips to know which ones the user has saved
        const savedResponse = await api.get("/api/saved-tips");
        setSavedTips(savedResponse.data.tips.map((tip) => tip._id));
      } catch (error) {
        console.error("Error fetching tips:", error);
        // Fallback to regular tips if personalized tips fail
        try {
          const { data } = await api.get("/api/design-tips");
          setTips(data.tips);
        } catch (fallbackError) {
          console.error("Error fetching fallback tips:", fallbackError);
          // Use hardcoded tips as a last resort
          setTips([
            {
              _id: "default1",
              category: "Design Basics",
              tip: "Use a maximum of 2-3 fonts in your design to maintain visual harmony.",
              link: "#typography",
            },
            {
              _id: "default2",
              category: "Color Theory",
              tip: "Create depth in your designs by using lighter colors for background elements and darker colors for foreground elements.",
              link: "#colors",
            },
          ]);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTips();

    // Rotate tips periodically
    const interval = setInterval(() => {
      setCurrentTipIndex((prevIndex) =>
        prevIndex === tips.length - 1 ? 0 : prevIndex + 1
      );
    }, 15000); // Change tip every 15 seconds

    return () => clearInterval(interval);
  }, []);

  // Toggle saving a tip
  const toggleSaveTip = async (tipId) => {
    try {
      const { data } = await api.post("/api/save-tip", { tip_id: tipId });

      if (data.saved) {
        setSavedTips([...savedTips, tipId]);
        toast.success("Tip saved to your collection");
      } else {
        setSavedTips(savedTips.filter((id) => id !== tipId));
        toast.success("Tip removed from your collection");
      }
    } catch (error) {
      console.error("Error saving tip:", error);
      toast.error("Failed to save tip");
    }
  };

  // Rate a tip
  const rateTip = async (tipId, rating) => {
    try {
      const { data } = await api.post("/api/rate-tip", {
        tip_id: tipId,
        rating,
      });

      // Update the tip's average rating in the local state
      setTips(
        tips.map((tip) =>
          tip._id === tipId
            ? { ...tip, averageRating: data.averageRating }
            : tip
        )
      );

      // Save user's rating
      setUserRatings({ ...userRatings, [tipId]: rating });

      toast.success("Rating submitted");
      setShowRating(false);
    } catch (error) {
      console.error("Error rating tip:", error);
      toast.error("Failed to submit rating");
    }
  };

  const goToNextTip = () => {
    setCurrentTipIndex((prevIndex) =>
      prevIndex === tips.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevTip = () => {
    setCurrentTipIndex((prevIndex) =>
      prevIndex === 0 ? tips.length - 1 : prevIndex - 1
    );
  };

  // If there are no tips or still loading, show a placeholder
  if (loading || tips.length === 0) {
    return (
      <div className="mt-6 sm:mt-8 bg-[#343E42] p-3 sm:p-4 rounded-lg border border-gray-700 relative overflow-hidden">
        <div className="flex items-center gap-2 mb-2 sm:mb-3">
          <BsLightbulb className="text-purple-400 text-lg" />
          <h3 className="font-medium text-white text-sm sm:text-base">
            Design Tip
          </h3>
        </div>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-700 rounded w-1/4 mb-2"></div>
          <div className="h-3 bg-gray-700 rounded w-full mb-1"></div>
          <div className="h-3 bg-gray-700 rounded w-5/6 mb-1"></div>
          <div className="h-3 bg-gray-700 rounded w-4/6 mb-3"></div>
        </div>
      </div>
    );
  }

  const currentTip = tips[currentTipIndex];

  return (
    <div className="mt-6 sm:mt-8 bg-[#343E42] p-3 sm:p-4 rounded-lg border border-gray-700 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -right-4 -top-4 w-16 h-16 bg-purple-500/10 rounded-full blur-xl"></div>
      <div className="absolute -left-4 -bottom-4 w-12 h-12 bg-blue-500/10 rounded-full blur-lg"></div>

      {/* Header with icon */}
      <div className="flex items-center gap-2 mb-2 sm:mb-3">
        <BsLightbulb className="text-purple-400 text-lg" />
        <h3 className="font-medium text-white text-sm sm:text-base">
          Design Tip{" "}
          <span className="text-xs text-gray-400">
            ({currentTipIndex + 1}/{tips.length})
          </span>
        </h3>
        <button
          onClick={() => toggleSaveTip(currentTip._id)}
          className="ml-auto text-gray-400 hover:text-purple-400 transition-colors"
          title={
            savedTips.includes(currentTip._id)
              ? "Remove from saved tips"
              : "Save this tip"
          }
        >
          {savedTips.includes(currentTip._id) ? (
            <BsBookmarkFill className="text-purple-400" />
          ) : (
            <BsBookmark />
          )}
        </button>
      </div>

      {/* Category badge */}
      <div className="inline-block px-2 py-0.5 bg-purple-500/20 rounded-full text-purple-300 text-xs mb-2">
        {currentTip.category}
      </div>

      {/* AI badge if tip is AI-generated */}
      {currentTip.isAIGenerated && (
        <div className="inline-block ml-2 px-2 py-0.5 bg-blue-500/20 rounded-full text-blue-300 text-xs mb-2">
          AI Personalized
        </div>
      )}

      {/* Tip content */}
      <p className="text-xs sm:text-sm text-gray-300 mb-3 sm:mb-4 min-h-[40px]">
        {currentTip.tip}
      </p>

      {/* Rating section */}
      {showRating ? (
        <div className="mb-3 p-2 bg-gray-700/50 rounded-md">
          <p className="text-xs text-gray-300 mb-2">Rate this tip:</p>
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => rateTip(currentTip._id, star)}
                className="text-lg hover:scale-110 transition-transform"
              >
                {userRatings[currentTip._id] >= star ? (
                  <BsStarFill className="text-yellow-400" />
                ) : (
                  <BsStar className="text-gray-400" />
                )}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowRating(true)}
          className="text-xs text-gray-400 hover:text-gray-300 mb-3 flex items-center"
        >
          <BsStar className="mr-1" /> Rate this tip
        </button>
      )}

      {/* Navigation and action buttons */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-1">
          <button
            onClick={goToPrevTip}
            className="p-1 text-gray-400 hover:text-white bg-gray-700/50 rounded-md transition-colors"
            title="Previous tip"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 sm:h-4 sm:w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={goToNextTip}
            className="p-1 text-gray-400 hover:text-white bg-gray-700/50 rounded-md transition-colors"
            title="Next tip"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 sm:h-4 sm:w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        <Link
          to={currentTip.link}
          className="text-xs sm:text-sm text-purple-400 hover:text-purple-300 flex items-center group"
        >
          Learn more
          <FiExternalLink className="ml-1 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Saved tips indicator */}
      {savedTips.length > 0 && (
        <div className="mt-3 pt-2 border-t border-gray-700/50 flex items-center justify-between">
          <span className="text-xs text-gray-400">
            {savedTips.length} saved tip{savedTips.length !== 1 ? "s" : ""}
          </span>
          <Link
            to="/saved-tips"
            className="text-xs text-purple-400 hover:underline"
          >
            View all
          </Link>
        </div>
      )}
    </div>
  );
};

export default DesignTips;
