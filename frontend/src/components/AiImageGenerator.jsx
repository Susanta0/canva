import React, { useState } from "react";
import api from "../utils/api";
import { FaRobot } from "react-icons/fa";
import { BsImage } from "react-icons/bs";
import { RiMagicFill } from "react-icons/ri";
import RotateLoader from "react-spinners/RotateLoader";

const AiImageGenerator = ({ add_image }) => {
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateImage = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError("Please enter a prompt");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const { data } = await api.post("/api/huggingface/generate-image", { prompt });
      setGeneratedImage(data.imageUrl);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.response?.data?.error || "Failed to generate image");
    }
  };

  const handleAddToCanvas = () => {
    if (generatedImage) {
      add_image(generatedImage);
      // Optional: Clear the generated image after adding to canvas
      // setGeneratedImage("");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-gradient-to-r from-purple-900/20 to-gray-800/30 p-4 rounded-lg border border-gray-700/50 shadow-md">
        <h3 className="text-purple-400 font-medium flex items-center gap-2 mb-3">
          <FaRobot className="text-lg" /> AI Image Generator
        </h3>
        <form onSubmit={generateImage} className="flex flex-col gap-3">
          <div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the image you want to create..."
              className="w-full bg-gray-800/70 text-gray-200 border border-gray-700 rounded-md p-2 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all duration-200 min-h-[80px] placeholder-gray-500"
            />
          </div>
          {error && <p className="text-red-400 text-xs">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white py-2 px-4 rounded-md flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-purple-700/50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RiMagicFill className="text-lg" />
            {loading ? "Generating..." : "Generate Image"}
          </button>
        </form>
      </div>

      {loading && (
        <div className="flex justify-center items-center py-6">
          <RotateLoader color="#a855f7" size={10} />
        </div>
      )}

      {generatedImage && !loading && (
        <div className="mt-2">
          <h4 className="text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
            <BsImage /> Generated Image
          </h4>
          <div className="relative group">
            <img
              src={generatedImage}
              alt="AI Generated"
              className="w-full h-auto rounded-md border border-gray-700/50 shadow-md"
            />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300 rounded-md">
              <button
                onClick={handleAddToCanvas}
                className="bg-purple-600 hover:bg-purple-500 text-white py-2 px-4 rounded-md text-sm transition-all duration-200"
              >
                Add to Canvas
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiImageGenerator;