const Router = require("express").Router();

const { logIn } = require("./controllers/user");

Router.post("/login", logIn);

module.exports = Router;
