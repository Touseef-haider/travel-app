const Router = require("express").Router();
const requireAuth = require("../middleware/auth");
const {
    getUsers,
    getParticularUser,
    deleteUser,
} = require("../controllers/user");

Router.get(
    "/",
    getUsers
);

Router.get("/:id", [requireAuth], getParticularUser);


Router.delete(
    "/:id",
    [requireAuth],
    deleteUser
);

module.exports = Router;
