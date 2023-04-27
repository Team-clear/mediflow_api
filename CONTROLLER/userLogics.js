const { validationResult } = require("express-validator/check");
const housedetail = require("../MODELS/ medicine");
const path = require("path");
const auth = require("../middleware/is-auth");
const User = require("../MODELS/user");
const { model } = require("mongoose");

exports.requestToBeAgent = (req, res, next) => {
  let userID = req.userId;
};

exports.returnAllusers = async (req, res, next) => {
  try {
    let users = await User.find();
    if (!users) {
      res.status(404).json({ message: "no users resgistered" });
    }

    res.status(200).json({ message: "users", user: users });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteUsers = async (req, res, next) => {};
