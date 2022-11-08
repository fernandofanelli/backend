const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const {
  getUsersFromDB,
  getUserByIdFromDB,
  getUserByEmailFromDB,
  postUserToDB,
} = require("../services/users");

const getUsers = async (req, res, next) => {
  let users = await getUsersFromDB();
  res.json({ users });
};

const getUserById = async (req, res, next) => {
  let user = await getUserByIdFromDB(req.params.uid);

  if (user.length === 0) {
    return next(
      new HttpError("Could not find a user for the provided id.", 404)
    );
  }

  //Delete password retrival from here
  res.json({ user });
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
  res.status(201).json({ user: user });
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

  res.json({ identifiedUser, message: "Logged in" });
};

exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.signUp = signUp;
exports.login = login;
