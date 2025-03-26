import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const [customValue, setCustomValue] = useState({
    width: "",
    height: "",
  });

  const handleChange = (e) => {
    const { type, name, value } = e.target;
    const updatedValue = type === "number" ? Number(value) : value;

    setCustomValue({ ...customValue, [name]: updatedValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/design/create", {
      state: {
        type: "create",
        width: customValue.width,
        height: customValue.height,
      },
    });
  };

  return (
    <div className="border border-gray-700 rounded-lg p-3 sm:p-5 bg-[#3a464a] text-white shadow-lg">
      {/* Hero Banner Section */}
      <div className="w-full flex justify-center items-center h-[200px] sm:h-[250px] md:h-[280px] lg:h-[350px] bg-gradient-to-r from-[#4c76cf] to-[#552ab8] relative rounded-lg overflow-hidden shadow-xl mb-6 sm:mb-8">
        <button
          onClick={() => setShow(!show)}
          className="px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm overflow-hidden text-center bg-[#8b3dffad] text-white rounded-md font-medium hover:bg-[#8b3dffd3] transition-all duration-300 absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-2 backdrop-blur-sm"
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
              d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 1v4m0 0h-4m4 0l-5-5"
            />
          </svg>
          Custom size
        </button>

        {/* Custom Size Popup */}
        <form
          onSubmit={handleSubmit}
          className={`absolute top-12 sm:top-16 right-3 sm:right-4 gap-3 bg-[#252627] w-[250px] sm:w-[280px] p-4 sm:p-5 text-white rounded-lg shadow-2xl border border-[#3d3d3d] ${
            show
              ? "visible opacity-100 transform translate-y-0"
              : "invisible opacity-0 transform -translate-y-4"
          } transition-all duration-300 ease-in-out z-10`}
        >
          <h3 className="text-base sm:text-lg font-semibold mb-3 text-purple-300">
            Custom Dimensions
          </h3>
          <div className="pb-4 grid grid-cols-2 gap-3 sm:gap-4">
            <div className="flex flex-col gap-1 sm:gap-2 justify-center items-start">
              <label
                htmlFor="width"
                className="text-xs sm:text-sm text-gray-300"
              >
                Width (px)
              </label>
              <input
                type="number"
                name="width"
                value={customValue.width}
                required
                onChange={handleChange}
                placeholder="1920"
                className="outline-none w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-[#4d4d4d] bg-[#1a1a1a] rounded-md focus:border-purple-500 transition-colors duration-200 text-sm"
              />
            </div>
            <div className="flex flex-col gap-1 sm:gap-2 justify-center items-start">
              <label
                htmlFor="height"
                className="text-xs sm:text-sm text-gray-300"
              >
                Height (px)
              </label>
              <input
                type="number"
                name="height"
                value={customValue.height}
                onChange={handleChange}
                required
                placeholder="1080"
                className="outline-none w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-[#4d4d4d] bg-[#1a1a1a] rounded-md focus:border-purple-500 transition-colors duration-200 text-sm"
              />
            </div>
          </div>
          <button className="w-full px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm overflow-hidden text-center bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-md font-medium hover:from-purple-700 hover:to-blue-600 transition-all duration-300 shadow-md">
            Create Design
          </button>
        </form>

        {/* Hero Content */}
        <div className="text-center px-4 transform transition-all duration-300 hover:scale-105">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-2 sm:mb-4 text-white drop-shadow-lg">
            What will you design{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">
              today?
            </span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-100 max-w-md mx-auto mb-4 sm:mb-6 hidden sm:block">
            Unleash your creativity with powerful design tools
          </p>
          <button className="bg-white text-purple-700 hover:bg-gray-100 px-4 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base font-medium shadow-lg transform transition-all hover:-translate-y-1 hover:shadow-xl">
            Start Creating
          </button>
        </div>
      </div>

      {/* Recent Designs Section */}
      <div className="mt-6 sm:mt-8">
        <div className="flex justify-between items-center mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white">
            Your recent designs
          </h2>
          <button className="text-xs sm:text-sm text-purple-300 hover:text-purple-200 flex items-center gap-1">
            View all
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

        {/* Design Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Empty State */}
          {Array(4)
            .fill()
            .map((_, index) => (
              <div
                key={index}
                className="bg-[#2d3639] border border-gray-700 rounded-lg overflow-hidden group hover:border-purple-500 transition-all duration-300 hover:shadow-md hover:shadow-purple-900/20 relative"
              >
                <div className="h-24 sm:h-32 bg-gradient-to-br from-gray-700 to-gray-800 relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-gray-500 text-xs sm:text-sm">
                      {index === 0 ? "Start a new design" : "No preview"}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

                  {/* Delete Icon - appears on hover */}
                  {index !== 0 && (
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <button
                        className="h-6 w-6 bg-black/70 hover:bg-red-600/90 rounded-full flex items-center justify-center text-white shadow-md transform hover:scale-110 transition-all"
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
                  )}
                </div>
                <div className="p-2 sm:p-3">
                  <p className="text-xs sm:text-sm text-gray-300 truncate">
                    {index === 0 ? "Create new" : `Untitled Design ${index}`}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 hidden sm:block">
                    {index === 0
                      ? "Template"
                      : `Modified ${index} day${index > 1 ? "s" : ""} ago`}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Templates Section */}
      {/* <div className="mt-8 sm:mt-12">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6">
          Recommended templates
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {["Social Media", "Presentation", "Print"].map((type, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-[#2d3639] to-[#252a2d] rounded-lg overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300 shadow-md"
            >
              <div className="h-32 sm:h-40 md:h-48 bg-gradient-to-br from-purple-800/20 to-blue-800/20 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl sm:text-3xl md:text-4xl text-gray-600 opacity-30">
                    {type.charAt(0)}
                  </span>
                </div>
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="text-base sm:text-lg font-semibold text-white">
                  {type}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">
                  Professional {type.toLowerCase()} templates
                </p>
                <button className="mt-2 sm:mt-3 w-full bg-[#464e52] hover:bg-[#525a5e] text-white py-1.5 sm:py-2 rounded-md transition-colors duration-200 text-xs sm:text-sm">
                  Explore
                </button>
              </div>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default Home;
