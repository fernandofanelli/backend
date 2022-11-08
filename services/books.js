const { dataSource } = require("../config");
const Book = require("../entity/Book");

async function getBooksFromDB() {
  return await dataSource.getRepository(Book).find();
}

async function getBookByIdFromDB(bookId) {
  return await dataSource.getRepository(Book).find({
    where: { id: bookId },
  });
}

async function getBooksFromUserIdFromDB(userId) {
  return await dataSource.getRepository(Book).find({
    where: { id: userId },
  });
}

async function postBookToDB(data) {
  const book = dataSource.getRepository(Book).create(data);
  const res = await dataSource.getRepository(Book).save(book);
  return book;
}

module.exports = {
  getBooksFromDB,
  getBookByIdFromDB,
  getBooksFromUserIdFromDB,
  postBookToDB,
};
