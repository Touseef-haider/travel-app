const Experience = require("../models/experience");

exports.addExperience = async (req, res, next) => {
  try {
    console.log(req.files);
    // console.log(req.body.files);
    const experience = new Experience(req.body);
    experience.profile = req.user?._id;
    await experience.save();
    return res.status(200).json({ message: "experience added" });
  } catch (error) {
    return next(error);
  }
};

exports.getExperiences = async (req, res, next) => {
  try {
    const experiences = await Experience.find({}).populate("profile").sort({
      created_at: 1,
    });
    return res.status(200).json(experiences);
  } catch (error) {
    return next(error);
  }
};

exports.getParticularExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findById({ _id: req.params.id });
    return res.status(200).json(experience);
  } catch (error) {
    return next(error);
  }
};

exports.updateExperience = async (req, res, next) => {
  try {
    await Experience.updateOne(
      {
        _id: req.params.id,
      },
      req.body
    );
    return res.status(200).json({
      message: "experience updated",
    });
  } catch (error) {
    return next(error);
  }
};
exports.deleteExperience = async (req, res, next) => {
  try {
    await Experience.updateOne(
      {
        _id: req.params.id,
      },
      req.body
    );
    return res.status(200).json({
      message: "experience deleted",
    });
  } catch (error) {
    return next(error);
  }
};
