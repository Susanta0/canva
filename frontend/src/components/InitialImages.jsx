import React, { useEffect, useState } from "react";
import Images from "./Images";
import api from "../utils/api";

const InitialImages = ({ add_image }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getUserImages = async () => {
      try {
        const { data } = await api.get("/api/design_images");
        setImages(data.images);
      } catch (error) {
        console.log(error);
        toast.error("Error fetching images. Please try again.");
      }
    };
    getUserImages();
  }, []);

  return <Images add_image={add_image} images={images} />;
};

export default InitialImages;
