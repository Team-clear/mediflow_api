const express = require("express");
const auth = require("../middleware/is-auth");
const { check, body } = require("express-validator/check");
const feedsController = require("../CONTROLLER/feed");
const usercontroller = require("../CONTROLLER/userAuth");
const route = express.Router();

route.post("/signup", usercontroller.signup);
route.post("/login", usercontroller.login);
module.exports = route;
