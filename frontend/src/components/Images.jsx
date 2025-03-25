import React from "react";

const Images = ({ add_image }) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((img, ind) => (
        <div
          onClick={() =>
            add_image(
              "https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg"
            )
          }
          key={ind}
          className="w-full h-[90px] overflow-hidden rounded-sm cursor-pointer"
        >
          <img
            className="h-full w-full object-fill"
            src="https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg"
            alt="image"
          />
        </div>
      ))}
    </div>
  );
};

export default Images;
