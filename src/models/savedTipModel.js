const { Schema, model } = require("mongoose");

const savedTipSchema = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    tip_id: {
      type: Schema.Types.ObjectId,
      ref: "designTips",
      required: true,
    },
  },
  { timestamps: true }
);

// Compound index to ensure a user can only save a tip once
savedTipSchema.index({ user_id: 1, tip_id: 1 }, { unique: true });

const savedTipModel = model("savedTips", savedTipSchema);

module.exports = savedTipModel;