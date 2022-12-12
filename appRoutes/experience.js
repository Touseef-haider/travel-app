const Router = require("express").Router();

const {
  addExperience,
  getExperiences,
  getParticularExperience,
  updateExperience,
  deleteExperience,
} = require("../controllers/experience");

const requireAuth = require("../middleware/auth");
const { multiple } = require("../middleware/upload");

Router.post("/", requireAuth, multiple, addExperience);
Router.get("/", requireAuth, getExperiences);
Router.get("/:id", requireAuth, getParticularExperience);
Router.put("/:id", requireAuth, updateExperience);
Router.delete("/:id", requireAuth, deleteExperience);

module.exports = Router;
