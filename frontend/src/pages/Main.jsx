// import React from "react";
// import Header from "../components/Header";
// import { BsFillImageFill, BsFolder, BsGrid1X2 } from "react-icons/bs";
// import { RxTransparencyGrid } from "react-icons/rx";
// import { FaCloudUploadAlt, FaShapes } from "react-icons/fa";
// import { TfiText } from "react-icons/tfi";

// const Main = () => {
//   return (
//     <div className="min-w-screen h-screen bg-black">
//       <Header />
//       <div className="flex h-[calc(100%-64px)] w-screen border">
//         <div className="w-[88px] bg-[#181918] z-50 h-full text-gray-400 overflow-y-auto">
//           <div
//             className={`w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}
//           >
//             <span className="text-2x1">
//               <BsGrid1X2 />
//             </span>
//             <span className="text-xs fant-medium">Design</span>
//           </div>

//           <div
//             className={`w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}
//           >
//             <span className="text-2x1">
//               <FaShapes />
//             </span>
//             <span className="text-xs fant-medium">Shapes</span>
//           </div>

//           <div
//             className={`w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}
//           >
//             <span className="text-2x1">
//               <FaCloudUploadAlt />
//             </span>
//             <span className="text-xs fant-medium">Upload</span>
//           </div>

//           <div
//             className={`w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}
//           >
//             <span className="text-2x1">
//               <TfiText />
//             </span>
//             <span className="text-xs fant-medium">Test</span>
//           </div>
//           <div
//             className={`w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}
//           >
//             <span className="text-2x1">
//               <BsFolder />
//             </span>
//             <span className="text-xs fant-medium">Project</span>
//           </div>

//           <div
//             className={`w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}
//           >
//             <span className="text-2x1">
//               <BsFillImageFill />
//             </span>
//             <span className="text-xs fant-medium">Images</span>
//           </div>

//           <div
//             className={`w-full h-[80px] cursor-pointer flex justify-center flex-col items-center gap-1 hover:text-gray-100`}
//           >
//             <span className="text-2x1">
//               <RxTransparencyGrid />
//             </span>
//             <span className="text-xs fant-medium">Background</span>
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
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi";

const Main = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("Design");

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const menuItems = [
    { id: "Design", icon: <BsGrid1X2 />, label: "Design" },
    { id: "Shapes", icon: <FaShapes />, label: "Shapes" },
    { id: "Upload", icon: <FaCloudUploadAlt />, label: "Upload" },
    { id: "Text", icon: <TfiText />, label: "Text" },
    { id: "Project", icon: <BsFolder />, label: "Project" },
    { id: "Images", icon: <BsFillImageFill />, label: "Images" },
    { id: "Background", icon: <RxTransparencyGrid />, label: "Background" },
  ];

  return (
    <div className="min-w-screen min-h-screen h-screen bg-black overflow-hidden">
      <Header />
      <div className="flex h-[calc(100%-64px)] w-full relative">
        {/* Sidebar */}
        <div
          className={`${
            sidebarCollapsed ? "w-16" : "w-20 sm:w-24"
          } bg-gradient-to-b from-gray-900 to-black border-r border-gray-800 h-full transition-all duration-300 ease-in-out overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 z-20`}
        >
          {/* Menu Items */}
          <div className="flex flex-col items-center py-2">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className={`w-full py-4 cursor-pointer flex flex-col items-center justify-center gap-1 transition-colors duration-200 ${
                  activeTab === item.id
                    ? "text-purple-400 bg-purple-900/20"
                    : "text-gray-400 hover:text-gray-100 hover:bg-gray-800/20"
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                <span className="text-xl sm:text-2xl">{item.icon}</span>
                {!sidebarCollapsed && (
                  <span className="text-xs font-medium">{item.label}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Toggle button for sidebar */}
        <button
          onClick={toggleSidebar}
          className="absolute left-0 bottom-4 ml-20 sm:ml-24 bg-purple-900/70 hover:bg-purple-800 text-white rounded-r-md p-1 transform transition-all duration-300 ease-in-out z-30"
          style={{
            marginLeft: sidebarCollapsed ? "64px" : "",
          }}
        >
          {sidebarCollapsed ? (
            <HiChevronDoubleRight size={20} />
          ) : (
            <HiChevronDoubleLeft size={20} />
          )}
        </button>

        {/* Main content area */}
        <div className="flex-1 bg-gradient-to-br from-gray-900 to-black overflow-auto p-4">
          <div className="max-w-7xl mx-auto">
            {/* Title for the active section */}
            <h2 className="text-xl font-bold text-white mb-6">{activeTab}</h2>

            {/* Placeholder content - this would be replaced with actual content for each tab */}
            <div className="bg-gray-800/50 rounded-lg border border-gray-700 h-[calc(100vh-200px)] flex items-center justify-center">
              <div className="text-center p-6">
                <div className="text-3xl text-purple-400 mb-4">
                  {menuItems.find((item) => item.id === activeTab)?.icon}
                </div>
                <h3 className="text-xl text-white mb-2">{activeTab} Area</h3>
                <p className="text-gray-400 max-w-md">
                  This is where your {activeTab.toLowerCase()} content would
                  appear. Select different options from the sidebar to manage
                  your design.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
