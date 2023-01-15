const Category = require("../models/category");

exports.addCategory = async (req, res, next) => {
  try {
    const category = new Category(req.body);

    await category.save();

    return res.status(200).json({
      message: "category added",
    });
  } catch (error) {
    return next(error);
  }
};

exports.getParticularCategory = async (req, res, next) => {
  try {
    const category = await Category.findById({
      _id: req.params.id,
    }).lean();

    return res.status(200).json(category);
  } catch (error) {
    return next(error);
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const Categorys = await Category.find({}).lean();

    return res.status(200).json(Categorys);
  } catch (error) {
    return next(error);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    await Category.updateOne(
      {
        _id: req.params.id,
      },
      req.body
    );
    return res.status(200).json({
      message: "category updated",
    });
    c;
  } catch (error) {
    return next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    await Category.deleteOne({
      _id: req.params.id,
    });
    return res.status(200).json({
      message: "category deleted",
    });
  } catch (error) {
    return next(error);
  }
};
