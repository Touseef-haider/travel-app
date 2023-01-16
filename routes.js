const createHttpError = require("http-errors");
const Router = require("express").Router();
const { upload, uploadFilesToS3 } = require("./s3");

const { validateMIMEType } = require("validate-image-type");

// Auth Controller Imports
const { logIn, register, forgotPassword } = require("./controllers/user");

// Others
const userRoutes = require("./appRoutes/user");
const profileRoutes = require("./appRoutes/profile");
const experienceRoutes = require("./appRoutes/experience");
const mapLocationRoutes = require("./appRoutes/mapLocation");
const provinceRoutes = require("./appRoutes/province");
const categoryRoutes = require("./appRoutes/category");
const hotelRoutes = require("./appRoutes/hotel");

// Auth Routes
Router.post("/login", logIn);
Router.post("/forgot_password", forgotPassword);
Router.post("/register", register);

// Other Routes
Router.use("/users", userRoutes);
Router.use("/profiles", profileRoutes);
Router.use("/experience", experienceRoutes);
Router.use("/mapLocation", mapLocationRoutes);
Router.use("/category", categoryRoutes);
Router.use("/province", provinceRoutes);
Router.use("/hotel", hotelRoutes);

// for storing single file
Router.post("/upload", upload, async (req, res, next) => {
  try {
    const validationResult = await validateMIMEType(req.file.path, {
      originalFilename: req.file.originalname,
      allowMimeTypes: ["image/jpeg", "image/jpg", "image/png"],
    });

    console.log(validationResult);

    if (!validationResult.ok) {
      return next(createHttpError(400, "File format  is not allowed"));
    }

    if (req.file.size > 25000000) {
      return next(
        createHttpError(413, "File size is too large, should be less than 25mb")
      );
    }

    return uploadFilesToS3(req.file, (result) => {
      console.log("----", result);
      return res.status(200).json(result);
    });
  } catch (error) {
    return next(error);
  }
});

module.exports = Router;
