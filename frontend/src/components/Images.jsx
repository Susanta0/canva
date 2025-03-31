import React from "react";

const Images = ({ add_image, images, setImage, type }) => {
  return (
    <div className="grid grid-cols-4 gap-2">
      {images.map((img, ind) => (
        <div
          onClick={() =>
            type === "background"
              ? setImage(img.image_url)
              : add_image(img.image_url)
          }
          key={ind}
          className="w-[50px] h-[50px] overflow-hidden rounded-sm cursor-pointer"
        >
          <img
            className="h-full w-full object-fill"
            src={img.image_url}
            alt="image"
          />
        </div>
      ))}
    </div>
  );
};

export default Images;
