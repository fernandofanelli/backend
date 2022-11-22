const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  console.log("token: ", bearerHeader);
  if (typeof bearerHeader !== "undefined" || bearerHeader === "") {
    req.token = bearerHeader;
    next();
  } else {
    next("Authentication fail.");
  }
};

module.exports = verifyToken;
