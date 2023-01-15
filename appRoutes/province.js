const Router = require("express").Router();

const {
  getParticularProvince,
  updateProvince,
  getProvinces,
  addCityInProvince,
  removeCityFromProvince,
  addProvince,
  deleteProvince,
} = require("../controllers/province");

const requireAuth = require("../middleware/auth");

Router.post("/", requireAuth, addProvince);
Router.get("/", requireAuth, getProvinces);
Router.get("/:id", requireAuth, getParticularProvince);
Router.put("/city/:id", requireAuth, addCityInProvince);
Router.delete("/city/:id/:cityId", requireAuth, removeCityFromProvince);
Router.put("/:id", requireAuth, updateProvince);
Router.put("/:id", requireAuth, deleteProvince);

module.exports = Router;
