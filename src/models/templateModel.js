const { Schema, model } = require("mongoose");

const templateSchema = new Schema(
  {
    components: {
      type: Array,
      default: [],
    },
    image_url: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const templateModel = model("templates", templateSchema);

module.exports = templateModel;
