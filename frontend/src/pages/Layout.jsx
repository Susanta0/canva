import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { RxHome } from "react-icons/rx";
import { FaRegFolderClosed } from "react-icons/fa6";
import { HiOutlineTemplate } from "react-icons/hi";
import { HiMenuAlt2 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { token_decode } from "../utils/index";
import default_user from "/default_user.png";

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const userInfo = token_decode(localStorage.getItem("canva_token"));

  // Handle screen resize and set mobile state
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
        setIsMobile(true);
      } else {
        setIsSidebarOpen(true);
        setIsMobile(false);
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest(".profile-menu-container")) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebarOnMobile = () => {
    if (isMobile) {
      setIsSidebarOpen(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/design/create", {
      state: {
        type: "create",
        width: 600,
        height: 450,
      },
    });
  };

  const logout = () => {
    localStorage.removeItem("canva_token");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#343E42] to-[#282f32] text-white">
      {/* Navigation Bar */}
      <nav className="flex items-center justify-between px-3 sm:px-6 py-2 sm:py-3 bg-[#2b3538] shadow-md sticky top-0 z-30">
        {/* Left side - Menu toggle and Logo */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          <button
            onClick={toggleSidebar}
            className="p-1.5 sm:p-2 text-white rounded-md hover:bg-[#3a464b] transition-colors"
            aria-label="Toggle sidebar"
          >
            <HiMenuAlt2 className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          <div className="flex-shrink-0 flex items-center">
            <img
              className="h-6 w-6 sm:h-8 sm:w-8 rounded-full border border-purple-400 shadow-sm shadow-purple-500/30"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAWlBMVEUCwswIuc4NrdEZo9QjldcyiNhOuNmt3ev////u9fyH1OLY5Phryt02eN9FcNwCmNRQYeBeTuMlhd5qO+grU+WAi+w8Zeh6Kumvs/RHM+5KTPFzJ/BZNvdkJ/qcqMW7AAABD0lEQVR4AXXPBRLDMAxEUVMTOcyc+1+zK6kMv4N9s3JrvrLIOe99uHybYYQG4N9l+LN0fzCB3YfvmBKKmfuBGVFe2IIog3lY+WYZP5hRvA2rh2GRsvG0FisrY/kDxGP6J1LKaxiGQDHLR0GIKNGjglIkEvI+T2oQjlbNHXGVCd1uwhrjrMM5/jlCAckO1honZcBapGMSU/SuFmRCpVrbtsZzdcEoIqTWM/IzRPFOQz6q9YZv4VokAkzlNA0jDWLzbDptIcqHCcFGmSmWPBkitBmGZqFlhYGAQlxOeDcSTGaCk7Rt2zrmkeLSrqB9VhRBUO44QPusahQODXTuSE3wDudx7mr3pX6tvRtQ4R3vegWNXiIGxpIzCAAAAABJRU5ErkJggg=="
              alt="Logo"
            />
            <span className="ml-1 sm:ml-2 text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
              Canva
            </span>
          </div>
        </div>

        {/* Right side - Design button and Profile Image */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button
            onClick={handleSubmit}
            className="cursor-pointer px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 text-xs sm:text-sm md:text-base text-white bg-gradient-to-r from-purple-600 to-blue-500 rounded-md hover:from-purple-700 hover:to-blue-600 transition-all duration-300 shadow-md shadow-purple-900/20"
          >
            Create Design
          </button>
          <div className="relative profile-menu-container">
            <div
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-800 overflow-hidden cursor-pointer border-2 border-purple-400 transition-transform hover:scale-105"
              onClick={toggleMenu}
            >
              <img
                src={userInfo.image ? userInfo.image : default_user}
                alt="Profile"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=John+Doe&background=8B5CF6&color=fff`;
                }}
              />
            </div>

            {/* Dropdown Menu */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-[#252a2d] rounded-md shadow-lg py-1 z-40 border border-gray-700 animate-fade-in">
                {/* User Info */}
                <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-700">
                  <p className="text-xs sm:text-sm font-medium text-white">
                    {userInfo.name}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {userInfo.email}
                  </p>
                </div>

                {/* Menu Items */}
                <Link
                  to="/settings"
                  className="block px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-300 hover:bg-[#3a464b] transition-colors"
                >
                  Settings
                </Link>
                <Link
                  to="/account"
                  className="block px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-gray-300 hover:bg-[#3a464b] transition-colors"
                >
                  Your Account
                </Link>
                <div className="border-t border-gray-700 my-1"></div>
                <button
                  onClick={logout}
                  className="block w-full text-left px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-red-400 hover:bg-[#3a464b] transition-colors"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="flex w-full relative">
        {/* Sidebar Overlay for Mobile */}
        {isMobile && isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-20"
            onClick={toggleSidebar}
          ></div>
        )}

        {/* Sidebar */}
        <div
          className={`${
            isSidebarOpen
              ? "translate-x-0 w-[300px] sm:w-64 md:w-72"
              : "w-0 overflow-hidden"
          } ${
            isMobile
              ? "fixed left-0 top-0 pt-14 sm:pt-16 z-20"
              : "sticky top-14 sm:top-16"
          }  h-[calc(100vh-56px)] sm:h-[calc(100vh-64px)] 
      bg-[#2b3538] 
      transition-all duration-300 
      shadow-lg border-r border-gray-700`}
        >
          {/* Mobile Close Button */}
          {isMobile && (
            <button
              onClick={toggleSidebar}
              className="absolute top-3 sm:top-4 right-3 sm:right-4 text-gray-400 hover:text-white"
            >
              <IoClose className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          )}

          {/* User Profile Section */}
          <div className="flex items-center gap-2 sm:gap-3 px-2 py-2 sm:py-3 mb-4 sm:mb-6 bg-[#343E42] rounded-lg border border-gray-700">
            <div className="relative">
              <img
                className="rounded-full h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 border-2 border-purple-500/30 object-cover"
                src={userInfo.image ? userInfo.image : default_user}
                alt="profile"
                onError={(e) => {
                  e.target.src = `https://ui-avatars.com/api/?name=Susanta&background=8B5CF6&color=fff`;
                }}
              />
              <div className="absolute bottom-0 right-0 w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-green-500 border border-[#2b3538]"></div>
            </div>

            <div className="flex flex-col justify-center">
              <span className="font-medium text-white text-sm sm:text-base">
                {userInfo.name}
              </span>
              <div className="flex items-center">
                <span className="text-xs sm:text-sm text-gray-400">Free</span>
                <button className="ml-2 text-xs text-purple-400 hover:text-purple-300 transition-colors">
                  Upgrade
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Menu */}
          <ul className="space-y-1 sm:space-y-2">
            <li>
              <Link
                to="/"
                className={`flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg transition-all duration-200 group ${
                  pathname === "/"
                    ? "bg-gradient-to-r from-purple-600/20 to-blue-500/20 text-white"
                    : "text-gray-300 hover:bg-[#343E42]"
                }`}
                onClick={closeSidebarOnMobile}
              >
                <span
                  className={`text-lg sm:text-xl ${
                    pathname === "/"
                      ? "text-purple-400"
                      : "text-gray-400 group-hover:text-purple-400"
                  }`}
                >
                  <RxHome />
                </span>
                <span className="font-medium text-sm sm:text-base">Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/projects"
                className={`flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg transition-all duration-200 group ${
                  pathname === "/projects"
                    ? "bg-gradient-to-r from-purple-600/20 to-blue-500/20 text-white"
                    : "text-gray-300 hover:bg-[#343E42]"
                }`}
                onClick={closeSidebarOnMobile}
              >
                <span
                  className={`text-lg sm:text-xl ${
                    pathname === "/projects"
                      ? "text-purple-400"
                      : "text-gray-400 group-hover:text-purple-400"
                  }`}
                >
                  <FaRegFolderClosed />
                </span>
                <span className="font-medium text-sm sm:text-base">
                  Projects
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/templates"
                className={`flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg transition-all duration-200 group ${
                  pathname === "/templates"
                    ? "bg-gradient-to-r from-purple-600/20 to-blue-500/20 text-white"
                    : "text-gray-300 hover:bg-[#343E42]"
                }`}
                onClick={closeSidebarOnMobile}
              >
                <span
                  className={`text-lg sm:text-xl ${
                    pathname === "/templates"
                      ? "text-purple-400"
                      : "text-gray-400 group-hover:text-purple-400"
                  }`}
                >
                  <HiOutlineTemplate />
                </span>
                <span className="font-medium text-sm sm:text-base">
                  Templates
                </span>
              </Link>
            </li>
          </ul>

          {/* Bottom Section with Tips */}
          <div className="mt-6 sm:mt-8 bg-[#343E42] p-3 sm:p-4 rounded-lg border border-gray-700">
            <h3 className="font-medium text-white text-sm sm:text-base mb-1 sm:mb-2">
              Quick Tips
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 mb-2 sm:mb-3">
              Create stunning designs with drag-and-drop simplicity.
            </p>
            <a
              href="#"
              className="text-xs sm:text-sm text-purple-400 hover:text-purple-300 flex items-center"
            >
              Learn more
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 sm:h-4 sm:w-4 ml-1"
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
            </a>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 transition-all duration-300 min-h-[calc(100vh-56px)] sm:min-h-[calc(100vh-64px)]">
          <div className="p-3 sm:p-4 md:p-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
