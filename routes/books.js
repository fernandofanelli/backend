const { Router } = require("express");
const { check } = require("express-validator");

const booksControllers = require("../controllers/books-controllers");
const { dataSource } = require("../config");
const Book = require("../entity/Book");

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

router.get("/orm/books", async function (req, res, next) {
  try {
    let books = await dataSource.query(
      "select * from project.books where id = 1"
    );
    console.log("books: " + books);

    books = await dataSource
      .getRepository(Book)
      .query("select * from project.books where id = 1");
    console.log("books: " + books);

    books = await dataSource
      .getRepository(Book)
      .createQueryBuilder()
      .select()
      .from(Book)
      .getMany();
    console.log("books: " + books);

    let a = dataSource
      .getRepository(Book)
      .createQueryBuilder()
      .select()
      .from(Book);

    console.log(a);

    res.json(books);
  } catch (error) {
    console.error(`Error while getting books `, error.message);
    next(error);
  }
});

module.exports = router;
