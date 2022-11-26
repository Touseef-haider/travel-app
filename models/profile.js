const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const profileSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  zip: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
  is_deleted: {
    type: Boolean,
    default: false,
  },
});

profileSchema.index({
  full_name: "text",
});

module.exports = mongoose.model("profile", profileSchema);
