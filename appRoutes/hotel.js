const Router = require("express").Router();

const {
  getParticularHotel,
  updateHotel,
  getHotels,
  addHotel,
  deleteHotel,
} = require("../controllers/hotel");

const requireAuth = require("../middleware/auth");

Router.post("/", requireAuth, addHotel);
Router.get("/", requireAuth, getHotels);
Router.get("/:id", requireAuth, getParticularHotel);
Router.put("/:id", requireAuth, updateHotel);
Router.put("/:id", requireAuth, deleteHotel);

module.exports = Router;
