const mongoose = require("mongoose")

const ratingSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true
    },
    mapLocation: {
        type: mongoose.Types.ObjectId,
        ref: "mapLocation"
    },
    profile: {
        type: mongoose.Types.ObjectId,
        ref: "profile"
    }
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
})


module.exports = mongoose.model("rating", ratingSchema)