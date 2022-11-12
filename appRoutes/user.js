const Router = require("express").Router();
const requireAuth = require("../middlewares/auth");
const {
    getUsers,
    addUser,
    getParticularUser,
    deleteUser,
    updateUser,
} = require("../controllers/user");
const { ROLES } = require("../utils/constant");

Router.get(
    "/",
    [requireAuth],
    getUsers
);

Router.get("/:id", [requireAuth], getParticularUser);


Router.post(
    "/",
    [requireAuth],
    addUser
);

Router.put(
    "/:id",
    [requireAuth],
    updateUser
);

Router.delete(
    "/:id",
    [requireAuth],
    deleteUser
);

module.exports = Router;
