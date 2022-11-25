const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const {
  getBooksFromDB,
  getBookByBIDFromDB,
  getBookByISBNFromDB,
  getMatchingBooksFromDB,
  postBookToDB,
  updateBookByIdToDB,
} = require("../services/books");
const {
  getUserBooksByUIDAndBIDFromDB,
  deleteUserBooksByBIDToDB,
} = require("../services/user-books");
const {
  getAuthorFromDB,
  getAuthorByIdFromDB,
  postAuthorToDB,
} = require("../services/author");
const {
  getPublisherFromDB,
  getPublisherByIdFromDB,
  postPublisherToDB,
} = require("../services/publisher");
const {
  getGenreFromDB,
  getGenreByIdFromDB,
  postGenreToDB,
} = require("../services/genre");
const booksHelper = require("./helpers/books");
const userBooks = require("./helpers/user-books");

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

const getGenre = async (req, res, next) => {
  let genre = await getGenreByIdFromDB(req.params.bid, next);

  if (genre.length === 0) {
    return next(
      new HttpError("Could not find a genre for the provided id.", 404)
    );
  }

  res.json({ data: genre[0].name });
};

const getPublisher = async (req, res, next) => {
  let publisher = await getPublisherByIdFromDB(req.params.bid, next);

  if (publisher.length === 0) {
    return next(
      new HttpError("Could not find a genre for the provided id.", 404)
    );
  }

  res.json({ data: publisher[0].name });
};

const getAuthor = async (req, res, next) => {
  let author = await getAuthorByIdFromDB(req.params.bid, next);

  if (author.length === 0) {
    return next(
      new HttpError("Could not find a genre for the provided id.", 404)
    );
  }

  res.json({ data: author[0].name });
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

  let booksIsbn = await getBookByISBNFromDB(req.body.isbn);
  if (booksIsbn.length !== 0) {
    if (booksIsbn[0].title !== req.body.title) {
      return next(
        new HttpError("Book isbn already exists, should be unique.", 404)
      );
    }
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
  let publisherId = publisher.length !== 0 ? publisher[0].id : publisherData.id;

  let genre = await getGenreFromDB(req.body.genre);
  let genreData;
  if (genre.length === 0) {
    let body = { name: req.body.genre };
    genreData = await postGenreToDB(body);
  }
  let genreId = genre.length !== 0 ? genre[0].id : genreData.id;

  let book;
  const bookBody = {
    title: req.body.title,
    isbn: req.body.isbn,
    publication_date: req.body.publication_date,
    synopsis: req.body.synopsis,
    cover_image: req.body.cover_image,
    amount: req.body.amount,
    language: req.body.language.toLowerCase(),
    genre: genreId,
    publisher: publisherId,
    author: authorId,
  };
  if (booksIsbn.length !== 0 && booksIsbn[0].title === req.body.title) {
    bookBody.amount = booksIsbn[0].amount + 1;
    const bookId = await updateBookByIdToDB(booksIsbn[0].id, bookBody);
    book = await getBookByBIDFromDB(bookId);
    book = book[0];
  } else book = await postBookToDB(bookBody);

  console.log(book);

  const userBookBody = {
    user_id: req.body.uid,
    book_id: book.id,
    borrower_id: null,
    borrowed_date: null,
  };
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
  let books = await getBookByBIDFromDB(req.body.bid);
  if (books.length === 0) {
    return next(
      new HttpError("Could not find a book for the provided id.", 404)
    );
  }

  let booksToDelete = await getUserBooksByUIDAndBIDFromDB(
    req.body.bid,
    req.body.uid
  );

  console.log("Books to delete", booksToDelete);
  booksToDelete = booksToDelete.filter((b) => b.borrower_id === null);
  if (booksToDelete.length === 0) {
    return next(
      new HttpError("The book you want to delete is borrowed by an user.", 404)
    );
  }
  console.log(booksToDelete);

  let bookToDelete = booksToDelete[0];
  await deleteUserBooksByBIDToDB(bookToDelete.id);

  let book = books[0];
  const bookBody = {
    title: book.title,
    isbn: book.isbn,
    publication_date: book.publication_date,
    synopsis: book.synopsis,
    cover_image: book.cover_image,
    amount: book.amount - 1,
    language: book.language,
    genre: book.genre,
    publisher: book.publisher,
    author: book.author,
  };
  await updateBookByIdToDB(book.id, bookBody);

  res
    .status(200)
    .json({ data: book, message: "Deleted UserBooks and Updated Book." });
};

exports.getBooks = getBooks;
exports.getBookByBID = getBookByBID;
exports.getGenre = getGenre;
exports.getPublisher = getPublisher;
exports.getAuthor = getAuthor;
exports.getMatchingBooks = getMatchingBooks;
exports.createBook = createBook;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;
