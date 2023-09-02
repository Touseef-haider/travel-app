const { addRating, getRatings, getParticularRating, updateRating, deleteRating } = require("../controllers/rating")

const Router = require("express").Router()

const requireAuth = require("../middleware/auth")

Router.post("/", [requireAuth], addRating);
Router.get("/", [requireAuth], getRatings)
Router.get("/:id", [requireAuth], getParticularRating)
Router.put("/:id", [requireAuth], updateRating)
Router.delete("/:id", [requireAuth], deleteRating)

module.exports = Router
