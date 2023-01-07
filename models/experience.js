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
    place: {
      type: String,
      required: true,
    },
    //
    profile: {
      type: mongoose.Types.ObjectId,
      ref: "profile",
    },
    images: [
      {
        type: String,
      },
    ],
    liked_by: [
      {
        type: mongoose.Types.ObjectId,
        ref: "profile",
      },
    ],
    comments: [
      {
        message: {
          type: String,
        },
        by: {
          type: mongoose.Types.ObjectId,
          ref: "profile",
        },
        liked_by: [
          {
            type: mongoose.Types.ObjectId,
            ref: "profile",
          },
        ],
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
