const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const storySchema = new Schema({
  profile: {
    type: mongoose.Types.ObjectId,
    ref: "profile",
  },
  story: {
    type: String,
  },
});

module.exports = mongoose.model("story", storySchema);
