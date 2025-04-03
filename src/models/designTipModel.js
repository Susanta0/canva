const { Schema, model } = require("mongoose");

const designTipSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
    },
    tip: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      default: "#",
    },
    ratings: [
      {
        user_id: {
          type: Schema.Types.ObjectId,
          ref: "users",
          required: true,
        },
        rating: {
          type: Number,
          min: 1,
          max: 5,
          required: true,
        },
      },
    ],
    averageRating: {
      type: Number,
      default: 0,
    },
    isAIGenerated: {
      type: Boolean,
      default: false,
    },
    submittedBy: {
      type: Schema.Types.ObjectId,
      ref: "users",
    },
    approved: {
      type: Boolean,
      default: true, // Admin-submitted tips are auto-approved
    },
  },
  { timestamps: true }
);

const designTipModel = model("designTips", designTipSchema);

module.exports = designTipModel;