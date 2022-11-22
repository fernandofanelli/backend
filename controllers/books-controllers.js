const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/http-error");
const {
  getBooksFromDB,
  getBookByIdFromDB,
  getBooksOwnerFromDB,
  getAllBooksOwnerFromDB,
  postBookToDB,
  updateBookByIdToDB,
  deleteBookByIdToDB,
} = require("../services/books");

const { getUserByIdFromDB } = require("../services/users");

const getBooks = async (req, res, next) => {
  let books = await getBooksFromDB();
  res.json({ books });
};

const getBookById = async (req, res, next) => {
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if (err) return next(new HttpError("Invalid token.", 403));
    else {
      let book = await getBookByIdFromDB(req.params.bid);

      if (book.length === 0) {
        return next(
          new HttpError("Could not find a book for the provided id.", 404)
        );
      }

      res.json({ data: book });
    }
  });
};

const getBooksOwnerById = async (req, res, next) => {
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if (err) return next(new HttpError("Invalid token.", 403));
    else {
      let user = await getUserByIdFromDB(req.params.uid);

      if (!user || user.length === 0) {
        return next(
          new HttpError("Could not find a user for the provided user id.", 404)
        );
      }

      let books = await getBooksOwnerFromDB(req.params.uid);

      if (!books || books.length === 0) {
        return next(
          new HttpError("Could not find a book for the provided user id.", 404)
        );
      }

      res.json({ data: books });
    }
  });
};

const getAllBooksOwnerId = async (req, res, next) => {
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if (err) return next(new HttpError("Invalid token.", 403));
    else {
      let books = await getAllBooksOwnerFromDB();

      if (!books || books.length === 0) {
        return next(
          new HttpError("Could not find a book for the provided user id.", 404)
        );
      }

      res.json({ data: books });
    }
  });
};

const createBook = async (req, res, next) => {
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if (err) return next(new HttpError("Invalid token.", 403));
    else {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          new HttpError("Invalid inputs passed, please check your data.", 422)
        );
      }

      let book = await postBookToDB(req.body);

      res.status(201).json({ data: book });
    }
  });
};

const updateBook = async (req, res, next) => {
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if (err) return next(new HttpError("Invalid token.", 403));
    else {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(
          new HttpError("Invalid inputs passed, please check your data.", 422)
        );
      }

      let book = await updateBookByIdToDB(req.params.bid, req.body);

      res.status(200).json({ data: book });
    }
  });
};

const deleteBook = async (req, res, next) => {
  jwt.verify(req.token, "secretkey", async (err, authData) => {
    if (err) return next(new HttpError("Invalid token.", 403));
    else {
      let book = await getBookByIdFromDB(req.params.bid);

      if (book.length === 0) {
        return next(
          new HttpError("Could not find a book for the provided id.", 404)
        );
      }

      book = await deleteBookByIdToDB(req.params.bid);

      res.status(200).json({ data: book, message: "Deleted Book." });
    }
  });
};

exports.getBooks = getBooks;
exports.getBookById = getBookById;
exports.getBooksOwnerById = getBooksOwnerById;
exports.getAllBooksOwnerId = getAllBooksOwnerId;
exports.createBook = createBook;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;
