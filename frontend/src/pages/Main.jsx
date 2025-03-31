import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import { BsFillImageFill, BsFolder, BsGrid1X2 } from "react-icons/bs";
import { RxTransparencyGrid } from "react-icons/rx";
import { FaCloudUploadAlt, FaShapes } from "react-icons/fa";
import { TfiText } from "react-icons/tfi";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
import TemplateDesign from "../components/TemplateDesign";
import MyImages from "../components/MyImages";
import Projects from "../components/Projects";
import CreateStructure from "../components/CreateStructure";
import { IoSettingsOutline } from "react-icons/io5";
import { MdFormatColorText } from "react-icons/md";
import api from "../utils/api";
import InitialImages from "../components/InitialImages";
import BackgroundImages from "../components/BackgroundImages";

const Main = () => {
  const { design_id } = useParams();

  const [currentComponent, setCurrentComponent] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("design");
  const [showSidepanel, setShowSidepanel] = useState({
    status: true,
    name: "",
  });

  const [color, setColor] = useState("");
  const [image, setImage] = useState("");
  const [rotate, setRotate] = useState(0);
  const [left, setLeft] = useState("");
  const [top, setTop] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [padding, setPadding] = useState("");
  const [font, setFont] = useState("");
  const [weight, setWeight] = useState("");

  const [opacity, setOpacity] = useState("");
  const [zIndex, setZindex] = useState("");
  const [text, setText] = useState("");
  const [radius, setRadius] = useState(0);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const showElement = (name) => {
    setShowSidepanel({
      status: false,
      name,
    });
  };

  // movement element
  const moveElement = (id, currentInfo) => {
    setCurrentComponent(currentInfo);
    let isMove = true;
    const currentDiv = document.getElementById(id);

    const mouseMove = ({ movementX, movementY }) => {
      const getStyle = window.getComputedStyle(currentDiv);
      const left = parseInt(getStyle.left);
      const top = parseInt(getStyle.top);

      if (isMove) {
        currentDiv.style.left = `${left + movementX}px`;
        currentDiv.style.top = `${top + movementY}px`;
      }
    };

    const mouseUp = (e) => {
      isMove = false;
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
      setLeft(parseInt(currentDiv.style.left));
      setTop(parseInt(currentDiv.style.top));
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
  };

  // re-size element
  const reSizeElement = (id, currentInfo) => {
    setCurrentComponent(currentInfo);
    let isMove = true;
    const currentDiv = document.getElementById(id);

    const mouseMove = ({ movementX, movementY }) => {
      const getStyle = window.getComputedStyle(currentDiv);
      const width = parseInt(getStyle.width);
      const height = parseInt(getStyle.height);

      if (isMove) {
        currentDiv.style.width = `${width + movementX}px`;
        currentDiv.style.height = `${height + movementY}px`;
      }
    };

    const mouseUp = (e) => {
      isMove = false;
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);
      setWidth(parseInt(currentDiv.style.width));
      setHeight(parseInt(currentDiv.style.height));
    };

    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
  };

  // rotate element
  const rotateElement = (id, currentInfo) => {
    setCurrentComponent("");
    setCurrentComponent(currentInfo);

    const target = document.getElementById(id);

    const mouseMove = ({ movementX, movementY }) => {
      const getStyle = window.getComputedStyle(target);

      const trans = getStyle.transform;

      const values = trans.split("(")[1].split(")")[0].split(",");

      const angle = Math.round(
        Math.atan2(values[1], values[0]) * (180 / Math.PI)
      );

      let deg = angle < 0 ? angle + 360 : angle;
      if (movementX) {
        deg = deg + movementX;
      }
      target.style.transform = `rotate(${deg}deg)`;
    };

    const mouseUp = (e) => {
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);

      const getStyle = window.getComputedStyle(target);

      const trans = getStyle.transform;

      const values = trans.split("(")[1].split(")")[0].split(",");

      const angle = Math.round(
        Math.atan2(values[1], values[0]) * (180 / Math.PI)
      );

      let deg = angle < 0 ? angle + 360 : angle;
      setRotate(deg);
    };
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", mouseUp);
  };

  // remove component
  const removeComponent = (id) => {
    const tempt = components.filter((c) => c.id !== id);
    setCurrentComponent("");
    setComponents(tempt);
  };

  // remove background
  const removeBackground = () => {
    const come = components.find((c) => c.id === currentComponent.id);
    const tempt = components.filter((c) => c.id !== currentComponent.id);
    come.image = "";
    setImage("");
    setComponents([...tempt, come]);
  };

  // opacity handle
  const opacityHandle = (e) => {
    setOpacity(parseFloat(e.target.value));
  };

  // add text
  const addText = (name, type) => {
    const style = {
      id: Date.now(),
      name: name,
      type: type,
      left: 10,
      top: 10,
      opacity: 1,
      rotate,
      z_index: 10,
      padding: 6,
      font: 32,
      title: "Add text",
      weight: 400,
      color: "#3c3c3d",
      setCurrentComponent: (a) => setCurrentComponent(a),
      rotateElement,
      moveElement,
      reSizeElement,
    };
    setWeight("");
    setFont("");
    setCurrentComponent(style);
    setComponents([...components, style]);
  };

  // create shape
  const createShape = (name, type) => {
    const style = {
      id: Date.now(),
      name: name,
      type: type,
      left: 10,
      top: 10,
      opacity: 1,
      width: 200,
      height: 150,
      rotate,
      z_index: 2,
      color: "#3c3c3d",
      setCurrentComponent: (a) => setCurrentComponent(a),
      rotateElement,
      moveElement,
      reSizeElement,
    };

    setComponents([...components, style]);
  };

  // add image
  const addImage = (img) => {
    const style = {
      id: Date.now(),
      name: "image",
      type: "image",
      left: 10,
      top: 10,
      width: 200,
      height: 150,
      opacity: 1,
      rotate,
      z_index: 2,
      radius: 0,
      image: img,
      setCurrentComponent: (a) => setCurrentComponent(a),
      rotateElement,
      moveElement,
      reSizeElement,
    };
    setCurrentComponent(style);
    setComponents([...components, style]);
  };
  const [components, setComponents] = useState([
    {
      name: "main-frame",
      type: "react",
      id: Math.floor(Math.random() * 100 + 1),
      width: 650,
      height: 450,
      z_index: 1,
      color: "#fff",
      image: "",
      setCurrentComponent: (a) => setCurrentComponent(a),
    },
  ]);

  useEffect(() => {
    if (currentComponent) {
      const index = components.findIndex((c) => c.id === currentComponent.id);
      const tempt = components.filter((c) => c.id !== currentComponent.id);

      if (currentComponent.name === "text") {
        components[index].padding = padding || currentComponent.padding;
        components[index].font = font || currentComponent.font;
        components[index].weight = weight || currentComponent.weight;
        components[index].title = text || currentComponent.title;
      }

      if (currentComponent.name !== "text") {
        components[index].width = width || currentComponent.width;
        components[index].height = height || currentComponent.height;
        components[index].rotate = rotate || currentComponent.rotate;
      }

      if (currentComponent.name === "image") {
        components[index].radius = radius || currentComponent.radius;
      }

      if (currentComponent.name === "main-frame" && image) {
        components[index].image = image || currentComponent.image;
      }
      components[index].color = color || currentComponent.color;

      if (currentComponent.name !== "main-frame") {
        components[index].left = left || currentComponent.left;
        components[index].top = top || currentComponent.top;
        components[index].opacity = opacity || currentComponent.opacity;
        components[index].z_index = zIndex || currentComponent.z_index;
      }

      setComponents([...tempt, components[index]]);

      setColor("");
      setWidth("");
      setHeight("");
      setTop("");
      setLeft("");
      setRotate(0);
      setOpacity("");
      setZindex("");
      setText("");
    }
  }, [
    color,
    image,
    left,
    top,
    width,
    height,
    rotate,
    opacity,
    zIndex,
    padding,
    font,
    weight,
    text,
    radius,
  ]);

  const menuItems = [
    { id: "design", icon: <BsGrid1X2 />, label: "Design" },
    { id: "shape", icon: <FaShapes />, label: "Shapes" },
    { id: "upload", icon: <FaCloudUploadAlt />, label: "Upload" },
    { id: "text", icon: <TfiText />, label: "Text" },
    { id: "projects", icon: <BsFolder />, label: "Project" },
    { id: "image", icon: <BsFillImageFill />, label: "Images" },
    { id: "background", icon: <RxTransparencyGrid />, label: "Background" },
  ];

  useEffect(() => {
    const getDesign = async () => {
      try {
        const { data } = await api.get(`/api/user_design/${design_id}`);
        const { design } = data;
        for (let i = 0; i < design.length; i++) {
          (design[i].setCurrentComponent = (a) => setCurrentComponent(a)),
            (design[i].rotateElement = rotateElement);
          design[i].moveElement = moveElement;
          design[i].reSizeElement = reSizeElement;
          design[i].removeBackground = removeBackground;
        }
        setComponents(design);
      } catch (error) {
        console.log(error);
      }
    };
    getDesign();
  }, [design_id]);

  return (
    <div className="min-w-screen min-h-screen h-screen bg-gradient-to-b from-gray-950 to-black overflow-hidden">
      <Header components={components} design_id={design_id} />
      <div className="flex h-[calc(100%-64px)] w-full relative">
        {/* Sidebar */}
        <div
          className={`${
            sidebarCollapsed ? "w-14 md:w-16" : "w-16 md:w-20 lg:w-24"
          } bg-gradient-to-b from-gray-900 to-black border-r border-gray-800/70 h-full transition-all duration-300 ease-in-out overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent z-20 shadow-lg`}
        >
          {/* Menu Items */}
          <div className="flex flex-col items-center py-3 gap-1">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className={`w-full py-3 md:py-4 cursor-pointer flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
                  activeTab === item.id
                    ? "text-purple-400 bg-purple-900/40 border-l-2 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.3)]"
                    : "text-gray-400 hover:text-gray-100 hover:bg-gray-800/30"
                }`}
                onClick={() => {
                  setActiveTab(item.id);
                  showElement(item.id);
                }}
              >
                <span className="text-lg md:text-xl lg:text-2xl transition-all duration-200 transform hover:scale-110">
                  {item.icon}
                </span>
                {!sidebarCollapsed && (
                  <span className="text-xs font-medium truncate px-1">
                    {item.label}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Toggle button for sidebar */}
        <button
          onClick={toggleSidebar}
          className="absolute left-0 bottom-4 ml-16 md:ml-20 lg:ml-24 bg-purple-900/80 hover:bg-purple-700 text-white rounded-r-md p-1.5 transform transition-all duration-300 ease-in-out z-30 shadow-md hover:shadow-purple-700/50 backdrop-blur-sm"
          style={{
            marginLeft: sidebarCollapsed ? "56px" : "",
          }}
        >
          {sidebarCollapsed ? (
            <HiChevronDoubleRight size={18} className="animate-pulse" />
          ) : (
            <HiChevronDoubleLeft size={18} className="animate-pulse" />
          )}
        </button>

        {/* Side panel area */}
        <div className="h-full w-[calc(100%-75px)]">
          <div
            className={`${
              showSidepanel.status ? "-left-[360px]" : "left-[75px]"
            } bg-gradient-to-r from-gray-900 to-[#252627] h-full fixed transition-all w-[300px] sm:w-[350px] z-30 duration-500 p-6 md:p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 shadow-xl border-r border-gray-800/40`}
          >
            <div
              onClick={() => setShowSidepanel({ name: "", status: true })}
              className="flex absolute justify-center items-center bg-[#252627] w-6 h-16 sm:h-24 -right-0 text-slate-300 hover:text-white top-[40%] cursor-pointer rounded-r-lg shadow-md hover:shadow-purple-900/40 transition-all duration-200 hover:bg-gray-800 border-r border-t border-b border-gray-700/40"
            >
              <MdKeyboardArrowLeft className="text-xl animate-bounce" />
            </div>

            {/* Panel header for each section */}
            <div className="text-purple-400 font-medium text-lg mb-4 border-b border-gray-700/70 pb-2 flex items-center">
              <span className="mr-2">
                {menuItems.find((item) => item.id === activeTab)?.icon}
              </span>
              {menuItems.find((item) => item.id === activeTab)?.label}
            </div>

            {/* design content */}
            {activeTab === "design" && (
              <div>
                <TemplateDesign type="main" />
              </div>
            )}

            {/* shape content */}
            {activeTab === "shape" && (
              <div className="grid grid-cols-3 gap-3">
                <div
                  onClick={() => createShape("shape", "rectangle")}
                  className="h-[90px] bg-gradient-to-br from-purple-900/30 to-gray-800 hover:from-purple-700/40 hover:to-gray-700 cursor-pointer transform transition-all duration-300 hover:scale-105 border border-gray-700/50 hover:border-purple-500/30 shadow-md hover:shadow-purple-900/20"
                ></div>
                <div
                  onClick={() => createShape("shape", "circle")}
                  className="h-[90px] bg-gradient-to-br from-purple-900/30 to-gray-800 hover:from-purple-700/40 hover:to-gray-700 cursor-pointer rounded-full transform transition-all duration-300 hover:scale-105 border border-gray-700/50 hover:border-purple-500/30 shadow-md hover:shadow-purple-900/20"
                ></div>
                <div
                  onClick={() => createShape("shape", "triangle")}
                  style={{ clipPath: "polygon(50% 0,100% 100%,0 100%)" }}
                  className="h-[90px] bg-gradient-to-br from-purple-900/30 to-gray-800 hover:from-purple-700/40 hover:to-gray-700 cursor-pointer transform transition-all duration-300 hover:scale-105 border border-gray-700/50 hover:border-purple-500/30 shadow-md hover:shadow-purple-900/20"
                ></div>

                <div
                  onClick={() => createShape("shape", "pentagon")}
                  style={{
                    clipPath:
                      "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
                  }}
                  className="h-[90px] bg-gradient-to-br from-purple-900/30 to-gray-800 hover:from-purple-700/40 hover:to-gray-700 cursor-pointer transform transition-all duration-300 hover:scale-105 border border-gray-700/50 hover:border-purple-500/30 shadow-md hover:shadow-purple-900/20"
                ></div>
                <div
                  onClick={() => createShape("shape", "house")}
                  style={{
                    clipPath:
                      "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                  }}
                  className="h-[90px] bg-gradient-to-br from-purple-900/30 to-gray-800 hover:from-purple-700/40 hover:to-gray-700 cursor-pointer transform transition-all duration-300 hover:scale-105 border border-gray-700/50 hover:border-purple-500/30 shadow-md hover:shadow-purple-900/20"
                ></div>
                <div
                  onClick={() => createShape("shape", "rounded-rectangle")}
                  style={{
                    clipPath:
                      "polygon(0% 0%, 100% 0%, 100% 75%, 50% 100%, 0% 75%)",
                  }}
                  className="h-[90px] bg-gradient-to-br from-purple-900/30 to-gray-800 hover:from-purple-700/40 hover:to-gray-700 cursor-pointer transform transition-all duration-300 hover:scale-105 border border-gray-700/50 hover:border-purple-500/30 shadow-md hover:shadow-purple-900/20"
                ></div>
                <div
                  onClick={() => createShape("shape", "semi-circle")}
                  className="h-[90px] bg-gradient-to-br from-purple-900/30 to-gray-800 hover:from-purple-700/40 hover:to-gray-700 cursor-pointer rounded-lg transform transition-all duration-300 hover:scale-105 border border-gray-700/50 hover:border-purple-500/30 shadow-md hover:shadow-purple-900/20"
                ></div>
                <div
                  onClick={() =>
                    createShape("shape", "rounded-corner-rectangle")
                  }
                  className="h-[90px] bg-gradient-to-br from-purple-900/30 to-gray-800 hover:from-purple-700/40 hover:to-gray-700 cursor-pointer rounded-t-full transform transition-all duration-300 hover:scale-105 border border-gray-700/50 hover:border-purple-500/30 shadow-md hover:shadow-purple-900/20"
                ></div>
                <div
                  onClick={() => createShape("shape", "diamond")}
                  className="h-[90px] bg-gradient-to-br from-purple-900/30 to-gray-800 hover:from-purple-700/40 hover:to-gray-700 cursor-pointer rounded-br-3xl rounded-tl-3xl transform transition-all duration-300 hover:scale-105 border border-gray-700/50 hover:border-purple-500/30 shadow-md hover:shadow-purple-900/20"
                ></div>
                <div
                  onClick={() => createShape("shape", "quarter-circle")}
                  className="h-[90px] w-[90px] bg-gradient-to-br from-purple-900/30 to-gray-800 hover:from-purple-700/40 hover:to-gray-700 cursor-pointer rounded-tl-full transform transition-all duration-300 hover:scale-105 border border-gray-700/50 hover:border-purple-500/30 shadow-md hover:shadow-purple-900/20"
                ></div>
                <div
                  onClick={() => createShape("shape", "star")}
                  style={{
                    clipPath:
                      "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                  }}
                  className="h-[90px] bg-gradient-to-br from-purple-900/30 to-gray-800 hover:from-purple-700/40 hover:to-gray-700 cursor-pointer transform transition-all duration-300 hover:scale-105 border border-gray-700/50 hover:border-purple-500/30 shadow-md hover:shadow-purple-900/20"
                ></div>
              </div>
            )}

            {/* upload content */}
            {activeTab === "upload" && <MyImages add_image={addImage} />}

            {/* text content */}
            {activeTab === "text" && (
              <div className="w-full">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-1">
                  <div
                    onClick={() => addText("text", "title")}
                    className="bg-gradient-to-r from-purple-700 to-purple-900 hover:from-purple-800 hover:to-purple-950 cursor-pointer font-bold p-4 text-white text-lg md:text-xl rounded-lg transition-all duration-300 shadow-md hover:shadow-purple-700/50 flex items-center gap-3 transform hover:translate-y-[-2px]"
                  >
                    <TfiText className="h-5 w-5 md:h-6 md:w-6" />
                    <h2>Add a Text</h2>
                  </div>
                </div>
              </div>
            )}

            {/* project content */}
            {activeTab === "projects" && (
              <Projects type="main" design_id={design_id} />
            )}

            {/* image content */}
            {activeTab === "image" && (
              <div className="h-[80vh] overflow-x-auto flex justify-start items-start custom-scrollbar">
                <InitialImages add_image={addImage} />
              </div>
            )}

            {/* background content */}
            {activeTab === "background" && (
              <div className="h-[80vh] overflow-x-auto flex justify-start items-start custom-scrollbar">
                <BackgroundImages type="background" setImage={setImage} />
              </div>
            )}
          </div>
          {/* Main canvas area */}
          <div className="w-full h-full flex">
            <div
              className={`flex justify-center items-center relative h-full ${
                !currentComponent ? "w-full" : "w-[calc(100%-250px)]"
              } transition-all duration-300`}
            >
              <div className="flex justify-center items-center overflow-hidden">
                <div className="mx-auto p-4 bg-gray-900/50 rounded-lg shadow-2xl backdrop-blur-sm border border-gray-800/40 transition-all duration-300">
                  <div
                    className="w-auto relative h-auto overflow-hidden"
                    id="main_design"
                  >
                    {components.map((c, i) => (
                      <CreateStructure
                        key={i}
                        info={c}
                        currentComponent={currentComponent}
                        removeComponent={removeComponent}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {currentComponent && (
              <div className="h-full w-[250px] text-gray-300 bg-gradient-to-b from-gray-900 to-[#252627] px-4 py-4 border-l border-gray-800/40 shadow-xl overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600">
                <h3 className="text-purple-400 font-medium text-lg mb-4 border-b border-gray-700/70 pb-2 flex items-center">
                  <IoSettingsOutline className="h-5 w-5 mr-2" />
                  Properties
                </h3>

                <div className="space-y-4">
                  <div className="bg-gray-800/50 p-3 rounded-md border-gray-700/50">
                    <h4 className="font-medium text-purple-300 mb-2">
                      Appearance
                    </h4>
                    <div className="mb-2">
                      <label className="text-xs text-gray-400 block mb-1">
                        Background
                      </label>
                      <div className="flex items-center space-x-2">
                        <label
                          htmlFor="color"
                          className="h-6 w-6 rounded border border-gray-600"
                          style={{
                            backgroundColor: `${
                              currentComponent.color &&
                              currentComponent.color !== "#fff"
                                ? currentComponent.color
                                : "gray"
                            }`,
                          }}
                        ></label>
                        <input
                          type="color"
                          onChange={(e) => setColor(e.target.value)}
                          className="invisible"
                          id="color"
                        />
                      </div>
                    </div>
                  </div>

                  {currentComponent.name === "main-frame" &&
                    currentComponent.image && (
                      <div className="bg-gray-800/50 p-3 rounded-md border-gray-700/50">
                        <h4 className="font-medium text-purple-300 mb-2">
                          Actions
                        </h4>
                        <div className="grid grid-cols-1 gap-2">
                          {/* <button className="bg-purple-600 hover:bg-purple-700 text-white py-1 px-3 rounded text-sm transition duration-200 hover:shadow-md hover:shadow-purple-700/30">
                        Edit
                      </button> */}
                          <button
                            onClick={removeBackground}
                            className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded text-sm transition duration-200 hover:shadow-md hover:shadow-red-700/30"
                          >
                            Remove Background
                          </button>
                        </div>
                      </div>
                    )}

                  {currentComponent.name !== "main-frame" && (
                    <div className="space-y-4">
                      <div className="bg-gray-800/60 p-4 rounded-lg border border-purple-500/20 shadow-lg">
                        <h4 className="text-purple-300 font-semibold mb-3 border-b border-gray-700 pb-2 flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2 text-purple-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.485 8.485M7 17h.01"
                            />
                          </svg>
                          Styling Controls
                        </h4>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-xs text-gray-400 block mb-1">
                              Opacity
                            </label>
                            <div className="flex items-center">
                              <input
                                type="range"
                                min="0.1"
                                max="1"
                                step="0.1"
                                onChange={opacityHandle}
                                value={currentComponent.opacity}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                              />
                              <span className="ml-2 text-xs text-purple-300 w-10">
                                {(currentComponent.opacity * 100).toFixed(0)}%
                              </span>
                            </div>
                          </div>

                          <div>
                            <label className="text-xs text-gray-400 block mb-1">
                              Z-index
                            </label>
                            <div className="flex items-center">
                              <input
                                type="number"
                                step={1}
                                onChange={(e) =>
                                  setZindex(parseInt(e.target.value))
                                }
                                value={currentComponent.z_index}
                                className="w-full bg-gray-700/70 border border-gray-600 rounded py-1 px-2 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                              />
                            </div>
                          </div>
                          {currentComponent.name === "image" && (
                            <div>
                              <label className="text-xs text-gray-400 block mb-1">
                                Radius
                              </label>
                              <div className="flex items-center">
                                <input
                                  type="number"
                                  step={1}
                                  onChange={(e) =>
                                    setRadius(parseInt(e.target.value))
                                  }
                                  value={currentComponent.radius}
                                  className="w-full bg-gray-700/70 border border-gray-600 rounded py-1 px-2 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                                />
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {currentComponent.name === "text" && (
                        <div className="bg-gray-800/60 p-4 rounded-lg border border-purple-500/20 shadow-lg">
                          <h4 className="text-purple-300 font-semibold mb-3 border-b border-gray-700 pb-2 flex items-center">
                            <MdFormatColorText className="h-5 w-5 mr-2 text-purple-400" />
                            Text Formatting
                          </h4>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-xs text-gray-400 block mb-1">
                                Padding
                              </label>
                              <input
                                type="number"
                                step={1}
                                onChange={(e) =>
                                  setPadding(parseInt(e.target.value))
                                }
                                value={currentComponent.padding}
                                className="w-full bg-gray-700/70 border border-gray-600 rounded py-1 px-2 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                              />
                            </div>

                            <div>
                              <label className="text-xs text-gray-400 block mb-1">
                                Font Size
                              </label>
                              <input
                                type="number"
                                step={1}
                                onChange={(e) =>
                                  setFont(parseInt(e.target.value))
                                }
                                value={currentComponent.font}
                                className="w-full bg-gray-700/70 border border-gray-600 rounded py-1 px-2 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                              />
                            </div>
                          </div>

                          <div className="mt-3">
                            <label className="text-xs text-gray-400 block mb-1">
                              Font Weight
                            </label>
                            <input
                              type="range"
                              min="100"
                              max="900"
                              step="100"
                              onChange={(e) =>
                                setWeight(parseInt(e.target.value))
                              }
                              value={currentComponent.weight}
                              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-500"
                            />
                            <div className="flex justify-between text-xs text-gray-400 mt-1">
                              <span>Thin</span>
                              <span>Bold</span>
                            </div>
                          </div>

                          <div className="mt-3">
                            <label className="text-xs text-gray-400 block mb-1">
                              Text Content
                            </label>
                            <div className="flex">
                              <input
                                type="text"
                                onChange={(e) =>
                                  setCurrentComponent({
                                    ...currentComponent,
                                    title: e.target.value,
                                  })
                                }
                                value={currentComponent.title}
                                className="w-full bg-gray-700/70 border border-gray-600 rounded py-1 px-2 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                                placeholder="Enter your text"
                              />
                              <button
                                onClick={() => setText(currentComponent.title)}
                                className="ml-2 bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm transition-colors duration-200"
                              >
                                Add
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
