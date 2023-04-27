const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const theRoutes = require("./ROUTES/route");
const authroute = require("./ROUTES/auth");
const { check, body } = require("express-validator");
//const usercontroller = require("./CONTROLLER/user");

const MONGODB_URI = "mongodb://localhost:ort /Stei";

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

var db = require("./config/database.js");

const multer = require("multer");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
);
app.use(express.static(path.join(__dirname, "images")));
app.use(theRoutes);
app.use(authroute);

db();
app.listen(8045, () => {
  console.log("server is listening at: 8045 ");
});
