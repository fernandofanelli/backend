const { Router } = require("express");
const { check } = require("express-validator");

const usersControllers = require("../controllers/users-controllers");
const verifyToken = require("../controllers/verifier-controller");

const router = Router();

//Routes

router.get("/", verifyToken, usersControllers.getUsers);
router.get("/:uid", verifyToken, usersControllers.getUserById);
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

module.exports = router;
