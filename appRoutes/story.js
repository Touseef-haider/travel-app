const Router = require("express").Router();

const {
  addStory,
  getStories,
  getParticularStory,
  updateStory,
  deleteStory,
} = require("../controllers/story");

const requireAuth = require("../middleware/auth");

Router.post("/", requireAuth, addStory);
Router.get("/", requireAuth, getStories);
Router.get("/:id", requireAuth, getParticularStory);
Router.put("/:id", requireAuth, updateStory);
Router.delete("/:id", requireAuth, deleteStory);

module.exports = Router;
