const Router = require("express").Router();

const {
  addExperience,
  getExperiences,
  getParticularExperience,
  updateExperience,
  addCommentInExperience,
  updateCommentInExperience,
  deleteCommentFromExperience,
  updateLikeInExperience,
  updateLikeOnPostInExperience,
  deleteExperience,
} = require("../controllers/experience");

const requireAuth = require("../middleware/auth");
const { multiple } = require("../middleware/upload");

Router.post("/", requireAuth, multiple, addExperience);
Router.get("/", getExperiences);
Router.get("/:id", requireAuth, getParticularExperience);
Router.put("/:id", requireAuth, updateExperience);
Router.put("/comment/:id", requireAuth, addCommentInExperience);
Router.put("/comment/:id/:commentId", requireAuth, updateCommentInExperience);
Router.put("/like/:id/:commentId", requireAuth, updateLikeInExperience);
Router.put("/likeOnPost/:id", requireAuth, updateLikeOnPostInExperience);
Router.delete(
  "/comment/:id/:commentId",
  requireAuth,
  deleteCommentFromExperience
);
Router.delete("/:id", requireAuth, deleteExperience);

module.exports = Router;
