const { Router } = require("express");
const { check } = require("express-validator");

const booksControllers = require("../controllers/books-controllers");
const verifyToken = require("../controllers/verifier-controller");

const router = Router();

//Routes

router.get("/", booksControllers.getBooks);

router.get("/user", verifyToken, booksControllers.getAllBooksOwnerId);

router.get("/:bid", booksControllers.getBookById);

router.get("/user/:uid", verifyToken, booksControllers.getBooksOwnerById);
router.get("/search/:searchValue", booksControllers.getMatchingBooks);

router.post(
  "/",
  verifyToken,
  [
    check("title").not().isEmpty(),
    check("isbn").not().isEmpty().isNumeric().isLength({ max: 13 }),
    check("publication_date").not().isEmpty().isLength({ max: 4 }),
    check("synopsis").not().isEmpty().isLength({ max: 1100 }),
    check("cover_image").not().isEmpty(),
    check("language").not().isEmpty().isLength({ max: 2 }),
    check("genre").not().isEmpty().isNumeric(),
    check("publisher").not().isEmpty().isNumeric(),
    check("author").not().isEmpty().isNumeric(),
  ],
  booksControllers.createBook
);

router.patch(
  "/:bid",
  verifyToken,
  [
    check("title").not().isEmpty(),
    check("isbn").not().isEmpty().isNumeric().isLength({ max: 13 }),
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

router.delete("/:bid", verifyToken, booksControllers.deleteBook);

module.exports = router;
