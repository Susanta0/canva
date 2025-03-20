import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { RxHome } from "react-icons/rx";
import { FaRegFolderClosed } from "react-icons/fa6";
import { HiOutlineTemplate } from "react-icons/hi";

const Layout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <div className="min-h-screen w-full bg-[#343E42]">
        <nav className="flex items-center justify-between px-6 py-4 shadow-sm relative">
          {/* Left side - Canva Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <img
                className="rounded-full"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAWlBMVEUCwswIuc4NrdEZo9QjldcyiNhOuNmt3ev////u9fyH1OLY5Phryt02eN9FcNwCmNRQYeBeTuMlhd5qO+grU+WAi+w8Zeh6Kumvs/RHM+5KTPFzJ/BZNvdkJ/qcqMW7AAABD0lEQVR4AXXPBRLDMAxEUVMTOcyc+1+zK6kMv4N9s3JrvrLIOe99uHybYYQG4N9l+LN0fzCB3YfvmBKKmfuBGVFe2IIog3lY+WYZP5hRvA2rh2GRsvG0FisrY/kDxGP6J1LKaxiGQDHLR0GIKNGjglIkEvI+T2oQjlbNHXGVCd1uwhrjrMM5/jlCAckO1honZcBapGMSU/SuFmRCpVrbtsZzdcEoIqTWM/IzRPFOQz6q9YZv4VokAkzlNA0jDWLzbDptIcqHCcFGmSmWPBkitBmGZqFlhYGAQlxOeDcSTGaCk7Rt2zrmkeLSrqB9VhRBUO44QPusahQODXTuSE3wDudx7mr3pX6tvRtQ4R3vegWNXiIGxpIzCAAAAABJRU5ErkJggg=="
                alt=""
              />
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 text-transparent bg-clip-text">
                Canva
              </span>
            </div>
          </div>

          {/* Right side - Design button and Profile Image */}
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 text-white bg-purple-600 rounded-md hover:bg-purple-700 transition-colors">
              Create Design
            </button>
            <div className="relative">
              <div
                className="w-8 h-8 rounded-full bg-gray-300 overflow-hidden cursor-pointer"
                onClick={toggleMenu}
              >
                <img
                  src="/profile-pic.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      John Doe
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      john.doe@example.com
                    </p>
                  </div>

                  {/* Menu Items */}
                  <Link
                    to="/settings"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Settings
                  </Link>
                  <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>

        <div className="flex w-full mt-6">
          <div className="sidebar w-[300px] p-5 h-[calc(100vh-70px)] fixed border">
            <div className="flex justify-start gap-5 items-center px-2 py-2 mb-5">
              <img
                className="rounded-full border h-[50px] w-[50px]"
                src="/profile-pic.jpg"
                alt="profile"
              />

              <div className="flex flex-col justify-center text-white">
                <span>Susanta</span>
                <span>Free</span>
              </div>
            </div>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/"
                  className={`flex justify-start items-center gap-4 px-2 py-2 text-white ${
                    pathname === "/" ? "bg-[#ffffff26]" : ""
                  } rounded-[4px]`}
                >
                  <span className="text-xl">
                    <RxHome />
                  </span>
                  <span className="font-medium">Home</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/projects"
                  className={`flex justify-start items-center gap-4 px-2 py-2 text-white ${
                    pathname === "/projects" ? "bg-[#ffffff26]" : ""
                  } rounded-[4px]`}
                >
                  <span className="text-xl">
                    <FaRegFolderClosed />
                  </span>
                  <span className="font-medium">Projects</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/templates"
                  className={`flex justify-start items-center gap-4 px-2 py-2 text-white ${
                    pathname === "/templates" ? "bg-[#ffffff26]" : ""
                  } rounded-[4px]`}
                >
                  <span className="text-xl">
                    <HiOutlineTemplate />
                  </span>
                  <span className="font-medium">Templates</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="ml-[300px] w-[calc(100%-300px)]">
            <div className="px-4 py-4">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
