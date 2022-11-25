const { Router } = require("express");
const { check } = require("express-validator");

const booksControllers = require("../controllers/books-controllers");
const verifyToken = require("../controllers/verifier-controller");

const router = Router();

//Routes

router.get("/", booksControllers.getBooks);

router.get("/:bid", booksControllers.getBookByBID);

router.get("/genre/:id", booksControllers.getGenre);

router.get("/publisher/:id", booksControllers.getPublisher);

router.get("/author/:id", booksControllers.getAuthor);

router.get("/search/:searchValue", booksControllers.getMatchingBooks);

router.post(
  "/",
  verifyToken,
  [
    check("title").not().isEmpty().isLength({ max: 60 }),
    check("isbn").not().isEmpty().isLength({ max: 13 }),
    check("publication_date").not().isEmpty().isLength({ max: 4 }),
    check("synopsis").not().isEmpty().isLength({ max: 1100 }),
    check("cover_image").not().isEmpty().isLength({ max: 200 }),
    check("language").not().isEmpty().isLength({ max: 2 }),
    check("genre").not().isEmpty().isLength({ max: 20 }),
    check("publisher").not().isEmpty().isLength({ max: 30 }),
    check("author").not().isEmpty().isLength({ max: 30 }),
  ],
  booksControllers.createBook
);

router.patch(
  "/:bid",
  verifyToken,
  [
    check("title").not().isEmpty(),
    check("isbn").not().isEmpty().isLength({ max: 13 }),
    check("publication_date").not().isEmpty().isLength({ max: 4 }),
    check("synopsis").not().isEmpty().isLength({ max: 1100 }),
    check("cover_image").not().isEmpty(),
    check("language").not().isEmpty().isLength({ max: 2 }),
    check("genre").not().isEmpty().isNumeric(),
    check("publisher").not().isEmpty().isNumeric(),
    check("author").not().isEmpty().isNumeric(),
  ],
  booksControllers.updateBook
);

router.delete("/", verifyToken, booksControllers.deleteBook);

module.exports = router;
