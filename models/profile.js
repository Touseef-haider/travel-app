const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const profileSchema = new Schema({
  first_name: {
    type: String,
  },
  last_name: {
    type: String,
  },
  address: {
    type: String,
  },
  phone: {
    type: String,
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  zip: {
    type: String,
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
