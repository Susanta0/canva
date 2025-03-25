import React from "react";
import { BsTrash } from "react-icons/bs";
import Element from "./Element";

const CreateStructure = ({ info, currentComponent, removeComponent }) => {
  const randomValue = Math.floor(Math.random() * 100);
  let html = "";
  // main frame
  if (info.name === "main-frame") {
    html = (
      <div
        onClick={() => info.setCurrentComponent(info)}
        className={` hover:border-indigo-500 shadow-md rounded-md transition-all duration-300 ${
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

  // ractangle shape
  if (info.name === "shape" && info.type === "rectangle") {
    html = (
      <div
        id={randomValue}
        onClick={() => info.setCurrentComponent(info)}
        style={{
          width: info.width + "px",
          height: info.height + "px",
          background: info.color,
          opacity: info.opacity,
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : `rotate(0deg)`,
        }}
        className="absolute group hover:border hover:border-indigo-500"
      >
        <Element id={randomValue} info={info} exId="" />
        {currentComponent.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className=" px-1 py-1 bg-white absolute top-0 hidden group-hover:block cursor-pointer rounded-full"
          >
            <BsTrash />
          </div>
        )}
      </div>
    );
  }

  // circle shape
  if (info.name === "shape" && info.type === "circle") {
    html = (
      <div
        id={randomValue}
        onClick={() => info.setCurrentComponent(info)}
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : `rotate(0deg)`,
        }}
        className="absolute group hover:border hover:border-indigo-500"
      >
        <Element id={randomValue} info={info} exId={`${randomValue}c`} />
        <div
          id={`${randomValue}c`}
          className="rounded-full"
          style={{
            width: info.width + "px",
            height: info.width + "px",
            background: info.color,
            opacity: info.opacity,
          }}
        ></div>
        {currentComponent.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className=" px-1 py-1 bg-white absolute top-0 hidden group-hover:block cursor-pointer rounded-full"
          >
            <BsTrash />
          </div>
        )}
      </div>
    );
  }

  // triangle shape
  if (info.name === "shape" && info.type === "triangle") {
    html = (
      <div
        id={randomValue}
        onClick={() => info.setCurrentComponent(info)}
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : `rotate(0deg)`,
        }}
        className="absolute group hover:border hover:border-indigo-500"
      >
        <Element id={randomValue} info={info} exId={`${randomValue}t`} />
        <div
          id={`${randomValue}t`}
          style={{
            width: info.width + "px",
            height: info.height + "px",
            background: info.color,
            opacity: info.opacity,
            clipPath: "polygon(50% 0,100% 100%,0 100%)",
          }}
        ></div>
        {currentComponent.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className=" px-1 py-1 bg-white absolute top-0 hidden group-hover:block cursor-pointer rounded-full"
          >
            <BsTrash />
          </div>
        )}
      </div>
    );
  }

  // pentagon shape
  if (info.name === "shape" && info.type === "pentagon") {
    html = (
      <div
        id={randomValue}
        onClick={() => info.setCurrentComponent(info)}
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : `rotate(0deg)`,
        }}
        className="absolute group hover:border hover:border-indigo-500"
      >
        <Element id={randomValue} info={info} exId={`${randomValue}p`} />
        <div
          id={`${randomValue}p`}
          style={{
            width: info.width + "px",
            height: info.width + "px",
            background: info.color,
            opacity: info.opacity,
            clipPath: "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
          }}
        ></div>
        {currentComponent.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className=" px-1 py-1 bg-white absolute top-0 hidden group-hover:block cursor-pointer rounded-full"
          >
            <BsTrash />
          </div>
        )}
      </div>
    );
  }

  // house shape
  if (info.name === "shape" && info.type === "house") {
    html = (
      <div
        id={randomValue}
        onClick={() => info.setCurrentComponent(info)}
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : `rotate(0deg)`,
        }}
        className="absolute group hover:border hover:border-indigo-500"
      >
        <Element id={randomValue} info={info} exId={`${randomValue}h`} />
        <div
          id={`${randomValue}h`}
          style={{
            width: info.width + "px",
            height: info.width + "px",
            background: info.color,
            opacity: info.opacity,
            clipPath:
              "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
          }}
        ></div>
        {currentComponent.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className=" px-1 py-1 bg-white absolute top-0 hidden group-hover:block cursor-pointer rounded-full"
          >
            <BsTrash />
          </div>
        )}
      </div>
    );
  }

  // rounded-rectangle shape
  if (info.name === "shape" && info.type === "rounded-rectangle") {
    html = (
      <div
        id={randomValue}
        onClick={() => info.setCurrentComponent(info)}
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : `rotate(0deg)`,
        }}
        className="absolute group hover:border hover:border-indigo-500"
      >
        <Element id={randomValue} info={info} exId={`${randomValue}r`} />
        <div
          id={`${randomValue}r`}
          style={{
            width: info.width + "px",
            height: info.width + "px",
            background: info.color,
            opacity: info.opacity,
            clipPath: "polygon(0% 0%, 100% 0%, 100% 75%, 50% 100%, 0% 75%)",
          }}
        ></div>
        {currentComponent.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className=" px-1 py-1 bg-white absolute top-0 hidden group-hover:block cursor-pointer rounded-full"
          >
            <BsTrash />
          </div>
        )}
      </div>
    );
  }

  // semi-circle shape
  if (info.name === "shape" && info.type === "semi-circle") {
    html = (
      <div
        id={randomValue}
        onClick={() => info.setCurrentComponent(info)}
        style={{
          width: info.width + "px",
          height: info.height + "px",
          background: info.color,
          opacity: info.opacity,
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : `rotate(0deg)`,
        }}
        className="absolute group hover:border hover:border-indigo-500"
      >
        <Element id={randomValue} info={info} exId="" />

        {currentComponent.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className=" px-1 py-1 bg-white absolute top-0 hidden group-hover:block cursor-pointer rounded-full"
          >
            <BsTrash />
          </div>
        )}
      </div>
    );
  }

  // rounded-corner-rectangle shape
  if (info.name === "shape" && info.type === "rounded-corner-rectangle") {
    html = (
      <div
        id={randomValue}
        onClick={() => info.setCurrentComponent(info)}
        style={{
          width: info.height + "px",
          height: info.height + "px",
          background: info.color,
          opacity: info.opacity,
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : `rotate(0deg)`,
        }}
        className="absolute group hover:border hover:border-indigo-500 rounded-t-full"
      >
        <Element id={randomValue} info={info} exId="" />
        {currentComponent.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className=" px-1 py-1 bg-white absolute top-0 hidden group-hover:block cursor-pointer rounded-full"
          >
            <BsTrash />
          </div>
        )}
      </div>
    );
  }

  // diamond shape
  if (info.name === "shape" && info.type === "diamond") {
    html = (
      <div
        id={randomValue}
        onClick={() => info.setCurrentComponent(info)}
        style={{
          width: info.height + "px",
          height: info.height + "px",
          background: info.color,
          opacity: info.opacity,
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : `rotate(0deg)`,
        }}
        className="absolute group hover:border hover:border-indigo-500 rounded-tl-4xl rounded-br-4xl"
      >
        <Element id={randomValue} info={info} exId="" />

        {currentComponent.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className=" px-1 py-1 bg-white absolute top-0 hidden group-hover:block cursor-pointer rounded-full"
          >
            <BsTrash />
          </div>
        )}
      </div>
    );
  }

  // quarter-circle shape
  if (info.name === "shape" && info.type === "quarter-circle") {
    html = (
      <div
        id={randomValue}
        onClick={() => info.setCurrentComponent(info)}
        style={{
          width: info.height + "px",
          height: info.height + "px",
          background: info.color,
          opacity: info.opacity,
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : `rotate(0deg)`,
        }}
        className="absolute group hover:border hover:border-indigo-500 rounded-tl-full"
      >
        <Element id={randomValue} info={info} exId="" />

        {currentComponent.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className=" px-1 py-1 bg-white absolute top-0 hidden group-hover:block cursor-pointer rounded-full"
          >
            <BsTrash />
          </div>
        )}
      </div>
    );
  }

  //  quarter-circle shape
  if (info.name === "shape" && info.type === "star") {
    html = (
      <div
        id={randomValue}
        onClick={() => info.setCurrentComponent(info)}
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : `rotate(0deg)`,
        }}
        className="absolute group hover:border hover:border-indigo-500"
      >
        <Element id={randomValue} info={info} exId={`${randomValue}s`} />
        <div
          id={`${randomValue}s`}
          style={{
            width: info.height + "px",
            height: info.height + "px",
            background: info.color,
            opacity: info.opacity,
            clipPath:
              "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
          }}
        ></div>
        {currentComponent.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className=" px-1 py-1 bg-white absolute top-0 hidden group-hover:block cursor-pointer rounded-full"
          >
            <BsTrash />
          </div>
        )}
      </div>
    );
  }

  // add text
  if (info.name === "text") {
    html = (
      <div
        id={randomValue}
        onClick={() => info.setCurrentComponent(info)}
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : `rotate(0deg)`,
          padding: info.padding + "px",
          color: info.color,
          opacity: info.opacity,
        }}
        className="absolute group hover:border hover:border-indigo-500"
      >
        <Element id={randomValue} info={info} exId="" />
        <h2
          style={{ fontSize: info.font + "px", fontWeight: info.weight }}
          className="w-full h-full "
        >
          {info.title}
        </h2>
        {currentComponent.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className=" px-1 py-1 bg-white absolute top-0 hidden group-hover:block cursor-pointer rounded-full"
          >
            <BsTrash />
          </div>
        )}
      </div>
    );
  }

  // add image
  if (info.name === "image") {
    html = (
      <div
        id={randomValue}
        onClick={() => info.setCurrentComponent(info)}
        style={{
          left: info.left + "px",
          top: info.top + "px",
          zIndex: info.z_index,
          transform: info.rotate ? `rotate(${info.rotate}deg)` : `rotate(0deg)`,
          opacity: info.opacity,
        }}
        className="absolute group hover:border hover:border-indigo-500"
      >
        <Element id={randomValue} info={info} exId={`${randomValue}img`} />
        <div
          className="overflow-hidden"
          id={`${randomValue}img`}
          style={{
            width: info.width + "px",
            height: info.height + "px",
            borderRadius: `${info.radius}%`,
          }}
        >
          <img className="w-full h-full" src={info.image} alt="image" />
        </div>
        <h2
          style={{ fontSize: info.font + "px", fontWeight: info.weight }}
          className="w-full h-full "
        >
          {info.title}
        </h2>
        {currentComponent.id === info.id && (
          <div
            onClick={() => removeComponent(info.id)}
            className=" px-1 py-1 bg-white absolute top-0 hidden group-hover:block cursor-pointer rounded-full"
          >
            <BsTrash />
          </div>
        )}
      </div>
    );
  }
  return html;
};

export default CreateStructure;
