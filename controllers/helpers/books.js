const HttpError = require("../../models/http-error");
const {
  getBooksFromDB,
  getBookByIdFromDB,
  getBooksOwnerFromDB,
  getAllBooksOwnerFromDB,
  postBookToDB,
  updateBookByIdToDB,
  deleteBookByIdToDB,
} = require("../../services/books");

const getBookById = async (id, next) => {
  let book = await getBookByIdFromDB(id);
  if (book.length === 0) {
    return next(
      new HttpError("Could not find a book for the provided id.", 404)
    );
  }
  return book;
};

exports.getBookUsingId = getBookById;
