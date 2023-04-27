const express = require("express");
const isAuth = require("../middleware/is-auth");

const { check, body } = require("express-validator/check");
const feedsController = require("../CONTROLLER/feed");
const mockData = require("../CONTROLLER/mockController");
const userController = require("../CONTROLLER/userLogics");
const route = express.Router();

route.get("/allMedicines", feedsController.showMedicines);
route.get("/searchMedicine/", feedsController.searchMedicine);
// route.delete("/deletePost/:postId", isAuth, feedsController.deleteHouse);
// route.put("/updateHouse/:postId", isAuth, feedsController.updateHouse);
// route.get("/district/", feedsController.getDistricts);
// route.get("/street/", feedsController.getWards);
// route.get("/users", userController.returnAllusers);
// route.get("/userProps", isAuth, feedsController.userProperties);
module.exports = route;
