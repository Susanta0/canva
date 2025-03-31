const { Schema, model } = require("mongoose");

const backgroundImageSchema = new Schema(
  {
    image_url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const backgroundImageModel = model("background_images", backgroundImageSchema);

module.exports = backgroundImageModel;
