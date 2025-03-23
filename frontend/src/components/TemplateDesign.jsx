import React from "react";

const TemplateDesign = () => {
  return (
    <>
      {[1, 2, 3, 4].map((d, i) => (
        <div
          key={i}
          className="group w-full rounded-md overflow-hidden bg-gray-300 cursor-pointer"
        >
          <img
            className="h-full w-full rounded-md overflow-hidden"
            src="https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg"
            alt=""
          />
        </div>
      ))}
    </>
  );
};

export default TemplateDesign;
