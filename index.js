require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const connect = require("./db");
const routes = require("./routes");
const config = require("./config");
const app = express();

connect(config.db.test, config.db.options);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan("dev"));
app.use(cors());

app.use((req, res, next) => {
  req.header("Access-Control-Allow-Origin", "*");
  req.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use("/api", routes);

// eslint-disable-next-line
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  return res.json({
    message: err?.message,
    status: err.status,
    error: err,
  });
});

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
