const { formidable } = require("formidable");
const designModel = require("../models/designModel");
const cloudinary = require("cloudinary").v2;

const designController = {
  async createUserDesign(req, res) {
    const form = formidable({});

    const { _id } = req.userInfo;
    try {
      cloudinary.config({
        cloud_name: process.env.cloud_name,
        api_key: process.env.api_key,
        api_secret: process.env.api_secret,
      });
      const [fields, files] = await form.parse(req);

      const { image } = files;

      const { url } = await cloudinary.uploader.upload(image[0].filepath);
      const design = await designModel.create({
        user_id: _id,
        components: [JSON.parse(fields.design[0])],
        image_url: url,
      });
      return res.status(201).json({ design });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error.message });
    }
  },

  async getUserDesign(req, res) {
    const { design_id } = req.params;
    try {
      const design = await designModel.findById(design_id);
      return res.status(201).json({ design: design.components });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async updateUserDesign(req, res) {
    const form = formidable({});
    const { design_id } = req.params;
    try {
      cloudinary.config({
        cloud_name: process.env.cloud_name,
        api_key: process.env.api_key,
        api_secret: process.env.api_secret,
      });
      const [fields, files] = await form.parse(req);

      const { image } = files;
      const components = JSON.parse(fields.design[0]).design;
      const oldDesign = await designModel.findById(design_id);
      if (oldDesign) {
        if (oldDesign.image_url) {
          const splitImage = oldDesign.image_url.split("/");
          const imageFile = splitImage[splitImage.length - 1];
          const imageName = imageFile.split(".")[0];
          await cloudinary.uploader.destroy(imageName);
        }
        const { url } = await cloudinary.uploader.upload(image[0].filepath);
        await designModel.findByIdAndUpdate(design_id, {
          image_url: url,
          components,
        });
        return res.status(200).json({ message: "image save success" });
      } else {
        return res.status(404).json({ message: "design not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = designController;
