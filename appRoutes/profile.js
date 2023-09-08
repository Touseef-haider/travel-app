const Router = require("express").Router();

const {
  getParticularProfile,
  updateProfile,
  getOwnProfile,
} = require("../controllers/profile");

const requireAuth = require("../middleware/auth");

Router.get("/getOwnProfile", requireAuth, getOwnProfile);
Router.get("/:id", requireAuth, getParticularProfile);
Router.put("/:id", requireAuth, updateProfile);

module.exports = Router;
