import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import CreateStructure from "../components/CreateStructure";

const CreateDesign = () => {
  const { state } = useLocation();
  const ref = useRef();

  const designObj = {
    name: "main-frame",
    type: "react",
    id: Math.floor(Math.random() * 100 + 1),
    width: state.width,
    height: state.height,
    z_index: 1,
    color: "green",
    image: "",
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center relative">
      <div ref={ref} className="h-auto w-auto relative overflow-auto">
        <CreateStructure info={designObj} currentComponent={{}} />
      </div>
    </div>
  );
};

export default CreateDesign;
