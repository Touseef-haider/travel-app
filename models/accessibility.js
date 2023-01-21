const mongoose = require("mongoose");

const accessibilitySchema = new mongoose.Schema({
  via: {
    type: String,
  },
  type: {
    type: String,
    enum: ["vehicle", "individual"],
  },
});

module.exports = mongoose.model("accessibility", accessibilitySchema);
