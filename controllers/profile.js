const Profile = require("../models/profile");

exports.getParticularProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findById({ _id: req.params.id }).lean();

    return res.status(200).json(profile);
  } catch (error) {
    return next(error);
  }
};

// for own profile
exports.getOwnProfile = async (req, res, next) => {
  try {
    const profile = await Profile.findById({
      _id: req.user._id,
    }).populate([{ path: "user", model: "user", select: "_id email" }]);
    return res.status(200).json(profile);
  } catch (error) {
    return next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    await Profile.updateOne(
      {
        _id: req.params.id,
      },
      req.body
    );
    return res.status(200).json({
      message: "profile updated",
    });
  } catch (error) {
    return next(error);
  }
};
