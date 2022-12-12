const multer = require("multer");

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.filename);
  },
  destination: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
});

const single = upload.single("file");
const multiple = upload.array("files", 10);

module.exports = {
  single,
  multiple,
};
