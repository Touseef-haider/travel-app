const Hotel = require("../models/hotel");

exports.addHotel = async (req, res, next) => {
  try {
    const hotel = new Hotel(req.body);

    await hotel.save();

    return res.status(200).json({
      message: "hotel added",
    });
  } catch (error) {
    return next(error);
  }
};

exports.getParticularHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById({
      _id: req.params.id,
    }).lean();

    return res.status(200).json(hotel);
  } catch (error) {
    return next(error);
  }
};

exports.getHotels = async (req, res, next) => {
  try {
    const Hotels = await Hotel.find({}).lean();

    return res.status(200).json(Hotels);
  } catch (error) {
    return next(error);
  }
};

exports.updateHotel = async (req, res, next) => {
  try {
    await Hotel.updateOne(
      {
        _id: req.params.id,
      },
      req.body
    );
    return res.status(200).json({
      message: "hotel updated",
    });
  } catch (error) {
    return next(error);
  }
};

exports.deleteHotel = async (req, res, next) => {
  try {
    await Hotel.deleteOne({
      _id: req.params.id,
    });
    return res.status(200).json({
      message: "hotel deleted",
    });
  } catch (error) {
    return next(error);
  }
};
