import React, { useState } from "react";

const Home = () => {
  const [show, setShow] = useState(false);
  return (
    <div className="border p-5">
      <div className="w-fll flex justify-center items-center h-[250px] bg-gradient-to-r from-[#4c76cf] to-[#552ab8] relative rounded-md overflow-hidden">
        <button
          onClick={() => setShow(!show)}
          className="px-4 py-2 text-[15px] overflow-hidden text-center bg-[#8b3dffad] text-white rounded-[3px] font-medium hover:bg-[#8b3dffd3] absolute top-3 right-3"
        >
          Custom size
        </button>
        <div
          className={`absolute top-16 right-3 gap-3 bg-[#252627] w-[250px] p-4 text-white ${
            show ? "visible opacity-100" : "invisible opacity-50"
          } transition-all duration-500`}
        ></div>
      </div>
    </div>
  );
};

export default Home;
