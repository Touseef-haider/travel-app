const { getLikeQuery } = require("../customQueries/experience");
const Experience = require("../models/experience");

exports.addExperience = async (req, res, next) => {
  try {
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
    const experiences = await Experience.find({})
      .populate(["profile", "comments.by"])
      .sort({
        created_at: -1,
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

exports.addCommentInExperience = async (req, res, next) => {
  try {
    const { comment } = req.body;
    await Experience.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      {
        $push: {
          comments: { message: comment, by: req.user._id },
        },
      }
    );

    return res.status(200).json({ message: "comment added" });
  } catch (err) {
    return next(err);
  }
};

exports.updateCommentInExperience = async (req, res, next) => {
  try {
    const { comment } = req.body;

    const experience = await Experience.findById({ _id: req.params.id });
    const comments = experience.comments;

    const comm = comments.find(
      (c) => c?._id?.toString() === req.params.commentId
    );

    comm.message = comment;

    const filteredComments = comments.filter(
      (c) => c?._id?.toString() !== req.params.commentId
    );

    experience.comments = [...filteredComments, comm];

    await experience.save();

    return res.status(200).json({ message: "comment added" });
  } catch (err) {
    return next(err);
  }
};

exports.updateLikeInExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findById({ _id: req.params.id });
    const comment = experience.comments.find(
      (c) => c?._id?.toString() === req.params.commentId
    );
    const likedInd = comment.liked_by.indexOf(req.user._id);
    if (likedInd >= 0) {
      comment.liked_by.splice(likedInd, 1);
    } else {
      comment.liked_by.push(req.user._id);
    }

    await experience.save();

    return res.status(200).json({ message: "comment liked" });
  } catch (err) {
    return next(err);
  }
};
exports.updateLikeOnPostInExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findById({ _id: req.params.id });

    const likedInd = experience.liked_by.indexOf(req.user._id);
      if (likedInd >= 0) {
      experience.liked_by.splice(likedInd, 1);
    } else {
      experience.liked_by.push(req.user._id);
    }

    await experience.save();

    return res.status(200).json({ message: "comment liked" });
  } catch (err) {
    return next(err);
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

exports.deleteCommentFromExperience = async (req, res, next) => {
  try {
    const experience = await Experience.findById({ _id: req.params.id });
    const comments = experience.comments;

    const filteredComments = comments.filter(
      (c) => c?._id?.toString() !== req.params.commentId
    );

    experience.comments = filteredComments;

    await experience.save();

    return res.status(200).json({
      message: "comment deleted",
    });
  } catch (err) {
    return next(err);
  }
};

exports.deleteExperience = async (req, res, next) => {
  try {
    await Experience.deleteOne({
      _id: req.params.id,
    });
    return res.status(200).json({
      message: "experience deleted",
    });
  } catch (error) {
    return next(error);
  }
};
