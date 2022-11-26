const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const albumSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
  },
  profile: {
    type: mongoose.Types.ObjectId,
    ref: "profile",
  },
  album: [
    {
      type: Buffer,
    },
  ],
});

module.exports = mongoose.model("album", albumSchema);
