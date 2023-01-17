const Router = require("express").Router();

const {
  getParticularAccessibility,
  updateAccessibility,
  getAccessibilities,
  addAccessibility,
  deleteAccessibility,
} = require("../controllers/accessibility");

const requireAuth = require("../middleware/auth");

Router.post("/", requireAuth, addAccessibility);
Router.get("/", requireAuth, getAccessibilities);
Router.get("/:id", requireAuth, getParticularAccessibility);
Router.put("/:id", requireAuth, updateAccessibility);
Router.delete("/:id", requireAuth, deleteAccessibility);

module.exports = Router;
