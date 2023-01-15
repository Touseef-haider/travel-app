const Province = require("../models/province");

exports.addProvince = async (req, res, next) => {
  try {
    const province = new Province(req.body);

    await province.save();

    return res.status(200).json({
      message: "province added",
    });
  } catch (error) {
    return next(error);
  }
};

exports.addCityInProvince = async (req, res, next) => {
  try {
    const province = await Province.findById({ _id: req.params.id });
    province.cities.push({ name: req.body.city });

    await province.save();
    return res.status(200).json({
      message: "city added in province",
    });
  } catch (error) {
    return next(error);
  }
};

exports.removeCityFromProvince = async (req, res, next) => {
  try {
    const province = await Province.findById({ _id: req.params.id });
    const cityIndex = [...province.cities].findIndex(
      (i) => i?._id.toString() === req.params.cityId
    );
    province.cities.splice(cityIndex, 1);
    await province.save();
    return res.status(200).json({
      message: "city removed from province",
    });
  } catch (error) {
    return next(error);
  }
};

exports.getParticularProvince = async (req, res, next) => {
  try {
    const province = await Province.findById({
      _id: req.params.id,
    }).lean();

    return res.status(200).json(province);
  } catch (error) {
    return next(error);
  }
};

exports.getProvinces = async (req, res, next) => {
  try {
    const Provinces = await Province.find({}).lean();

    return res.status(200).json(Provinces);
  } catch (error) {
    return next(error);
  }
};

exports.updateProvince = async (req, res, next) => {
  try {
    await Province.updateOne(
      {
        _id: req.params.id,
      },
      req.body
    );
    return res.status(200).json({
      message: "province updated",
    });
    c;
  } catch (error) {
    return next(error);
  }
};

exports.deleteProvince = async (req, res, next) => {
  try {
    await Province.deleteOne({
      _id: req.params.id,
    });
    return res.status(200).json({
      message: "province deleted",
    });
  } catch (error) {
    return next(error);
  }
};
