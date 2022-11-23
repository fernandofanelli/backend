const { Router } = require("express");

const userBooksControllers = require("../controllers/user-books-controllers");

const router = Router();

//Routes

router.post("/", userBooksControllers.orderBook);

module.exports = router;
