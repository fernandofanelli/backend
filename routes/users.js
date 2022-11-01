const { Router } = require("express");
const { check } = require("express-validator");
const users = require("../services/users");

const usersControllers = require("../controllers/users-controllers");

const router = Router();

//Routes

router.get("/", usersControllers.getUsers);
router.get("/:uid", usersControllers.getUserById);
router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersControllers.signUp
);
router.post("/login", usersControllers.login);

router.get("/db/user", async function (req, res, next) {
  try {
    res.json(await users.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting quotes `, err.message);
    next(err);
  }
});

module.exports = router;
