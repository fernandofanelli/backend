const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const {
  getBooksFromDB,
  getBookByBIDFromDB,
  getMatchingBooksFromDB,
  postBookToDB,
  updateBookByIdToDB,
  deleteBookByIdToDB,
} = require("../services/books");

const { getAuthorFromDB, postAuthorToDB } = require("../services/author");

const booksHelper = require("./helpers/books");
const userBooks = require("./helpers/user-books");
const {
  getPublisherFromDB,
  postPublisherToDB,
} = require("../services/publisher");
const { getGenreFromDB, postGenreToDB } = require("../services/genre");

const getBooks = async (req, res, next) => {
  let books = await getBooksFromDB();
  res.json({ books });
};

const getBookByBID = async (req, res, next) => {
  let book = await booksHelper.getBookUsingId(req.params.bid, next);

  if (book.length === 0) {
    return next(
      new HttpError("Could not find a book for the provided id.", 404)
    );
  }

  res.json({ data: book[0] });
};

const getMatchingBooks = async (req, res, next) => {
  let books = await getMatchingBooksFromDB(req.params.searchValue);
  res.json({ data: books });
};

const createBook = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  let author = await getAuthorFromDB(req.body.author);
  let authorData;
  if (author.length === 0) {
    let body = { name: req.body.author };
    authorData = await postAuthorToDB(body);
  }
  let authorId = author.length !== 0 ? author[0].id : authorData.id;

  let publisher = await getPublisherFromDB(req.body.publisher);
  let publisherData;
  if (publisher.length === 0) {
    let body = { name: req.body.publisher };
    publisherData = await postPublisherToDB(body);
  }
  let publisherId = author.length !== 0 ? publisher[0].id : publisherData.id;

  let genre = await getGenreFromDB(req.body.genre);
  let genreData;
  if (genre.length === 0) {
    let body = { name: req.body.genre };
    genreData = await postGenreToDB(body);
  }
  let genreId = genre.length !== 0 ? genre[0].id : genreData.id;

  const bookBody = {
    title: req.body.title,
    isbn: req.body.isbn,
    publication_date: req.body.publication_date,
    synopsis: req.body.synopsis,
    cover_image: req.body.cover_image,
    amount: 1,
    language: req.body.language,
    genre: genreId,
    publisher: publisherId,
    author: authorId,
  };
  let book = await postBookToDB(bookBody);

  const userBookBody = {
    user_id: req.body.uid,
    book_id: book.id,
    borrower_id: null,
    borrowed_date: null,
  };
  console.log(userBookBody);
  await userBooks.postUserBooks(userBookBody);

  res.status(201).json({ data: book });
};

const updateBook = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  let book = await updateBookByIdToDB(req.params.bid, req.body);

  res.status(200).json({ data: book });
};

const deleteBook = async (req, res, next) => {
  let book = await getBookByBIDFromDB(req.params.bid);

  if (book.length === 0) {
    return next(
      new HttpError("Could not find a book for the provided id.", 404)
    );
  }

  book = await deleteBookByIdToDB(req.params.bid);

  res.status(200).json({ data: book, message: "Deleted Book." });
};

exports.getBooks = getBooks;
exports.getBookByBID = getBookByBID;
exports.getMatchingBooks = getMatchingBooks;
exports.createBook = createBook;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;
