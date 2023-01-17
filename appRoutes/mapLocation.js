const Router = require("express").Router();

const {
  getParticularMapLocation,
  updateMapLocation,
  getMapLocations,
  addMapLocation,
  deleteMapLocation,
} = require("../controllers/mapLocation");

const requireAuth = require("../middleware/auth");

Router.post("/", requireAuth, addMapLocation);
Router.get("/", requireAuth, getMapLocations);
Router.get("/:id", requireAuth, getParticularMapLocation);
Router.put("/:id", requireAuth, updateMapLocation);
Router.delete("/:id", requireAuth, deleteMapLocation);

module.exports = Router;
