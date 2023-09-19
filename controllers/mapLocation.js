const MapLocation = require("../models/mapLocation");

exports.addMapLocation = async (req, res, next) => {
  try {
    const mapLocation = new MapLocation(req.body);

    await mapLocation.save();

    return res.status(200).json({
      message: "map location added",
    });
  } catch (error) {
    return next(error);
  }
};

exports.getParticularMapLocation = async (req, res, next) => {
  try {
    const mapLocation = await MapLocation.findById({
      _id: req.params.id,
    })
      .populate(["hotels", "country.province", "category", "accessibilities"])
      .lean();

    return res.status(200).json(mapLocation);
  } catch (error) {
    return next(error);
  }
};

exports.getMapLocations = async (req, res, next) => {
  try {
    const mapLocations = await MapLocation.find({})
      .populate(["hotels", "country.province", "category", "accessibilities"])
      .sort({
        rating:-1
      })
      .lean();

    return res.status(200).json(mapLocations);
  } catch (error) {
    return next(error);
  }
};

exports.updateMapLocation = async (req, res, next) => {
  try {
    await MapLocation.findByIdAndUpdate(
      {
        _id: req.params.id,
      },
      req.body
    );
    return res.status(200).json({
      message: "mapLocation updated",
    });
  } catch (error) {
    return next(error);
  }
};
exports.deleteMapLocation = async (req, res, next) => {
  try {
    await MapLocation.deleteOne({
      _id: req.params.id,
    });
    return res.status(200).json({
      message: "mapLocation deleted",
    });
  } catch (error) {
    return next(error);
  }
};
