import React, { useEffect, useState } from "react";
import api from "../utils/api";
import HomeItems from "./Home/HomeItems";
import toast from "react-hot-toast";

const Projects = ({ type, design_id }) => {
  const [designImages, setDesignImages] = useState([]);

  const getUserDesign = async () => {
    try {
      const { data } = await api.get("/api/user_design");
      setDesignImages(data.designs);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserDesign();
  }, []);

  const deleteDesign = async (design_id) => {
    try {
      const { data } = await api.delete(`/api/delete_user_image/${design_id}`);
      toast.success("Design deleted successfully.");
      getUserDesign();
    } catch (error) {
      console.log(error);
      toast.error("Error deleting design. Please try again.");
    }
  };

  return (
    <div className="h-[80vh] overflow-x-auto flex justify-start items-start custom-scrollbar">
      <div
        className={`grid gap-2 w-full ${type ? "grid-cols-1" : "grid-cols-4"}`}
      >
        {designImages.map(
          (img, ind) =>
            img._id !== design_id && (
              <HomeItems
                design={img}
                key={ind}
                type={type}
                deleteDesign={deleteDesign}
              />
            )
        )}
      </div>
    </div>
  );
};

export default Projects;
