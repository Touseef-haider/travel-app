const mongoose = require("mongoose");

const hotelsSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  location: {
    type: String,
  },
  stars: {
    type: Number,
  },
  images: [
    {
      url: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("hotel", hotelsSchema);
