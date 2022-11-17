const { Router } = require("express");
const { check } = require("express-validator");

const userBooksControllers = require("../controllers/user-books-controllers");

const router = Router();

//Routes

router.post("/", userBooksControllers.orderBook);

module.exports = router;
