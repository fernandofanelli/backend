const { IsNull } = require("typeorm");
const { dataSource } = require("../config");
const Book = require("../entity/Book");
const UserBooks = require("../entity/UserBooks");

async function getUserBooksByUIDFromDB(userId) {
  return await dataSource.getRepository(UserBooks).find({
    where: { user_id: userId },
  });
}

async function getUserBooksBorrowedByUIDFromDB(userId) {
  return await dataSource.getRepository(UserBooks).find({
    where: { borrower_id: userId },
  });
}

async function getUserBooksByUIDAndBIDFromDB(book_id, user_id) {
  return await dataSource.getRepository(UserBooks).find({
    where: { user_id: user_id, book_id: book_id },
  });
}

async function getBooksAvailableByBIDFromDB(book_id) {
  return await dataSource.getRepository(UserBooks).find({
    where: { book_id: book_id, borrower_id: IsNull() },
  });
}

async function getUserBooksOwnedByUIDAndBIDFromDB(book_id, user_id) {
  return await dataSource.getRepository(UserBooks).find({
    where: { book_id: book_id, user_id: user_id },
  });
}

async function getBooksNonAvailableByBIDAndUIDFromDB(book_id, user_id) {
  return await dataSource.getRepository(UserBooks).find({
    where: { book_id: book_id, borrower_id: user_id },
  });
}

async function getAllUserBooksFromDB() {
  return await dataSource.getRepository(UserBooks).find();
}

async function updateBookByIdToDB(id, data) {
  return await dataSource.getRepository(Book).update(id, data);
}

async function updateUserBooksToDB(id, data) {
  return await dataSource.getRepository(UserBooks).update(id, data);
}

async function postUserBooksToDB(data) {
  const book = dataSource.getRepository(UserBooks).create(data);
  const res = await dataSource.getRepository(UserBooks).save(book);
  return book;
}

async function deleteUserBooksByBIDToDB(id) {
  return await dataSource.getRepository(UserBooks).delete(id);
}

module.exports = {
  getUserBooksByUIDFromDB,
  getUserBooksBorrowedByUIDFromDB,
  getUserBooksByUIDAndBIDFromDB,
  getBooksAvailableByBIDFromDB,
  getBooksNonAvailableByBIDAndUIDFromDB,
  getAllUserBooksFromDB,
  updateBookByIdToDB,
  updateUserBooksToDB,
  postUserBooksToDB,
  deleteUserBooksByBIDToDB,
  getUserBooksOwnedByUIDAndBIDFromDB,
};
