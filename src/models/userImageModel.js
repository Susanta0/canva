const { Schema, model } = require("mongoose");

const userImageSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    image_url: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const userImageModel = model("user_images", userImageSchema);

module.exports = userImageModel;
