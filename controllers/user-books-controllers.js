const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const { getBookById } = require("./books-controllers");
const {
  getBooksOwnerToBorrowedFromDB,
  updateBookByIdToDB,
} = require("../services/user-books");

const getBooksOwnerToBorrowedById = async (req, res, next) => {
  let books = await getBooksOwnerToBorrowedFromDB(req.body.bid);

  if (!books || books.length === 0) {
    return next(
      new HttpError("Could not find a book for the provided book id.", 404)
    );
  }

  res.json({ books });
};

const orderBook = async (req, res, next) => {
  let book = await getBookById(req)
    .json()
    .then((d) => d);
  let userBook = await getBooksOwnerToBorrowedById(req)
    .json()
    .then((d) => d);

  book.amount = book.amount - 1;
  book = await updateBookByIdToDB(req.body.bid, book);

  const body = {
    user_id: req.body.uid,
    book_id: req.body.bid,
    borrower_id: req.body.ubid,
    borrowed_date: "",
  };
  book = await updateBookByIdToDB(userBook.id, body);

  res.status(201).json({ message: "Success" });
};

exports.orderBook = orderBook;
