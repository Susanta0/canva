const { Schema, model } = require("mongoose");

const designSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
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

const designModel = model("designs", designSchema);

module.exports = designModel;
