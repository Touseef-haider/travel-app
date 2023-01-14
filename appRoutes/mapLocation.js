const Router = require("express").Router();

const {
  getParticularMapLocation,
  updateMapLocation,
  getMapLocations,
  addMapLocation,
} = require("../controllers/mapLocation");

const requireAuth = require("../middleware/auth");

Router.post("/", requireAuth, addMapLocation);
Router.get("/", requireAuth, getMapLocations);
Router.get("/:id", requireAuth, getParticularMapLocation);
Router.put("/:id", requireAuth, updateMapLocation);

module.exports = Router;
