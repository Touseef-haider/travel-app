const Router = require("express").Router();

const {
  getParticularProfile,
  updateProfile,
  getOwnProfile,
} = require("../controllers/profile");

const requireAuth = require("../middleware/auth");

Router.get("/:id", requireAuth, getParticularProfile);
Router.get("/getOwnProfile", requireAuth, getOwnProfile);
Router.put("/:id", requireAuth, updateProfile);

module.exports = Router;
