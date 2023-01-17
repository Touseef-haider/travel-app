const Accessibility = require("../models/accessibility");

exports.addAccessibility = async (req, res, next) => {
  try {
    const accessibility = new Accessibility(req.body);

    await accessibility.save();

    return res.status(200).json({
      message: "accessibility added",
    });
  } catch (error) {
    return next(error);
  }
};

exports.getParticularAccessibility = async (req, res, next) => {
  try {
    const accessibility = await Accessibility.findById({
      _id: req.params.id,
    }).lean();

    return res.status(200).json(accessibility);
  } catch (error) {
    return next(error);
  }
};

exports.getAccessibilities = async (req, res, next) => {
  try {
    const Accessibilitys = await Accessibility.find({}).lean();

    return res.status(200).json(Accessibilitys);
  } catch (error) {
    return next(error);
  }
};

exports.updateAccessibility = async (req, res, next) => {
  try {
    await Accessibility.updateOne(
      {
        _id: req.params.id,
      },
      req.body
    );
    return res.status(200).json({
      message: "accessibility updated",
    });
  } catch (error) {
    return next(error);
  }
};

exports.deleteAccessibility = async (req, res, next) => {
  try {
    await Accessibility.deleteOne({
      _id: req.params.id,
    });
    return res.status(200).json({
      message: "accessibility deleted",
    });
  } catch (error) {
    return next(error);
  }
};
