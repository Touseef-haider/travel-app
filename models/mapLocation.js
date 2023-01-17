const mongoose = require("mongoose");

const mapLocationSchema = new mongoose.Schema({
  lat: {
    type: Number,
  },
  lng: {
    type: Number,
  },
  name: {
    type: String,
  },
  location: {
    type: String,
  },
  contact: {
    type: Number,
  },
  description: {
    type: String,
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "category",
  },
  country: {
    name: {
      type: String,
      default: "Pakistan",
    },
    province: {
      type: mongoose.Types.ObjectId,
      ref: "province",
    },
    city: {
      type: String,
    },
  },
  images: [
    {
      type: String,
    },
  ],
  hotels: [
    {
      type: mongoose.Types.ObjectId,
      ref: "hotel",
    },
  ],
});

module.exports = mongoose.model("mapLocation", mapLocationSchema);
