const Router = require("express").Router();

// Auth Controller Imports
const { logIn, register, forgotPassword } = require("./controllers/user");

// Others
const userRoutes = require("./appRoutes/user");
const profileRoutes = require("./appRoutes/profile");
const experienceRoutes = require("./appRoutes/experience");

// Auth Routes
Router.post("/login", logIn);
Router.post("/forgot_password", forgotPassword);
Router.post("/register", register);

// Other Routes
Router.use("/users", userRoutes);
Router.use("/profiles", profileRoutes);
Router.use("/experience", experienceRoutes);

module.exports = Router;
