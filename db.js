const mongoose = require("mongoose");

const connect = (url, options) => {
    mongoose.connect(url, options, () => {
        console.log("Connected to database ", url);
    });
};

module.exports = connect;
