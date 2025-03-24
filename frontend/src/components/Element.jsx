import React from "react";

const Element = ({ id, info, exId }) => {
  return (
    <>
      {/* Resize Handles - Rounded and Stylish */}
      {exId ? (
        <>
          <div
            onMouseDown={() => info.reSizeElement(exId, info)}
            className="hidden absolute group-hover:block -bottom-[3px] -right-[3px] 
            w-3 h-3 rounded-full bg-green-600 shadow-md hover:bg-green-700 
            transition-all duration-200 cursor-nwse-resize z-[99999]"
          ></div>
          <div
            onMouseDown={() => info.reSizeElement(exId, info)}
            className="hidden absolute group-hover:block -top-[3px] -right-[3px] 
            w-3 h-3 rounded-full bg-green-600 shadow-md hover:bg-green-700 
            transition-all duration-200 cursor-nwse-resize z-[99999]"
          ></div>
          <div
            onMouseDown={() => info.reSizeElement(exId, info)}
            className="hidden absolute group-hover:block -bottom-[3px] -left-[3px] 
            w-3 h-3 rounded-full bg-green-600 shadow-md hover:bg-green-700 
            transition-all duration-200 cursor-nwse-resize z-[99999]"
          ></div>
        </>
      ) : (
        <>
          <div
            onMouseDown={() => info.reSizeElement(id, info)}
            className="hidden absolute group-hover:block -bottom-[3px] -right-[3px] 
            w-3 h-3 rounded-full bg-green-600 shadow-md hover:bg-green-700 
            transition-all duration-200 cursor-nwse-resize z-[99999]"
          ></div>
          <div
            onMouseDown={() => info.reSizeElement(id, info)}
            className="hidden absolute group-hover:block -top-[3px] -right-[3px] 
            w-3 h-3 rounded-full bg-green-600 shadow-md hover:bg-green-700 
            transition-all duration-200 cursor-nwse-resize z-[99999]"
          ></div>
          <div
            onMouseDown={() => info.reSizeElement(id, info)}
            className="hidden absolute group-hover:block -bottom-[3px] -left-[3px] 
            w-3 h-3 rounded-full bg-green-600 shadow-md hover:bg-green-700 
            transition-all duration-200 cursor-nwse-resize z-[99999]"
          ></div>
        </>
      )}

      {/* Rotation Handle - Stylish Circular Design */}
      <div
        onMouseDown={() => info.rotateElement(id, info)}
        className="hidden absolute group-hover:block -top-[3px] -left-[3px] 
        w-3 h-3 rounded-full bg-purple-600 shadow-md hover:bg-purple-700 
        transition-all duration-200 cursor-grab z-[99999]"
      ></div>

      {/* Move Handles - Elegant and Consistent */}
      <div
        onMouseDown={() => info.moveElement(id, info)}
        className="hidden absolute group-hover:block -top-[3px] left-1/2 -translate-x-1/2 
        w-3 h-3 rounded-full bg-blue-600 shadow-md hover:bg-blue-700 
        transition-all duration-200 cursor-move z-[99999]"
      ></div>
      <div
        onMouseDown={() => info.moveElement(id, info)}
        className="hidden absolute group-hover:block top-1/2 -left-[3px] -translate-y-1/2 
        w-3 h-3 rounded-full bg-blue-600 shadow-md hover:bg-blue-700 
        transition-all duration-200 cursor-move z-[99999]"
      ></div>
      <div
        onMouseDown={() => info.moveElement(id, info)}
        className="hidden absolute group-hover:block top-1/2 -right-[3px] -translate-y-1/2 
        w-3 h-3 rounded-full bg-blue-600 shadow-md hover:bg-blue-700 
        transition-all duration-200 cursor-move z-[99999]"
      ></div>
      <div
        onMouseDown={() => info.moveElement(id, info)}
        className="hidden absolute group-hover:block -bottom-[3px] left-1/2 -translate-x-1/2 
        w-3 h-3 rounded-full bg-blue-600 shadow-md hover:bg-blue-700 
        transition-all duration-200 cursor-move z-[99999]"
      ></div>
    </>
  );
};

export default Element;
