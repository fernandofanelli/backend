const { dataSource } = require("../config");
const Book = require("../entity/Book");
const UserBooks = require("../entity/UserBooks");

async function getBooksFromDB() {
  return await dataSource.getRepository(Book).find();
}

async function getBookByIdFromDB(bookId) {
  return await dataSource.getRepository(Book).find({
    where: { id: bookId },
  });
}

async function getBooksOwnerFromDB(userId) {
  return await dataSource.getRepository(UserBooks).find({
    where: { user_id: userId },
  });
}

async function getAllBooksOwnerFromDB() {
  return await dataSource.getRepository(UserBooks).find();
}

async function postBookToDB(data) {
  const book = dataSource.getRepository(Book).create(data);
  const res = await dataSource.getRepository(Book).save(book);
  return book;
}

async function updateBookByIdToDB(id, data) {
  return await dataSource.getRepository(Book).update(id, data);
}

async function deleteBookByIdToDB(id) {
  return await dataSource.getRepository(Book).delete(id);
}

module.exports = {
  getBooksFromDB,
  getBookByIdFromDB,
  getBooksOwnerFromDB,
  getAllBooksOwnerFromDB,
  postBookToDB,
  updateBookByIdToDB,
  deleteBookByIdToDB,
};
