import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import toast from "react-hot-toast";
import { BsBookmarkFill, BsStarFill, BsStarHalf } from "react-icons/bs";
import { FiExternalLink } from "react-icons/fi";

const SavedTips = () => {
  const [savedTips, setSavedTips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedTips = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/api/saved-tips");
        setSavedTips(data.tips);
      } catch (error) {
        console.error("Error fetching saved tips:", error);
        toast.error("Failed to load your saved tips");
      } finally {
        setLoading(false);
      }
    };

    fetchSavedTips();
  }, []);

  const unsaveTip = async (tipId) => {
    try {
      const { data } = await api.post("/api/save-tip", { tip_id: tipId });
      if (!data.saved) {
        setSavedTips(savedTips.filter((tip) => tip._id !== tipId));
        toast.success("Tip removed from saved collection");
      }
    } catch (error) {
      console.error("Error unsaving tip:", error);
      toast.error("Failed to remove tip");
    }
  };

  const renderRating = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<BsStarFill key={`full-${i}`} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<BsStarHalf key="half" className="text-yellow-400" />);
    }

    return (
      <div className="flex items-center gap-1">
        {stars}
        <span className="text-xs text-gray-400 ml-1">{rating.toFixed(1)}</span>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-white">
          Your Saved Design Tips
        </h1>
        <Link
          to="/"
          className="text-sm text-purple-400 hover:text-purple-300 flex items-center gap-1"
        >
          <span>Back to Home</span>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : savedTips.length === 0 ? (
        <div className="bg-[#2b3538] border border-gray-700 rounded-lg p-8 text-center">
          <BsBookmarkFill className="text-gray-500 text-4xl mx-auto mb-4" />
          <h3 className="text-xl font-medium text-white mb-2">
            No saved tips yet
          </h3>
          <p className="text-gray-400 mb-6">
            Start saving design tips that you find useful for future reference.
          </p>
          <Link
            to="/"
            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            Explore Tips
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {savedTips.map((tip) => (
            <div
              key={tip._id}
              className="bg-[#2b3538] border border-gray-700 rounded-lg p-4 hover:border-purple-500 transition-all duration-300 relative group"
            >
              <div className="absolute top-3 right-3 flex space-x-2">
                <button
                  onClick={() => unsaveTip(tip._id)}
                  className="text-purple-400 hover:text-purple-300 transition-colors"
                  title="Remove from saved"
                >
                  <BsBookmarkFill />
                </button>
              </div>

              <div className="inline-block px-2 py-0.5 bg-purple-500/20 rounded-full text-purple-300 text-xs mb-2">
                {tip.category}
              </div>

              {tip.averageRating > 0 && (
                <div className="mt-1 mb-2">
                  {renderRating(tip.averageRating)}
                </div>
              )}

              <p className="text-sm text-gray-300 mb-3">{tip.tip}</p>

              <div className="flex justify-between items-center mt-2">
                {tip.isAIGenerated && (
                  <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">
                    AI Generated
                  </span>
                )}

                <Link
                  to={tip.link}
                  className="text-xs text-purple-400 hover:text-purple-300 flex items-center ml-auto group"
                >
                  Learn more
                  <FiExternalLink className="ml-1 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SavedTips;