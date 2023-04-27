const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let token = req.get("Authorization");
  token = token.replace("Bear", "").trim();

  let decodeToken;
  try {
    decodeToken = jwt.verify(token, "My stei my everything");
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }

  if (!decodeToken) {
    const error = new Error("Not authorised");
    error.statusCode = 401;
    throw error;
  }

  req.userId = decodeToken.userId;

  next();
};
