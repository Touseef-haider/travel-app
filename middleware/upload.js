const multer = require("multer");

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    return cb(null, file.filename);
  },
  destination: (req, file, cb) => {
    return cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage,
});

const single = upload.single("file");
const multiple = upload.array("file", 10);

module.exports = {
  single,
  multiple,
};
