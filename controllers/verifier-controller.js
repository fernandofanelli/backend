const jwt = require("jsonwebtoken");
const HttpError = require("../models/http-error");


const getAuthTokenUID = (authToken) => {
  const decoded = jwt.decode(authToken, {complete: true});
  return decoded.payload.userId;
}

const compareAuthTokenUIDWithReq = ( authTokenUID, req) => {
  let uid;
  if(Boolean(req.params.uid)){
    uid = parseInt(req.params.uid)
  }
  else if(Boolean(req.body.uid)){
    uid = parseInt(req.body.uid)
  }
  else{
    uid = authTokenUID;
  }
  // console.log("uid ->", uid)
  // console.log("authTokenUID ->", authTokenUID)
  return authTokenUID === uid;
}


const verifyToken = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined" || bearerHeader === "") {
    const authTokenUID = getAuthTokenUID(bearerHeader);
    
    jwt.verify(bearerHeader, "secretkey", async (err, authData) => {
      req.authData = authData;
      if (err) {
        return next(new HttpError("Invalid token.", 403));
      }
      else{
        if(compareAuthTokenUIDWithReq( authTokenUID,req)) next();
      }
    });
  } else {
    return next(new HttpError("Authentication fail."));
  }
};

module.exports = verifyToken;
