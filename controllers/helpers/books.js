const HttpError = require("../../models/http-error");
const { getBookByBIDFromDB } = require("../../services/books");

const getBookByBID = async (id, next) => {
  let book = await getBookByBIDFromDB(id);
  if (book.length === 0) {
    return next(
      new HttpError("Could not find a book for the provided id.", 404)
    );
  }
  return book;
};

exports.getBookUsingId = getBookByBID;
