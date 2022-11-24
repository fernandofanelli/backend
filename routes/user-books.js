const { Router } = require("express");

const userBooksControllers = require("../controllers/user-books-controllers");
const verifyToken = require("../controllers/verifier-controller");

const router = Router();

//Routes

router.get("/user", verifyToken, userBooksControllers.getAllUserBooks);

router.get(
  "/user/:uid",
  verifyToken,
  userBooksControllers.getUserBooksOwnedByUID
);

router.get(
  "/user/borrowed/:uid",
  verifyToken,
  userBooksControllers.getUserBooksBorrowedByUID
);

router.post("/", verifyToken, userBooksControllers.orderBook);

router.patch("/", verifyToken, userBooksControllers.returnBook);

module.exports = router;
