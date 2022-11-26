const Story = require("../models/story");

exports.addStory = async (req, res, next) => {
  try {
    const story = new Story(req.body);
    story.profile = req.user?._id;
    await story.save();
    return res.status(200).json({ message: "story added", story });
  } catch (error) {
    return next(error);
  }
};

exports.getStories = async (req, res, next) => {
  try {
    const stories = await Story.find({});
    return res.status(200).json(stories);
  } catch (error) {
    return next(error);
  }
};

exports.getParticularStory = async (req, res, next) => {
  try {
    const story = await Story.find({ _id: req.params.id });
    return res.status(200).json(story);
  } catch (error) {
    return next(error);
  }
};

exports.updateStory = async (req, res, next) => {
  try {
    await Story.updateOne(
      {
        _id: req.params.id,
      },
      req.body
    );
    return res.status(200).json({
      message: "story updated",
    });
  } catch (error) {
    return next(error);
  }
};
exports.deleteStory = async (req, res, next) => {
  try {
    await Story.updateOne(
      {
        _id: req.params.id,
      },
      req.body
    );
    return res.status(200).json({
      message: "story deleted",
    });
  } catch (error) {
    return next(error);
  }
};
