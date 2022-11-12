const Router = require("express").Router();

const {
    getParticularProfile,
    addCampusInProfile,
    updateProfile,
    getOwnProfile,
} = require("../controllers/profile");

const requireAuth = require("../middlewares/auth");

Router.get("/getOwnProfile", requireAuth, getOwnProfile);
Router.get("/:id", [requireAuth], getParticularProfile);
Router.put("/:id", requireAuth, updateProfile);
Router.put("/addCampus/:id", [requireAuth], addCampusInProfile);

module.exports = Router;
