const { Router } = require("express");
const { check } = require("express-validator");

const booksControllers = require("../controllers/books-controllers");

const router = Router();

//Routes

router.get("/", booksControllers.getBooks);

router.get("/:bid", booksControllers.getBookById);

router.get("/user/:uid", booksControllers.getBookByUserId);

router.post(
  "/",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  booksControllers.createBook
);

router.patch(
  "/:bid",
  [check("title").not().isEmpty(), check("description").isLength({ min: 5 })],
  booksControllers.updateBook
);

router.delete("/:bid", booksControllers.deleteBook);

module.exports = router;
