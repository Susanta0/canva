import React, { useEffect } from "react";
import toast from "react-hot-toast";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

const TemplateDesign = ({ type }) => {
  const [templates, setTemplates] = React.useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getTemplates = async () => {
      try {
        const { data } = await api.get("/api/templates");
        setTemplates(data.templates);
      } catch (error) {
        console.log(error);
        toast.error("Error fetching images. Please try again.");
      }
    };
    getTemplates();
  }, []);

  const addTemplate = async (id) => {
    try {
      const { data } = await api.get(`/api/add_user_templates/${id}`);
      navigate(`/design/${data.design._id}/edit`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={`grid gap-2 ${type ? "grid-cols-1" : "grid-cols-4"}`}>
        {templates.map((design, ind) => (
          <div
            onClick={() => addTemplate(design._id)}
            key={ind}
            className="bg-[#2d3639] border border-gray-700 overflow-hidden group hover:border-purple-500 transition-all duration-300 hover:shadow-xl hover:shadow-purple-900/30 relative"
          >
            {/* Main image container */}
            <div className="cursor-pointer h-40 sm:h-48 bg-gradient-to-br from-gray-700 to-gray-800 relative overflow-hidden ">
              {/* Image with zoom effect removed */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="absolute inset-0 overflow-hidden">
                  {/* Single static image without scale transformation */}
                  <img
                    src={design.image_url}
                    alt={design.title || "Design preview"}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TemplateDesign;
