const HttpError = require("../../models/http-error");
const { postUserBooksToDB } = require("../../services/user-books");

const postUserBooks = async (id, next) => {
  let userBook = await postUserBooksToDB(id);
  if (userBook.length === 0) {
    return next(
      new HttpError("Could not create a new row for the provided data.", 404)
    );
  }
  return userBook;
};

exports.postUserBooks = postUserBooks;
