const { Schema, model } = require("mongoose");

const designImageSchema = new Schema(
  {
    image_url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const designImageModel = model("design_images", designImageSchema);

module.exports = designImageModel;
