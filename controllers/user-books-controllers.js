const HttpError = require("../models/http-error");
const booksHelper = require("./helpers/books");
const {
  getBooksAvailableToBorrowedFromDB,
  updateBookByIdToDB,
  updateUserBooksToDB,
} = require("../services/user-books");
const dateUtil = require("../utils/dateUtil");

const orderBook = async (req, res, next) => {
  let book = await booksHelper.getBookUsingId(req.body.bid, next);

  let userBook = await getBooksAvailableToBorrowedFromDB(req.body.bid);

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

exports.orderBook = orderBook;
