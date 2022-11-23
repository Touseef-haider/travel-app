const Router = require("express").Router();

const { logIn, register, forgotPassword } = require("./controllers/user");

const userRoutes = require("./appRoutes/user");

Router.post("/login", logIn);
Router.post("/forgot_password", forgotPassword);
Router.post("/register", register);

Router.use("/user", userRoutes);

module.exports = Router;
