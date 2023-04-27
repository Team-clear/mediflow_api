const { validationResult } = require("express-validator/check");
//const user = require("../MODELS/user");
const path = require("path");
const bicrypt = require("bcryptjs");
const User = require("../MODELS/user");

const jwt = require("jsonwebtoken");

let loaderUser;

//signup user
exports.signup = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("invalid input when sign up");
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;

  const phone = req.body.phone;
  let hashedPass;

  try {
    hashedPass = await bicrypt.hash(password, 10);
  } catch (error) {
    console.log(` hashed error ${error}`);
  }

  try {
    let checkUser = await User.findOne({ Email: email });
    if (!checkUser) {
      let user = new User({
        Email: email,
        Phone: phone,
        First_name: firstname,
        Last_name: lastname,
        Password: hashedPass,
      });

      await user.save();
      console.log("user created");
      await res.status(201).json({
        message: "user successfully created",
      });
    } else {
      console.log("user exists");
      await res.status(400).json({ message: "user exists" });
    }
  } catch (error) {
    console.log(`register failed ${error}`);
  }
};

//login user

exports.login = async (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;

  let user;

  try {
    user = await User.findOne({ Email: email });
    if (!user) {
      res.status(404).json({
        message: "no user found",
      });
    } else {
      console.log(user);
      let status = await bicrypt.compare(password, user.Password);
      if (!status) {
        res.status(401).json({
          message: "inncorect password",
        });
      }

      const token = jwt.sign(
        {
          phoneNumber: user.email,
          userId: user._id.toString(),
        },
        "My stei my everything",
        { expiresIn: "24h" }
      );

      res.status(200).json({
        token: token,
        user: user,
      });
    }
  } catch (error) {
    console.log(error);
    //throw new Error("failed to login");
  }
};
