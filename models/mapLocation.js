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
  images: [
    {
      type: String,
    },
  ],
});

module.exports = mongoose.model("mapLocation", mapLocationSchema);
