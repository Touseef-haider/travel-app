const Router = require("express").Router();

const {
  addAlbum,
  getAlbums,
  getParticularAlbum,
  updateAlbum,
  deleteAlbum,
} = require("../controllers/album");

const requireAuth = require("../middleware/auth");
const { multiple } = require("../middleware/upload");

Router.post("/", multiple, requireAuth, addAlbum);
Router.get("/", requireAuth, getAlbums);
Router.get("/:id", requireAuth, getParticularAlbum);
Router.put("/:id", requireAuth, updateAlbum);
Router.delete("/:id", requireAuth, deleteAlbum);

module.exports = Router;
