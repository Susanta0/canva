import React, { useEffect, useState } from "react";
import Images from "./Images";
import api from "../utils/api";

const BackgroundImages = ({ setImage, type }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getUserImages = async () => {
      try {
        const { data } = await api.get("/api/background_images");
        setImages(data.images);
      } catch (error) {
        console.log(error);
        toast.error("Error fetching images. Please try again.");
      }
    };
    getUserImages();
  }, []);

  return <Images setImage={setImage} type={type} images={images} />;
};

export default BackgroundImages;
