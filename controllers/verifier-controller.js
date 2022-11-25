const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");

const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined" || bearerHeader === "") {
    jwt.verify(bearerHeader, "secretkey", async (err, authData) => {
      req.authData = authData;
      if (err) return next(new HttpError("Invalid token.", 403));
      else next();
    });
  } else {
    return next(new HttpError("Authentication fail."));
  }
};

module.exports = verifyToken;
