const Rating = require("../models/rating")

exports.getRatings = async function () {
    try {



        const ratings = await Rating.find({}).sort({
            created_at: -1
        }).populate("profile")

        return ratings


    } catch (err) {
        throw new Error(err)
    }
}


