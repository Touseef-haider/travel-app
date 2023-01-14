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
    }).lean();

    return res.status(200).json(mapLocation);
  } catch (error) {
    return next(error);
  }
};

exports.getMapLocations = async (req, res, next) => {
  try {
    const mapLocations = await MapLocation.find({}).lean();

    return res.status(200).json(mapLocations);
  } catch (error) {
    return next(error);
  }
};

exports.updateMapLocation = async (req, res, next) => {
  try {
    await MapLocation.updateOne(
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
