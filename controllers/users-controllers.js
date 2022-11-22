const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");
const {
  getUsersFromDB,
  getUserByIdFromDB,
  getUserByEmailFromDB,
  postUserToDB,
} = require("../services/users");

// const getUsers = async (req, res, next) => {
//   jwt.verify(req.token, "secretkey", async (err, authData) => {
//     if (err) return next(new HttpError("Invalid token.", 403));
//     else {
//       let users = await getUsersFromDB();
//       res.json({ users, data: authData });
//     }
//   });
// };

const refreshUser = async (req, res, next) => {
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if (err) return next(new HttpError("Invalid token or expired.", 403));
    else {
      let user = await getUserByIdFromDB(authData.userId);
      if (user.length === 0) {
        return next(new HttpError("Could not find a user with token id.", 404));
      }
      res.json({ data: authData, token: req.token });
    }
  });
};

const getUserById = async (req, res, next) => {
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if (err) return next(new HttpError("Invalid token.", 403));
    else {
      let user = await getUserByIdFromDB(req.params.uid);

      if (user.length === 0) {
        return next(
          new HttpError("Could not find a user for the provided id.", 404)
        );
      }
      res.json({ data: authData });
    }
  });
};

const signUp = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  let hasUser = await getUserByEmailFromDB(req.body.email);
  if (hasUser.length !== 0) {
    return next(
      new HttpError("Could not create user, email already in use.", 422)
    );
  }

  let user = await postUserToDB(req.body);

  res.status(201).json({
    data: {
      userId: user.id,
      email: user.email,
      token: await createJWT(user, next),
    },
    success: true,
  });
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  let users = await getUsersFromDB();

  const identifiedUser = users.find((u) => {
    return u.email === email && u.password === password;
  });

  if (!identifiedUser) {
    return next(
      new HttpError(
        "Could not identify user, credentials seem to be wrong.",
        401
      )
    );
  }

  res.json({
    data: {
      userId: identifiedUser.id,
      email: identifiedUser.email,
      token: await createJWT(identifiedUser, next),
    },
    success: true,
  });
};

const createJWT = async (data, next) => {
  try {
    //Creating jwt token
    return jwt.sign(
      {
        userId: data.id,
        email: data.email,
        name: data.name,
      },
      "secretkey",
      { expiresIn: "24h" }
    );
  } catch (err) {
    return next(new HttpError("Error! Something went wrong.", 403));
  }
};

//exports.getUsers = getUsers;
exports.refreshUser = refreshUser;
exports.getUserById = getUserById;
exports.signUp = signUp;
exports.login = login;
