import React from "react";
import Images from "./Images";

const MyImages = () => {
  return (
    <div>
      <div className="w-full h-[40px] flex justify-center items-center bg-purple-500 rounded-sm text-white mb-3">
        <label className="text-center curson-pointer" htmlFor="image">
          Upload Image
        </label>
        <input type="file" id="image" className="hidden" />
      </div>
      <div className="h-[80vh] overflow-x-auto flex justify-start items-start custom-scrollbar">
        <Images />
      </div>
    </div>
  );
};

export default MyImages;
