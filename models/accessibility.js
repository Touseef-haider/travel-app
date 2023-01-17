const mongoose = require("mongoose");

const accessibilitySchema = new mongoose.Schema({
  via: {
    type: String,
  },
});

module.exports = mongoose.model("accessibility", accessibilitySchema);
