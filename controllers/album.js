const Album = require("../models/album");

exports.addAlbum = async (req, res, next) => {
  try {
    // console.log(req);

    console.log(req.body);

    const album = new Album(req.body);
    album.profile = req.user?._id;
    console.log(album);
    await album.save();
    return res.status(200).json({ message: "album added" });
  } catch (error) {
    return next(error);
  }
};

exports.getAlbums = async (req, res, next) => {
  try {
    const stories = await Album.find({});
    return res.status(200).json(stories);
  } catch (error) {
    return next(error);
  }
};

exports.getParticularAlbum = async (req, res, next) => {
  try {
    const album = await Album.find({ _id: req.params.id });
    return res.status(200).json(album);
  } catch (error) {
    return next(error);
  }
};

exports.updateAlbum = async (req, res, next) => {
  try {
    await Album.updateOne(
      {
        _id: req.params.id,
      },
      req.body
    );
    return res.status(200).json({
      message: "album updated",
    });
  } catch (error) {
    return next(error);
  }
};
exports.deleteAlbum = async (req, res, next) => {
  try {
    await Album.updateOne(
      {
        _id: req.params.id,
      },
      req.body
    );
    return res.status(200).json({
      message: "album deleted",
    });
  } catch (error) {
    return next(error);
  }
};
