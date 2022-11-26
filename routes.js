const Router = require("express").Router();

// Auth Controller Imports
const { logIn, register, forgotPassword } = require("./controllers/user");

// Others
const userRoutes = require("./appRoutes/user");
const profileRoutes = require("./appRoutes/profile");
const storyRoutes = require("./appRoutes/story");
const albumRoutes = require("./appRoutes/album");

// Auth Routes
Router.post("/login", logIn);
Router.post("/forgot_password", forgotPassword);
Router.post("/register", register);

// Other Routes
Router.use("/users", userRoutes);
Router.use("/profiles", profileRoutes);
Router.use("/stories", storyRoutes);
Router.use("/albums", albumRoutes);

module.exports = Router;
