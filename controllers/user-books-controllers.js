const HttpError = require("../models/http-error");
const booksHelper = require("./helpers/books");
const {
  getBooksAvailableByBIDFromDB,
  getBooksNonAvailableByBIDAndUIDFromDB,
  getUserBooksBorrowedByUIDFromDB,
  getUserBooksByUIDFromDB,
  getAllUserBooksFromDB,
  updateBookByIdToDB,
  updateUserBooksToDB,
} = require("../services/user-books");
const dateUtil = require("../utils/dateUtil");

const getUserBooksOwnedByUID = async (req, res, next) => {
  let userBooks = await getUserBooksByUIDFromDB(req.params.uid);

  if (!userBooks || userBooks.length === 0) {
    res.json({ data: [] });
  } else {
    let books = [];

    await Promise.all(
      userBooks.map(async (ub) => {
        let book = await booksHelper.getBookUsingId(ub.book_id, next);
        if (typeof book !== "undefined") books.push(...book);
      })
    );

    res.json({ data: books });
  }
};

const getUserBooksBorrowedByUID = async (req, res, next) => {
  let userBooks = await getUserBooksBorrowedByUIDFromDB(req.params.uid);

  if (!userBooks || userBooks.length === 0) {
    res.json({ data: [] });
  } else {
    let books = [];

    await Promise.all(
      userBooks.map(async (ub) => {
        let book = await booksHelper.getBookUsingId(ub.book_id, next);
        books.push(...book);
      })
    );

    res.json({ data: books });
  }
};

const getAllUserBooks = async (req, res, next) => {
  let books = await getAllUserBooksFromDB();

  if (!books || books.length === 0) {
    return next(
      new HttpError("Could not find a book for the provided user id.", 404)
    );
  }

  res.json({ data: books });
};

const orderBook = async (req, res, next) => {
  let amountOfBooksOrderedByUser = await getUserBooksBorrowedByUIDFromDB(
    req.body.uid
  );

  if (amountOfBooksOrderedByUser.length > 4) {
    return next(
      new HttpError("User exceeds the amount of books to borrow.", 403)
    );
  }

  let book = await booksHelper.getBookUsingId(req.body.bid, next);

  let userBook = await getBooksAvailableByBIDFromDB(req.body.bid);

  if (!userBook || userBook.length === 0) {
    return next(
      new HttpError("Could not find a book for the provided book id.", 404)
    );
  }

  let updatedBook = book.find((b) => {
    if (b.id === req.body.bid) {
      b.amount = b.amount - 1;
      return b;
    }
  });
  await updateBookByIdToDB(req.body.bid, updatedBook);

  const body = {
    user_id: parseInt(userBook[0].user_id), //belongs to the book owner
    book_id: parseInt(userBook[0].book_id),
    borrower_id: req.body.uid, //belongs to the user that order that book
    borrowed_date: dateUtil.getCurrentDate(),
  };

  await updateUserBooksToDB(userBook[0].id, body);

  res.status(201).json({ message: "Success" });
};

const returnBook = async (req, res, next) => {
  let book = await booksHelper.getBookUsingId(req.body.bid, next);
  let userBook = await getBooksNonAvailableByBIDAndUIDFromDB(
    req.body.bid,
    req.body.uid
  );

  if (!userBook || userBook.length === 0) {
    return next(
      new HttpError("Could not find a book for the provided book id.", 404)
    );
  }

  let updatedBook = book.find((b) => {
    if (b.id === req.body.bid) {
      b.amount = b.amount + 1;
      return b;
    }
  });
  await updateBookByIdToDB(req.body.bid, updatedBook);

  const body = {
    user_id: parseInt(userBook[0].user_id), //belongs to the book owner
    book_id: parseInt(userBook[0].book_id),
    borrower_id: null, //belongs to the user that order that book
    borrowed_date: null,
  };

  await updateUserBooksToDB(userBook[0].id, body);

  res.status(200).json({ message: "Success" });
};

exports.getUserBooksOwnedByUID = getUserBooksOwnedByUID;
exports.getUserBooksBorrowedByUID = getUserBooksBorrowedByUID;
exports.getAllUserBooks = getAllUserBooks;
exports.orderBook = orderBook;
exports.returnBook = returnBook;
