const mongoose = require("mongoose");

const provinceSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  country: {
    type: String,
  },
  cities: [
    {
      name: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model("province", provinceSchema);
