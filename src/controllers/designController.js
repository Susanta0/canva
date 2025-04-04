const { formidable } = require("formidable");
const designModel = require("../models/designModel");
const userImageModel = require("../models/userImageModel");
const designImageModel = require("../models/designImageModel");
const backgroundImageModel = require("../models/backgroundImageModel");
const cloudinary = require("cloudinary").v2;
const {
  mongo: { ObjectId },
} = require("mongoose");
const templateModel = require("../models/templateModel");

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

  async addUserImage(req, res) {
    const { _id } = req.userInfo;
    const form = formidable({});

    cloudinary.config({
      cloud_name: process.env.cloud_name,
      api_key: process.env.api_key,
      api_secret: process.env.api_secret,
    });

    try {
      const [_, files] = await form.parse(req);
      const { image } = files;
      const { url } = await cloudinary.uploader.upload(image[0].filepath);
      const userAddImage = await userImageModel.create({
        user_id: _id,
        image_url: url,
      });
      return res.status(201).json({ userAddImage });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async getUserImage(req, res) {
    const { _id } = req.userInfo;
    try {
      const images = await userImageModel.find({ user_id: new ObjectId(_id) });
      return res.status(200).json({ images });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async getDesignImages(req, res) {
    try {
      const images = await designImageModel.find({});
      return res.status(200).json({ images });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async getBackgroundImages(req, res) {
    try {
      const images = await backgroundImageModel.find({});
      return res.status(200).json({ images });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async getUserDesigns(req, res) {
    const { _id } = req.userInfo;
    try {
      const designs = await designModel
        .find({ user_id: new ObjectId(_id) })
        .sort({ createdAt: -1 });
      return res.status(200).json({ designs });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async deleteUserDesigns(req, res) {
    const { design_id } = req.params;
    try {
      const design = await designModel.findById(design_id);
      if (design) {
        if (design.image_url) {
          const splitImage = design.image_url.split("/");
          const imageFile = splitImage[splitImage.length - 1];
          const imageName = imageFile.split(".")[0];
          await cloudinary.uploader.destroy(imageName);
        }
        await designModel.findByIdAndDelete(design_id);
        return res.status(200).json({ message: "design deleted" });
      } else {
        return res.status(404).json({ message: "design not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async getTempaltes(req, res) {
    try {
      const templates = await templateModel.find().sort({ createdAt: -1 });
      return res.status(200).json({ templates });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },

  async addUserTemplate(req, res) {
    const { template_id } = req.params;
    const { _id } = req.userInfo;
    try {
      const template = await templateModel.findById(template_id);
      const design = await designModel.create({
        user_id: _id,
        components: template.components,
        image_url: template.image_url,
      });

      return res.status(200).json({ design });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
};

module.exports = designController;
