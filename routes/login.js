const express = require("express");
const router = express.Router();

const DUMMY_USERS = [
  {
    id: 1,
    username: "agus@gmail.com",
    password: "bondiola",
  },
  {
    id: 2,
    username: "fer@gmail.com",
    password: "fercha",
  },
  {
    id: 3,
    username: "zapa@gmail.com",
    password: "zapato",
  },
];

router.post("/user/algo", (req, res) => {
  console.log(req.body);
  const username = req.body.username;
  const password = req.body.password;
  res.send({ username: { username }, password: { password } });
});

module.exports = router;
