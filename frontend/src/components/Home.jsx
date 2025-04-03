import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeItems from "./Home/HomeItems";
import api from "../utils/api";
import toast from "react-hot-toast";

const Home = () => {
  const [designImages, setDesignImages] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

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

  const getUserDesign = async () => {
    try {
      setLoading(true); // Set loading to true before fetching
      const { data } = await api.get("/api/user_design");
      setDesignImages(data.designs);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };
  useEffect(() => {
    getUserDesign();
  }, []);

  const deleteDesign = async (design_id) => {
    try {
      const { data } = await api.delete(`/api/delete_user_image/${design_id}`);
      toast.success("Design deleted successfully.");
      getUserDesign();
    } catch (error) {
      console.log(error);
      toast.error("Error deleting design. Please try again.");
    }
  };

  const create = (e) => {
    e.preventDefault();
    navigate("/design/create", {
      state: {
        type: "create",
        width: 600,
        height: 450,
      },
    });
  };

  return (
    <div className="border border-gray-700 rounded-lg p-3 sm:p-5 bg-[#3a464a] text-white shadow-lg">
      {/* Hero Banner Section */}
      <div className="w-full flex justify-center items-center h-[200px] sm:h-[250px] md:h-[280px] lg:h-[350px] bg-gradient-to-r from-[#4c76cf] to-[#552ab8] relative rounded-lg overflow-hidden shadow-xl mb-6 sm:mb-8">
        <button
          onClick={() => setShow(!show)}
          className="cursor-pointer px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm overflow-hidden text-center bg-[#8b3dffad] text-white rounded-md font-medium hover:bg-[#8b3dffd3] transition-all duration-300 absolute top-3 right-3 sm:top-4 sm:right-4 flex items-center gap-2 backdrop-blur-sm"
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
          <button className="cursor-pointer w-full px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm overflow-hidden text-center bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-md font-medium hover:from-purple-700 hover:to-blue-600 transition-all duration-300 shadow-md">
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
          <button
            onClick={create}
            className="cursor-pointer bg-white text-purple-700 hover:bg-gray-100 px-4 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base font-medium shadow-lg transform transition-all hover:-translate-y-1 hover:shadow-xl"
          >
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
          <button
            onClick={() => navigate("/projects")}
            className=" cursor-pointer text-xs sm:text-sm text-purple-300 hover:text-purple-200 flex items-center gap-1"
          >
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

        {/* Show spinner or skeleton while loading */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {Array(4)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="animate-pulse bg-gray-700 rounded-lg h-40 sm:h-48"
                ></div>
              ))}
          </div>
        ) : designImages.length === 0 ? (
          <div className="flex justify-center items-center h-40 sm:h-48 bg-gray-800 rounded-lg text-gray-400 text-sm sm:text-base font-semibold">
            No designs found.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {designImages.map((design, ind) => (
              <HomeItems
                design={design}
                key={ind}
                deleteDesign={deleteDesign}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
