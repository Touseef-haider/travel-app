const Router = require("express").Router();

const {
  getParticularCategory,
  updateCategory,
  getCategories,
  addCategory,
  deleteCategory,
} = require("../controllers/category");

const requireAuth = require("../middleware/auth");

Router.post("/", requireAuth, addCategory);
Router.get("/", requireAuth, getCategories);
Router.get("/:id", requireAuth, getParticularCategory);
Router.put("/:id", requireAuth, updateCategory);
Router.delete("/:id", requireAuth, deleteCategory);

module.exports = Router;
