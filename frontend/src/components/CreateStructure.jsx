// import React from "react";

// const CreateStructure = ({ info, currentComponent, removeComponent }) => {
//   const randomValue = Math.floor(Math.random() * 100);
//   let html = "";
//   if (info.name === "main-frame") {
//     html = (
//       <div
//         onClick={() => info.setCurrentComponent(info)}
//         className="hover:border-[2px] hover:border-indigo-500 shadow-md"
//         style={{
//           width: info.width + "px",
//           height: info.height + "px",
//           background: info.color,
//           zIndex: info.z_index,
//         }}
//       >
//         {info.image && (
//           <img className="w-full h-full" src={info.image} alt="image" />
//         )}
//       </div>
//     );
//   }
//   return html;
// };

// export default CreateStructure;

import React from "react";

const CreateStructure = ({ info, currentComponent, removeComponent }) => {
  const randomValue = Math.floor(Math.random() * 100);
  let html = "";
  if (info.name === "main-frame") {
    html = (
      <div
        onClick={() => info.setCurrentComponent(info)}
        className={`hover:border-[2px] hover:border-indigo-500 shadow-md rounded-md transition-all duration-300 ${
          currentComponent && currentComponent.id === info.id
            ? "ring-2 ring-purple-500 ring-offset-2 ring-offset-gray-900"
            : "hover:shadow-lg hover:shadow-purple-500/20"
        }`}
        style={{
          width: info.width + "px",
          height: info.height + "px",
          background: info.color,
          zIndex: info.z_index,
        }}
      >
        {info.image && (
          <img
            className="w-full h-full object-cover rounded-md"
            src={info.image}
            alt="image"
          />
        )}
        {!info.image && !currentComponent && (
          <div className="absolute inset-0 flex items-center justify-center text-white/50 text-sm font-medium">
            Click to select frame
          </div>
        )}
      </div>
    );
  }
  return html;
};

export default CreateStructure;
