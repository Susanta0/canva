// import React, { useState } from "react";
// import Header from "../components/Header";
// import { BsFillImageFill, BsFolder, BsGrid1X2 } from "react-icons/bs";
// import { RxTransparencyGrid } from "react-icons/rx";
// import { FaCloudUploadAlt, FaShapes } from "react-icons/fa";
// import { TfiText } from "react-icons/tfi";
// import { MdKeyboardArrowLeft } from "react-icons/md";
// import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
// import TemplateDesign from "../components/TemplateDesign";
// import MyImages from "../components/MyImages";
// import Projects from "../components/Projects";
// import Images from "../components/Images";
// import CreateStructure from "../components/CreateStructure";

// const Main = () => {
//   const [currentComponent, setCurrentComponent] = useState("");

//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [activeTab, setActiveTab] = useState("design");
//   const [showSidepanel, setShowSidepanel] = useState({
//     status: true,
//     name: "",
//   });

//   const toggleSidebar = () => {
//     setSidebarCollapsed(!sidebarCollapsed);
//   };

//   const showElement = (name) => {
//     setShowSidepanel({
//       status: false,
//       name,
//     });
//   };

//   // movement element
//   const moveElement = () => {};
//   // re-size element
//   const reSizeElement = () => {};
//   // rotate element
//   const rotateElement = () => {};

//   // remove component
//   const removeComponent = () => {};

//   const [components, setComponents] = useState([
//     {
//       name: "main-frame",
//       type: "react",
//       id: Math.floor(Math.random() * 100 + 1),
//       width: 650,
//       height: 450,
//       z_index: 1,
//       color: "green",
//       image: "",
//       setCurrentComponent: (a) => setCurrentComponent(a),
//     },
//   ]);

//   console.log(currentComponent);

//   const menuItems = [
//     { id: "design", icon: <BsGrid1X2 />, label: "Design" },
//     { id: "shape", icon: <FaShapes />, label: "Shapes" },
//     { id: "upload", icon: <FaCloudUploadAlt />, label: "Upload" },
//     { id: "text", icon: <TfiText />, label: "Text" },
//     { id: "projects", icon: <BsFolder />, label: "Project" },
//     { id: "image", icon: <BsFillImageFill />, label: "Images" },
//     { id: "background", icon: <RxTransparencyGrid />, label: "Background" },
//   ];

//   return (
//     <div className="min-w-screen min-h-screen h-screen bg-gradient-to-b from-gray-950 to-black overflow-hidden">
//       <Header />
//       <div className="flex h-[calc(100%-64px)] w-full relative">
//         {/* Sidebar */}
//         <div
//           className={`${
//             sidebarCollapsed ? "w-14 md:w-16" : "w-16 md:w-20 lg:w-24"
//           } bg-gradient-to-b from-gray-900 to-black border-r border-gray-800/70 h-full transition-all duration-300 ease-in-out overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent z-20 shadow-lg`}
//         >
//           {/* Menu Items */}
//           <div className="flex flex-col items-center py-3 gap-1">
//             {menuItems.map((item) => (
//               <div
//                 key={item.id}
//                 className={`w-full py-3 md:py-4 cursor-pointer flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
//                   activeTab === item.id
//                     ? "text-purple-400 bg-purple-900/30 border-l-2 border-purple-500"
//                     : "text-gray-400 hover:text-gray-100 hover:bg-gray-800/30"
//                 }`}
//                 onClick={() => {
//                   setActiveTab(item.id);
//                   showElement(item.id);
//                 }}
//               >
//                 <span className="text-lg md:text-xl lg:text-2xl transition-all duration-200 transform hover:scale-110">
//                   {item.icon}
//                 </span>
//                 {!sidebarCollapsed && (
//                   <span className="text-xs font-medium truncate px-1">
//                     {item.label}
//                   </span>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Toggle button for sidebar */}
//         <button
//           onClick={toggleSidebar}
//           className="absolute left-0 bottom-4 ml-16 md:ml-20 lg:ml-24 bg-purple-900/80 hover:bg-purple-700 text-white rounded-r-md p-1.5 transform transition-all duration-300 ease-in-out z-30 shadow-md hover:shadow-purple-700/30"
//           style={{
//             marginLeft: sidebarCollapsed ? "56px" : "",
//           }}
//         >
//           {sidebarCollapsed ? (
//             <HiChevronDoubleRight size={18} />
//           ) : (
//             <HiChevronDoubleLeft size={18} />
//           )}
//         </button>

//         {/* Side panel area */}
//         <div className="h-full w-[calc(100%-75px)]">
//           <div
//             className={`${
//               showSidepanel.status ? "-left-[360px]" : "left-[75px]"
//             } bg-gradient-to-r from-gray-900 to-[#252627] h-full fixed transition-all w-[300px] sm:w-[350px] z-30 duration-500 p-6 md:p-8  scrollbar-thin scrollbar-thumb-gray-600 shadow-lg`}
//           >
//             <div
//               onClick={() => setShowSidepanel({ name: "", status: true })}
//               className="flex absolute justify-center items-center bg-[#252627] w-6 h-16 sm:h-24 -right-0 text-slate-300 hover:text-white top-[40%] cursor-pointer rounded-r-lg shadow-md hover:shadow-purple-900/30 transition-all duration-200 hover:bg-gray-800"
//             >
//               <MdKeyboardArrowLeft className="text-xl" />
//             </div>

//             {/* Panel header for each section */}
//             <div className="text-purple-400 font-medium text-lg mb-4 border-b border-gray-700 pb-2">
//               {menuItems.find((item) => item.id === activeTab)?.label}
//             </div>

//             {/* Tab content */}
//             {activeTab === "design" && (
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 <TemplateDesign />
//               </div>
//             )}
//             {activeTab === "shape" && (
//               <div className="grid grid-cols-3 gap-3">
//                 <div className="h-[90px] bg-[#3c3c3d] cursor-pointer"></div>
//                 <div className="h-[90px] bg-[#3c3c3d] cursor-pointer rounded-full"></div>
//                 <div
//                   style={{ clipPath: "polygon(50% 0,100% 100%,0 100%)" }}
//                   className="h-[90px] bg-[#3c3c3d] cursor-pointer"
//                 ></div>

//                 <div
//                   style={{
//                     clipPath:
//                       "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
//                   }}
//                   className="h-[90px] bg-[#3c3c3d] cursor-pointer"
//                 ></div>
//                 <div
//                   style={{
//                     clipPath:
//                       "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
//                   }}
//                   className="h-[90px] bg-[#3c3c3d] cursor-pointer"
//                 ></div>
//                 <div
//                   style={{
//                     clipPath:
//                       "polygon(0% 0%, 100% 0%, 100% 75%, 50% 100%, 0% 75%)",
//                   }}
//                   className="h-[90px] bg-[#3c3c3d] cursor-pointer"
//                 ></div>
//                 <div className="h-[90px] bg-[#3c3c3d] cursor-pointer rounded-lg"></div>
//                 <div className="h-[90px] bg-[#3c3c3d] cursor-pointer rounded-t-full"></div>
//                 <div className="h-[90px] bg-[#3c3c3d] cursor-pointer rounded-br-3xl rounded-tl-3xl"></div>
//                 <div className="h-[90px] bg-[#3c3c3d] cursor-pointer rotate-45"></div>
//                 <div className="h-[90px] w-[90px] bg-[#3c3c3d] cursor-pointer rounded-tl-full"></div>
//                 <div
//                   style={{
//                     clipPath:
//                       "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
//                   }}
//                   className="h-[90px] bg-[#3c3c3d] cursor-pointer"
//                 ></div>
//               </div>
//             )}
//             {activeTab === "upload" && <MyImages />}
//             {activeTab === "text" && (
//               <div className="w-full">
//                 <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-1">
//                   <div className="bg-gradient-to-r from-purple-700 to-purple-900 hover:from-purple-800 hover:to-purple-950 cursor-pointer font-bold p-4 text-white text-lg md:text-xl rounded transition-all duration-300 shadow-md hover:shadow-purple-700/30 flex items-center gap-3">
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5 md:h-6 md:w-6"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M3 10h18M7 15h10M12 3v18"
//                       />
//                     </svg>
//                     <h2>Add a Text</h2>
//                   </div>
//                 </div>
//               </div>
//             )}
//             {activeTab === "projects" && <Projects />}
//             {activeTab === "image" && (
//               <div className="h-[88vh] overflow-x-auto flex justify-start items-start custom-scrollbar">
//                 <Images />
//               </div>
//             )}
//             {activeTab === "background" && (
//               <div className="h-[88vh] overflow-x-auto flex justify-start items-start custom-scrollbar">
//                 <div className="grid grid-cols-2 gap-2">
//                   {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
//                     (img, ind) => (
//                       <div
//                         key={ind}
//                         className="w-full h-[90px] overflow-hidden rounded-sm cursor-pointer"
//                       >
//                         <img
//                           className="h-full w-full object-fill"
//                           src="https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg"
//                           alt="image"
//                         />
//                       </div>
//                     )
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//           {/* Main canvas area */}
//           <div className="w-full h-full flex">
//             <div
//               className={`flex justify-center items-center relative h-full ${
//                 !currentComponent
//                   ? "w-full"
//                   : "w-[calc(100%-250px)] overflow-hidden"
//               }`}
//             >
//               <div className="m-w-[650px] m-h-[480px] flex justify-center items-center overflow-hidden">
//                 <div
//                   className="w-auto relative h-auto overflow-hidden"
//                   id="main_design"
//                 >
//                   {components.map((c, i) => (
//                     <CreateStructure
//                       key={i}
//                       info={c}
//                       currentComponent={currentComponent}
//                       removeComponent={removeComponent}
//                     />
//                   ))}
//                 </div>
//               </div>
//             </div>
//             {currentComponent && (
//               <div className="h-full w-[250px] text-gray-300 bg-[#252627] px-3 py-2">
//                 hghgh
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Main;

// import React, { useState } from "react";
// import Header from "../components/Header";
// import { BsFillImageFill, BsFolder, BsGrid1X2 } from "react-icons/bs";
// import { RxTransparencyGrid } from "react-icons/rx";
// import { FaCloudUploadAlt, FaShapes } from "react-icons/fa";
// import { TfiText } from "react-icons/tfi";
// import { MdKeyboardArrowLeft } from "react-icons/md";
// import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";
// import TemplateDesign from "../components/TemplateDesign";
// import MyImages from "../components/MyImages";
// import Projects from "../components/Projects";
// import Images from "../components/Images";
// import CreateStructure from "../components/CreateStructure";

// const Main = () => {
//   const [currentComponent, setCurrentComponent] = useState("");

//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [activeTab, setActiveTab] = useState("design");
//   const [showSidepanel, setShowSidepanel] = useState({
//     status: true,
//     name: "",
//   });

//   const toggleSidebar = () => {
//     setSidebarCollapsed(!sidebarCollapsed);
//   };

//   const showElement = (name) => {
//     setShowSidepanel({
//       status: false,
//       name,
//     });
//   };

//   // movement element
//   const moveElement = () => {};
//   // re-size element
//   const reSizeElement = () => {};
//   // rotate element
//   const rotateElement = () => {};

//   // remove component
//   const removeComponent = () => {};

//   const [components, setComponents] = useState([
//     {
//       name: "main-frame",
//       type: "react",
//       id: Math.floor(Math.random() * 100 + 1),
//       width: 650,
//       height: 450,
//       z_index: 1,
//       color: "green",
//       image: "",
//       setCurrentComponent: (a) => setCurrentComponent(a),
//     },
//   ]);

//   console.log(currentComponent);

//   const menuItems = [
//     { id: "design", icon: <BsGrid1X2 />, label: "Design" },
//     { id: "shape", icon: <FaShapes />, label: "Shapes" },
//     { id: "upload", icon: <FaCloudUploadAlt />, label: "Upload" },
//     { id: "text", icon: <TfiText />, label: "Text" },
//     { id: "projects", icon: <BsFolder />, label: "Project" },
//     { id: "image", icon: <BsFillImageFill />, label: "Images" },
//     { id: "background", icon: <RxTransparencyGrid />, label: "Background" },
//   ];

//   return (
//     <div className="min-w-screen min-h-screen h-screen bg-gradient-to-b from-gray-950 to-black overflow-hidden">
//       <Header />
//       <div className="flex h-[calc(100%-64px)] w-full relative">
//         {/* Sidebar */}
//         <div
//           className={`${
//             sidebarCollapsed ? "w-14 md:w-16" : "w-16 md:w-20 lg:w-24"
//           } bg-gradient-to-b from-gray-900 to-black border-r border-gray-800/70 h-full transition-all duration-300 ease-in-out overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent z-20 shadow-lg`}
//         >
//           {/* Menu Items */}
//           <div className="flex flex-col items-center py-3 gap-1">
//             {menuItems.map((item) => (
//               <div
//                 key={item.id}
//                 className={`w-full py-3 md:py-4 cursor-pointer flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
//                   activeTab === item.id
//                     ? "text-purple-400 bg-purple-900/30 border-l-2 border-purple-500" // CHANGED: Enhanced active tab styling
//                     : "text-gray-400 hover:text-gray-100 hover:bg-gray-800/30"
//                 }`}
//                 onClick={() => {
//                   setActiveTab(item.id);
//                   showElement(item.id);
//                 }}
//               >
//                 <span className="text-lg md:text-xl lg:text-2xl transition-all duration-200 transform hover:scale-110">
//                   {item.icon}
//                 </span>
//                 {!sidebarCollapsed && (
//                   <span className="text-xs font-medium truncate px-1">
//                     {item.label}
//                   </span>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Toggle button for sidebar */}
//         <button
//           onClick={toggleSidebar}
//           className="absolute left-0 bottom-4 ml-16 md:ml-20 lg:ml-24 bg-purple-900/80 hover:bg-purple-700 text-white rounded-r-md p-1.5 transform transition-all duration-300 ease-in-out z-30 shadow-md hover:shadow-purple-700/30" // CHANGED: Added hover effects
//           style={{
//             marginLeft: sidebarCollapsed ? "56px" : "",
//           }}
//         >
//           {sidebarCollapsed ? (
//             <HiChevronDoubleRight size={18} />
//           ) : (
//             <HiChevronDoubleLeft size={18} />
//           )}
//         </button>

//         {/* Side panel area */}
//         <div className="h-full w-[calc(100%-75px)]">
//           <div
//             className={`${
//               showSidepanel.status ? "-left-[360px]" : "left-[75px]"
//             } bg-gradient-to-r from-gray-900 to-[#252627] h-full fixed transition-all w-[300px] sm:w-[350px] z-30 duration-500 p-6 md:p-8 scrollbar-thin scrollbar-thumb-gray-600 shadow-lg`} // CHANGED: Improved panel styling
//           >
//             <div
//               onClick={() => setShowSidepanel({ name: "", status: true })}
//               className="flex absolute justify-center items-center bg-[#252627] w-6 h-16 sm:h-24 -right-0 text-slate-300 hover:text-white top-[40%] cursor-pointer rounded-r-lg shadow-md hover:shadow-purple-900/30 transition-all duration-200 hover:bg-gray-800" // CHANGED: Enhanced hover effects
//             >
//               <MdKeyboardArrowLeft className="text-xl" />
//             </div>

//             {/* Panel header for each section */}
//             <div className="text-purple-400 font-medium text-lg mb-4 border-b border-gray-700 pb-2">
//               {menuItems.find((item) => item.id === activeTab)?.label}
//             </div>

//             {/* Tab content */}
//             {activeTab === "design" && (
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                 <TemplateDesign />
//               </div>
//             )}
//             {activeTab === "shape" && (
//               <div className="grid grid-cols-3 gap-3">
//                 {/* CHANGED: Added styling to all shapes with hover effects */}
//                 <div className="h-[90px] bg-[#3c3c3d] cursor-pointer hover:bg-[#4c4c4d] transition-all duration-200 hover:shadow-md"></div>
//                 <div className="h-[90px] bg-[#3c3c3d] cursor-pointer rounded-full hover:bg-[#4c4c4d] transition-all duration-200 hover:shadow-md"></div>
//                 <div
//                   style={{ clipPath: "polygon(50% 0,100% 100%,0 100%)" }}
//                   className="h-[90px] bg-[#3c3c3d] cursor-pointer hover:bg-[#4c4c4d] transition-all duration-200 hover:shadow-md"
//                 ></div>

//                 <div
//                   style={{
//                     clipPath:
//                       "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
//                   }}
//                   className="h-[90px] bg-[#3c3c3d] cursor-pointer hover:bg-[#4c4c4d] transition-all duration-200 hover:shadow-md"
//                 ></div>
//                 <div
//                   style={{
//                     clipPath:
//                       "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
//                   }}
//                   className="h-[90px] bg-[#3c3c3d] cursor-pointer hover:bg-[#4c4c4d] transition-all duration-200 hover:shadow-md"
//                 ></div>
//                 <div
//                   style={{
//                     clipPath:
//                       "polygon(0% 0%, 100% 0%, 100% 75%, 50% 100%, 0% 75%)",
//                   }}
//                   className="h-[90px] bg-[#3c3c3d] cursor-pointer hover:bg-[#4c4c4d] transition-all duration-200 hover:shadow-md"
//                 ></div>
//                 <div className="h-[90px] bg-[#3c3c3d] cursor-pointer rounded-lg hover:bg-[#4c4c4d] transition-all duration-200 hover:shadow-md"></div>
//                 <div className="h-[90px] bg-[#3c3c3d] cursor-pointer rounded-t-full hover:bg-[#4c4c4d] transition-all duration-200 hover:shadow-md"></div>
//                 <div className="h-[90px] bg-[#3c3c3d] cursor-pointer rounded-br-3xl rounded-tl-3xl hover:bg-[#4c4c4d] transition-all duration-200 hover:shadow-md"></div>
//                 <div className="h-[90px] bg-[#3c3c3d] cursor-pointer rotate-45 hover:bg-[#4c4c4d] transition-all duration-200 hover:shadow-md"></div>
//                 <div className="h-[90px] w-[90px] bg-[#3c3c3d] cursor-pointer rounded-tl-full hover:bg-[#4c4c4d] transition-all duration-200 hover:shadow-md"></div>
//                 <div
//                   style={{
//                     clipPath:
//                       "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
//                   }}
//                   className="h-[90px] bg-[#3c3c3d] cursor-pointer hover:bg-[#4c4c4d] transition-all duration-200 hover:shadow-md"
//                 ></div>
//               </div>
//             )}
//             {activeTab === "upload" && <MyImages />}
//             {activeTab === "text" && (
//               <div className="w-full">
//                 <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-1">
//                   <div className="bg-gradient-to-r from-purple-700 to-purple-900 hover:from-purple-800 hover:to-purple-950 cursor-pointer font-bold p-4 text-white text-lg md:text-xl rounded transition-all duration-300 shadow-md hover:shadow-purple-700/30 flex items-center gap-3">
//                     {/* CHANGED: Enhanced button with hover effects */}
//                     <svg
//                       xmlns="http://www.w3.org/2000/svg"
//                       className="h-5 w-5 md:h-6 md:w-6"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                       stroke="currentColor"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M3 10h18M7 15h10M12 3v18"
//                       />
//                     </svg>
//                     <h2>Add a Text</h2>
//                   </div>
//                 </div>
//               </div>
//             )}
//             {activeTab === "projects" && <Projects />}
//             {activeTab === "image" && (
//               <div className="h-[88vh] overflow-x-auto flex justify-start items-start custom-scrollbar">
//                 <Images />
//               </div>
//             )}
//             {activeTab === "background" && (
//               <div className="h-[88vh] overflow-x-auto flex justify-start items-start custom-scrollbar">
//                 <div className="grid grid-cols-2 gap-2">
//                   {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
//                     (img, ind) => (
//                       <div
//                         key={ind}
//                         className="w-full h-[90px] overflow-hidden rounded-sm cursor-pointer hover:shadow-md transition-all duration-200" // CHANGED: Added hover effects
//                       >
//                         <img
//                           className="h-full w-full object-fill hover:opacity-90 transition-opacity" // CHANGED: Added hover opacity effect
//                           src="https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg"
//                           alt="image"
//                         />
//                       </div>
//                     )
//                   )}
//                 </div>
//               </div>
//             )}
//           </div>
//           {/* Main canvas area */}
//           <div className="w-full h-full flex">
//             {" "}
//             {/* CHANGED: Added flex to fix layout */}
//             <div
//               className={`flex justify-center items-center relative h-full ${
//                 !currentComponent ? "w-full" : "w-[calc(100%-250px)]"
//               } transition-all duration-300 overflow-hidden`}
//             >
//               <div className="flex justify-center items-center overflow-hidden">
//                 {/* CHANGED: Added container styling for canvas */}
//                 <div className="mx-auto p-4 bg-gray-900/50 rounded-lg shadow-lg border border-gray-800/40">
//                   <div
//                     className="w-auto relative h-auto overflow-hidden"
//                     id="main_design"
//                   >
//                     {components.map((c, i) => (
//                       <CreateStructure
//                         key={i}
//                         info={c}
//                         currentComponent={currentComponent}
//                         removeComponent={removeComponent}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//             {/* CHANGED: Completely redesigned properties panel */}
//             {currentComponent && (
//               <div className="h-full w-[250px] text-gray-300 bg-[#252627] px-3 py-2 border-l border-gray-800/40">
//                 <h3 className="text-purple-400 font-medium text-lg mb-4 border-b border-gray-700/70 pb-2">
//                   Properties
//                 </h3>

//                 <div className="space-y-3">
//                   {/* Dimensions section */}
//                   {/* <div className="bg-gray-800/50 p-2 rounded-md">
//                     <p className="text-sm text-purple-300 mb-2">Dimensions</p>
//                     <div className="grid grid-cols-2 gap-2">
//                       <div>
//                         <label className="text-xs text-gray-400 block mb-1">
//                           Width
//                         </label>
//                         <input
//                           type="text"
//                           value={currentComponent.width || 0}
//                           className="w-full bg-gray-700/70 border border-gray-600 rounded py-1 px-2 text-sm"
//                           readOnly
//                         />
//                       </div>
//                       <div>
//                         <label className="text-xs text-gray-400 block mb-1">
//                           Height
//                         </label>
//                         <input
//                           type="text"
//                           value={currentComponent.height || 0}
//                           className="w-full bg-gray-700/70 border border-gray-600 rounded py-1 px-2 text-sm"
//                           readOnly
//                         />
//                       </div>
//                     </div>
//                   </div> */}

//                   {/* Color section */}
//                   {/* <div className="bg-gray-800/50 p-2 rounded-md">
//                     <p className="text-sm text-purple-300 mb-2">Appearance</p>
//                     <div className="mb-2">
//                       <label className="text-xs text-gray-400 block mb-1">
//                         Color
//                       </label>
//                       <div className="flex items-center space-x-2">
//                         <div
//                           className="h-5 w-5 rounded border border-gray-600"
//                           style={{ backgroundColor: currentComponent.color }}
//                         ></div>
//                         <span className="text-sm">
//                           {currentComponent.color}
//                         </span>
//                       </div>
//                     </div>
//                   </div> */}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Main;

import React, { useState } from "react";
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
import Images from "../components/Images";
import CreateStructure from "../components/CreateStructure";
import { IoSettingsOutline } from "react-icons/io5";

const Main = () => {
  const [currentComponent, setCurrentComponent] = useState("");

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("design");
  const [showSidepanel, setShowSidepanel] = useState({
    status: true,
    name: "",
  });

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
  const moveElement = () => {};
  // re-size element
  const reSizeElement = () => {};
  // rotate element
  const rotateElement = () => {};

  // remove component
  const removeComponent = () => {};

  const [components, setComponents] = useState([
    {
      name: "main-frame",
      type: "react",
      id: Math.floor(Math.random() * 100 + 1),
      width: 650,
      height: 450,
      z_index: 1,
      color: "green",
      image: "",
      setCurrentComponent: (a) => setCurrentComponent(a),
    },
  ]);

  console.log(currentComponent);

  const menuItems = [
    { id: "design", icon: <BsGrid1X2 />, label: "Design" },
    { id: "shape", icon: <FaShapes />, label: "Shapes" },
    { id: "upload", icon: <FaCloudUploadAlt />, label: "Upload" },
    { id: "text", icon: <TfiText />, label: "Text" },
    { id: "projects", icon: <BsFolder />, label: "Project" },
    { id: "image", icon: <BsFillImageFill />, label: "Images" },
    { id: "background", icon: <RxTransparencyGrid />, label: "Background" },
  ];

  return (
    <div className="min-w-screen min-h-screen h-screen bg-gradient-to-b from-gray-950 to-black overflow-hidden">
      <Header />
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

            {/* Tab content */}
            {activeTab === "design" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <TemplateDesign />
              </div>
            )}
            {activeTab === "shape" && (
              <div className="grid grid-cols-3 gap-3">
                <div className="h-[90px] bg-gradient-to-br from-purple-900/30 to-gray-800 hover:from-purple-700/40 hover:to-gray-700 cursor-pointer transform transition-all duration-300 hover:scale-105 border border-gray-700/50 hover:border-purple-500/30 shadow-md hover:shadow-purple-900/20"></div>
                <div className="h-[90px] bg-gradient-to-br from-purple-900/30 to-gray-800 hover:from-purple-700/40 hover:to-gray-700 cursor-pointer rounded-full transform transition-all duration-300 hover:scale-105 border border-gray-700/50 hover:border-purple-500/30 shadow-md hover:shadow-purple-900/20"></div>
                <div
                  style={{ clipPath: "polygon(50% 0,100% 100%,0 100%)" }}
                  className="h-[90px] bg-gradient-to-br from-purple-900/30 to-gray-800 hover:from-purple-700/40 hover:to-gray-700 cursor-pointer transform transition-all duration-300 hover:scale-105 border border-gray-700/50 hover:border-purple-500/30 shadow-md hover:shadow-purple-900/20"
                ></div>

                <div
                  style={{
                    clipPath:
                      "polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)",
                  }}
                  className="h-[90px] bg-gradient-to-br from-purple-900/30 to-gray-800 hover:from-purple-700/40 hover:to-gray-700 cursor-pointer transform transition-all duration-300 hover:scale-105 border border-gray-700/50 hover:border-purple-500/30 shadow-md hover:shadow-purple-900/20"
                ></div>
                <div
                  style={{
                    clipPath:
                      "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                  }}
                  className="h-[90px] bg-gradient-to-br from-purple-900/30 to-gray-800 hover:from-purple-700/40 hover:to-gray-700 cursor-pointer transform transition-all duration-300 hover:scale-105 border border-gray-700/50 hover:border-purple-500/30 shadow-md hover:shadow-purple-900/20"
                ></div>
                <div
                  style={{
                    clipPath:
                      "polygon(0% 0%, 100% 0%, 100% 75%, 50% 100%, 0% 75%)",
                  }}
                  className="h-[90px] bg-gradient-to-br from-purple-900/30 to-gray-800 hover:from-purple-700/40 hover:to-gray-700 cursor-pointer transform transition-all duration-300 hover:scale-105 border border-gray-700/50 hover:border-purple-500/30 shadow-md hover:shadow-purple-900/20"
                ></div>
                <div className="h-[90px] bg-gradient-to-br from-purple-900/30 to-gray-800 hover:from-purple-700/40 hover:to-gray-700 cursor-pointer rounded-lg transform transition-all duration-300 hover:scale-105 border border-gray-700/50 hover:border-purple-500/30 shadow-md hover:shadow-purple-900/20"></div>
                <div className="h-[90px] bg-gradient-to-br from-purple-900/30 to-gray-800 hover:from-purple-700/40 hover:to-gray-700 cursor-pointer rounded-t-full transform transition-all duration-300 hover:scale-105 border border-gray-700/50 hover:border-purple-500/30 shadow-md hover:shadow-purple-900/20"></div>
                <div className="h-[90px] bg-gradient-to-br from-purple-900/30 to-gray-800 hover:from-purple-700/40 hover:to-gray-700 cursor-pointer rounded-br-3xl rounded-tl-3xl transform transition-all duration-300 hover:scale-105 border border-gray-700/50 hover:border-purple-500/30 shadow-md hover:shadow-purple-900/20"></div>
                <div className="h-[90px] bg-gradient-to-br from-purple-900/30 to-gray-800 hover:from-purple-700/40 hover:to-gray-700 cursor-pointer rotate-45 transform transition-all duration-300 hover:scale-105 border border-gray-700/50 hover:border-purple-500/30 shadow-md hover:shadow-purple-900/20"></div>
                <div className="h-[90px] w-[90px] bg-gradient-to-br from-purple-900/30 to-gray-800 hover:from-purple-700/40 hover:to-gray-700 cursor-pointer rounded-tl-full transform transition-all duration-300 hover:scale-105 border border-gray-700/50 hover:border-purple-500/30 shadow-md hover:shadow-purple-900/20"></div>
                <div
                  style={{
                    clipPath:
                      "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                  }}
                  className="h-[90px] bg-gradient-to-br from-purple-900/30 to-gray-800 hover:from-purple-700/40 hover:to-gray-700 cursor-pointer transform transition-all duration-300 hover:scale-105 border border-gray-700/50 hover:border-purple-500/30 shadow-md hover:shadow-purple-900/20"
                ></div>
              </div>
            )}
            {activeTab === "upload" && <MyImages />}
            {activeTab === "text" && (
              <div className="w-full">
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-1">
                  <div className="bg-gradient-to-r from-purple-700 to-purple-900 hover:from-purple-800 hover:to-purple-950 cursor-pointer font-bold p-4 text-white text-lg md:text-xl rounded-lg transition-all duration-300 shadow-md hover:shadow-purple-700/50 flex items-center gap-3 transform hover:translate-y-[-2px]">
                    <TfiText className="h-5 w-5 md:h-6 md:w-6" />
                    <h2>Add a Text</h2>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "projects" && <Projects />}
            {activeTab === "image" && (
              <div className="h-[88vh] overflow-x-auto flex justify-start items-start custom-scrollbar">
                <Images />
              </div>
            )}
            {activeTab === "background" && (
              <div className="h-[88vh] overflow-x-auto flex justify-start items-start custom-scrollbar">
                <div className="grid grid-cols-2 gap-2">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(
                    (img, ind) => (
                      <div
                        key={ind}
                        className="w-full h-[90px] overflow-hidden rounded-md cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-900/20 border border-gray-800 hover:border-purple-500/30"
                      >
                        <img
                          className="h-full w-full object-fill hover:opacity-90 transition-opacity"
                          src="https://static.vecteezy.com/system/resources/thumbnails/036/324/708/small/ai-generated-picture-of-a-tiger-walking-in-the-forest-photo.jpg"
                          alt="image"
                        />
                      </div>
                    )
                  )}
                </div>
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

                {/* <div className="space-y-4 border">
                  <div className="bg-gray-800/50 p-3 rounded-md border border-gray-700/50">
                    <h4 className="font-medium text-purple-300 mb-2">
                      Dimensions
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs text-gray-400 block mb-1">
                          Width (px)
                        </label>
                        <input
                          type="number"
                          value={currentComponent.width || 0}
                          className="w-full bg-gray-700/70 border border-gray-600 rounded py-1 px-2 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 block mb-1">
                          Height (px)
                        </label>
                        <input
                          type="number"
                          value={currentComponent.height || 0}
                          className="w-full bg-gray-700/70 border border-gray-600 rounded py-1 px-2 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-800/50 p-3 rounded-md border border-gray-700/50">
                    <h4 className="font-medium text-purple-300 mb-2">
                      Appearance
                    </h4>
                    <div className="mb-2">
                      <label className="text-xs text-gray-400 block mb-1">
                        Background
                      </label>
                      <div className="flex items-center space-x-2">
                        <div
                          className="h-6 w-6 rounded border border-gray-600"
                          style={{ backgroundColor: currentComponent.color }}
                        ></div>
                        <span className="text-sm">
                          {currentComponent.color}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 block mb-1">
                        Z-Index
                      </label>
                      <input
                        type="number"
                        value={currentComponent.z_index || 1}
                        className="w-full bg-gray-700/70 border border-gray-600 rounded py-1 px-2 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                        readOnly
                      />
                    </div>
                  </div>

                  <div className="bg-gray-800/50 p-3 rounded-md border border-gray-700/50">
                    <h4 className="font-medium text-purple-300 mb-2">
                      Actions
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      <button className="bg-purple-600 hover:bg-purple-700 text-white py-1 px-3 rounded text-sm transition duration-200 hover:shadow-md hover:shadow-purple-700/30">
                        Edit
                      </button>
                      <button className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded text-sm transition duration-200 hover:shadow-md hover:shadow-red-700/30">
                        Delete
                      </button>
                    </div>
                  </div>
                </div> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
