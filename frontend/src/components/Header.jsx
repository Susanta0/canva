import React, { useState } from "react";
import * as htmlToImage from "html-to-image";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import useDownloader from "react-use-downloader";
import api from "../utils/api";
import toast from "react-hot-toast";

const Header = ({ components, design_id }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loader, setLoader] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const { download } = useDownloader();

  // download image
  const downloadImage = async () => {
    const targetDiv = document.getElementById("main_design");
    const dataUrl = await htmlToImage.toPng(targetDiv, {
      style: {
        transform: "scale(1)",
      },
    });
    download(dataUrl, "image.png");
  };

  // save image
  const saveImage = async () => {
    const getDiv = document.getElementById("main_design");
    const image = await htmlToImage.toBlob(getDiv);

    if (image) {
      const obj = {
        design: components,
      };
      
      try {
      const formData = new FormData();
      formData.append("design", JSON.stringify(obj));
      formData.append("image", image);
        setLoader(true);
        const { data } = await api.put(
          `/api/update_user_design/${design_id}`,
          formData
        );
        toast.success("Image saved successfully!");

        setLoader(false);
      } catch (error) {
        setLoader(false);
        toast.error("Error saving image. Please try again.");
      }
    }
  };

  return (
    <header className="w-full">
      {/* Main header */}
      <div className="h-16 bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 w-full shadow-lg">
        <div className="h-full relative max-w-6xl mx-auto flex justify-between items-center px-4 md:px-6 text-white">
          {/* Logo on left */}
          <div className="flex items-center z-10">
            <Link to="/" className="flex items-center">
              <img
                className="h-8 w-8 rounded-full border-2 border-purple-400 shadow-md shadow-purple-500/50 transition-transform hover:scale-110"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAWlBMVEUCwswIuc4NrdEZo9QjldcyiNhOuNmt3ev////u9fyH1OLY5Phryt02eN9FcNwCmNRQYeBeTuMlhd5qO+grU+WAi+w8Zeh6Kumvs/RHM+5KTPFzJ/BZNvdkJ/qcqMW7AAABD0lEQVR4AXXPBRLDMAxEUVMTOcyc+1+zK6kMv4N9s3JrvrLIOe99uHybYYQG4N9l+LN0fzCB3YfvmBKKmfuBGVFe2IIog3lY+WYZP5hRvA2rh2GRsvG0FisrY/kDxGP6J1LKaxiGQDHLR0GIKNGjglIkEvI+T2oQjlbNHXGVCd1uwhrjrMM5/jlCAckO1honZcBapGMSU/SuFmRCpVrbtsZzdcEoIqTWM/IzRPFOQz6q9YZv4VokAkzlNA0jDWLzbDptIcqHCcFGmSmWPBkitBmGZqFlhYGAQlxOeDcSTGaCk7Rt2zrmkeLSrqB9VhRBUO44QPusahQODXTuSE3wDudx7mr3pX6tvRtQ4R3vegWNXiIGxpIzCAAAAABJRU5ErkJggg=="
                alt="Logo"
              />
            </Link>
          </div>

          {/* Brand name centered in header */}
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <span className="text-lg font-bold whitespace-nowrap">
              Mini Canva
            </span>
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-3 z-10">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-3">
              <button
                onClick={saveImage}
                disabled={loader}
                className={`px-4 py-2 bg-purple-700 hover:bg-purple-600 rounded text-white font-medium transition-colors duration-200 shadow-md ${
                  loader ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loader ? "Saving..." : "Save"}
              </button>
              <button
                onClick={downloadImage}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded text-white font-medium transition-colors duration-200 shadow-md"
              >
                Download
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-full bg-purple-700/40 hover:bg-purple-700/60 transition-colors duration-200"
              >
                {mobileMenuOpen ? (
                  <RxCross2 size={20} />
                ) : (
                  <GiHamburgerMenu size={20} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-purple-900/95 text-white">
          <div className="flex flex-col items-center py-4 space-y-3 px-6">
            <button
              onClick={saveImage}
              disabled={loader}
              className={`w-full py-3 bg-purple-700 hover:bg-purple-600 rounded text-white font-medium transition-colors duration-200 ${
                loader ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loader ? "Saving..." : "Save"}
            </button>
            <button
              onClick={downloadImage}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 rounded text-white font-medium transition-colors duration-200"
            >
              Download
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
