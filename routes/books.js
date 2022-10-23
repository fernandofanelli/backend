const express = require("express");

const booksControllers = require("../controllers/books-controllers");

const router = express.Router();

router.get("/:bid", booksControllers.getBookById);

router.get("/user/:uid", booksControllers.getBookByUserId);

router.post("/", booksControllers.createBook);

module.exports = router;
