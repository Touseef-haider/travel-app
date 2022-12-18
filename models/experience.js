const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const experienceSchema = new Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    is_active: {
      type: Boolean,
      default: false,
    },
    category: {
      type: String,
    },
    profile: {
      type: mongoose.Types.ObjectId,
      ref: "profile",
    },
    images: [
      {
        type: Buffer,
      },
    ],
  },
  {
    timestamps: {
      createdAt: "created_at",
    },
  }
);

module.exports = mongoose.model("experience", experienceSchema);
