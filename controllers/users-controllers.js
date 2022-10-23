const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");

const DUMMY_USERS_BOOKS = [
  {
    id: "1",
    name: "Fernando Fanelli",
    bookId: "b1",
  },
  {
    id: "2",
    name: "Agus Bondiola",
    bookId: "b2",
  },
];

const DUMMY_USERS = [
  {
    id: "u1",
    name: "Fernando Fanelli",
    email: "f_ferg@hotmail.com",
    password: "fercha",
  },
  {
    id: "u2",
    name: "Agustin Bondiola",
    email: "agus@gmail.com",
    password: "bondiola",
  },
  {
    id: "u3",
    name: "Santiago Barbier",
    email: "zapa@gmail.com",
    password: "zapato",
  },
];

const getUsers = (req, res, next) => {
  res.json({ DUMMY_USERS });
};

const getUserById = (req, res, next) => {
  console.log(req.params.uid);
  const userId = req.params.uid;

  const user = DUMMY_USERS.find((u) => {
    return u.id === userId;
  });

  if (!user) {
    return next(
      new HttpError("Could not find a user for the provided id.", 404)
    );
  }

  res.json({ user });
};

const signUp = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { name, email, password } = req.body;

  const hasUSer = DUMMY_USERS.find((u) => {
    return u.email === email;
  });

  if (hasUSer) {
    return next(
      new HttpError("Could not create user, email already in use.", 422)
    );
  }

  const createdUser = {
    id: uuidv4(),
    name,
    email,
    password,
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((u) => {
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
