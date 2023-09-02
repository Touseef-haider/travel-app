const Rating = require("../models/rating")
const { getRatings } = require("../utils/ratingLogic")

exports.addRating = async (req,res,next)=>{
    try{

        const rating  = new Rating({
            experience: req.body.experience,
            rating: req.body.rating,
            profile:req.user._id
        })

        await rating.save()

        return res.status(200).json({
            message: "rating added"
        })

    }catch(err){
        return next(err)
    }
}

exports.getRatings = async(req,res,next)=>{
    try{

        const ratings = await getRatings()
        return res.status(200).json(ratings)

    }catch(err){
        return next(err)
    }
}


exports.getParticularRating = async (req,res,next)=>{
    try{

        const rating = await Rating.findById({
            _id: req.params.id
        }).populate("profile")


        return res.status(200).json(rating)

    }catch(err){
        return next(err)
    }
}



exports.updateRating = async (req,res,next)=>{
    try{

        await Rating.findByIdAndUpdate({
            _id: req.params.id
        },{
            rating: req.body.rating
        })

        return res.status(200).json({
            message:"rating updated"
        })

    }catch(err){
        return next(err)
    }
}


exports.deleteRating =async (req,res,next)=>{
    try{

        await Rating.findByIdAndDelete({
            _id:req.params.id
        })


        return res.status(200).json({
            message:"rating deleted"
        })
    }catch(err){
        return next(err)
    }
}