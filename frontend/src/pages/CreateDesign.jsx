import React, { useEffect, useRef, useState } from "react";
import * as htmlToImage from "html-to-image";
import CreateStructure from "../components/CreateStructure";
import { useLocation, useNavigate } from "react-router-dom";
import RotateLoader from "react-spinners/RotateLoader";
import api from "../utils/api";

const CreateDesign = () => {
  const { state } = useLocation();
  const ref = useRef();

  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const designObj = {
    name: "main-frame",
    type: "react",
    id: Date.now(),
    width: state.width,
    height: state.height,
    z_index: 1,
    color: "white",
    image: "",
  };

  const createDesign = async () => {
    const image = await htmlToImage.toBlob(ref.current);
    const design = JSON.stringify(designObj);

    if (image) {
      const formData = new FormData();
      formData.append("design", design);
      formData.append("image", image);
      try {
        setLoader(true);
        const { data } = await api.post("/api/create_user_design", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        navigate(`/design/${data.design._id}/edit`);

        setLoader(false);
      } catch (error) {
        setLoader(false);
        console.error("Error creating design:", error);
        toast.error("Error creating design. Please try again.");
      }
    }
  };
  useEffect(() => {
    if (state && ref.current) {
      createDesign();
    } else {
      navigate("/");
    }
  }, [state, ref]);

  return (
    <div className="w-screen h-screen flex justify-center items-center relative">
      <div ref={ref} className="h-auto w-auto relative overflow-auto">
        <CreateStructure info={designObj} currentComponent={{}} />
      </div>
      {loader && (
        <div className="absolute left-0 top-0 h-full w-full flex justify-center items-center bg-black">
          <RotateLoader color="white" />
        </div>
      )}
    </div>
  );
};

export default CreateDesign;
