const { dataSource } = require("../config");
const Book = require("../entity/Book");
const UserBooks = require("../entity/UserBooks");

async function getBooksOwnerFromDB(userId) {
  return await dataSource.getRepository(UserBooks).find({
    where: { user_id: userId },
  });
}

async function getBooksOwnerToBorrowedFromDB(book_id, user_id) {
  return await dataSource.getRepository(UserBooks).find({
    where: { user_id: user_id, book_id: book_id, borrower_id: null },
  });
}

async function getAllBooksOwnerFromDB() {
  return await dataSource.getRepository(UserBooks).find();
}

async function updateBookByIdToDB(id, data) {
  return await dataSource.getRepository(Book).update(id, data);
}

async function postUserBooksToDB(data) {
  const book = dataSource.getRepository(UserBooks).create(data);
  const res = await dataSource.getRepository(UserBooks).save(book);
  return book;
}

module.exports = {
  getBooksOwnerFromDB,
  getBooksOwnerToBorrowedFromDB,
  getAllBooksOwnerFromDB,
  updateBookByIdToDB,
  postUserBooksToDB,
};
