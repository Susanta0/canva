import React, { useState } from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";

const HomeItems = ({ design, type, deleteDesign }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-[#2d3639] border border-gray-700 overflow-hidden group hover:border-purple-500 transition-all duration-300 hover:shadow-xl hover:shadow-purple-900/30 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main image container */}
      <div className="h-40 sm:h-48 bg-gradient-to-br from-gray-700 to-gray-800 relative overflow-hidden">
        {/* Image with zoom effect removed */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute inset-0 overflow-hidden">
            {/* Single static image without scale transformation */}
            <img
              src={design.image_url}
              alt={design.title || "Design preview"}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Enhanced overlay gradient on hover */}
          {type ? null : (
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent transition-opacity duration-500 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            ></div>
          )}

          {/* Quick view button */}
          <div
            className={`absolute bottom-0 left-0 right-0 text-center transition-all duration-500 ${
              isHovered
                ? "translate-y-0 opacity-100"
                : "translate-y-8 opacity-0"
            }`}
          >
            <Link
              to={`/design/${design._id}/edit`}
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium py-2 px-4 rounded-t-lg shadow-lg"
            >
              Edit Design
            </Link>
          </div>
        </div>

        {/* Delete button with improved animation */}
        <div
          className={`absolute top-3 right-3 transition-all duration-300 transform ${
            isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
          }`}
        >
          <button
            onClick={() => deleteDesign(design._id)}
            className="h-8 w-8 bg-black/70 hover:bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg transform hover:scale-110 transition-all"
            aria-label="Delete design"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Design info badge */}
        {type ? null : (
          <div
            className={`absolute bottom-3 left-3 transition-all duration-300 transform ${
              isHovered ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="bg-black/70 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full">
              {design.type || "Design"}
            </div>
          </div>
        )}
      </div>

      {/* Info section */}
      <div className="p-4 border-t border-gray-700">
        <h3 className="text-white text-sm font-medium truncate">
          {design.title || "Untitled Design"}
        </h3>
        <div className="flex justify-between items-start mt-2">
          <div>
            <p className="text-xs text-gray-400">
              {design.updatedAt
                ? format(new Date(design.updatedAt), "MMMM d, yyyy, h:mm a")
                : "Recently modified"}
            </p>
          </div>

          {/* Status indicator */}
          <div className="flex items-center">
            <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
            <span className="text-xs text-gray-400">Active</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeItems;
