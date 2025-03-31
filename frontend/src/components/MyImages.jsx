import React, { useEffect, useState } from "react";
import Images from "./Images";
import api from "../utils/api";
import BarLoader from "react-spinners/BarLoader";
import toast from "react-hot-toast";

const MyImages = ({ add_image }) => {
  const [loader, setLoader] = useState(false);
  const [images, setImages] = useState([]);

  const imageUpload = async (e) => {
    if (e.target.files.length > 0) {
      const formData = new FormData();
      formData.append("image", e.target.files[0]);

      try {
        setLoader(true);
        const { data } = await api.post("/api/add_user_image", formData);
        setImages([...images, data.userAddImage]);
        setLoader(false);
      } catch (error) {
        setLoader(false);
        toast.error("Error uploading image. Please try again.");
      }
    }
  };

  useEffect(() => {
    const getUserImages = async () => {
      try {
        setLoader(true);
        const { data } = await api.get("/api/get_user_image");
        setImages(data.images);

        setLoader(false);
      } catch (error) {
        setLoader(false);
        console.log(error);
        toast.error("Error fetching images. Please try again.");
      }
    };
    getUserImages();
  }, []);

  return (
    <div>
      <div className="w-full h-[40px] flex justify-center items-center bg-purple-500 rounded-sm text-white mb-3">
        <label className="text-center curson-pointer" htmlFor="image">
          Upload Image
        </label>
        <input
          readOnly={loader}
          onChange={imageUpload}
          type="file"
          id="image"
          className="hidden"
        />
      </div>

      <BarLoader
        color={"#4B5563"}
        loading={loader}
        cssOverride={{
          width: "100%",
          height: "5px",
          borderRadius: "10px",
          marginBottom: "10px",
        }}
      />
      <div className="h-[70vh] overflow-x-auto flex justify-start items-start custom-scrollbar">
        <Images add_image={add_image} images={images} />
      </div>
    </div>
  );
};

export default MyImages;
