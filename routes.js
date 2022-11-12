const Router = require("express").Router();


const {
    logIn,
    register
} = require("./controllers/user");

const userRoutes = require("./appRoutes/user")


Router.post("/login", logIn);
Router.post("/register", register);


Router.use('/user',userRoutes)

module.exports = Router;
