const { ILike } = require("typeorm");
const { dataSource } = require("../config");
const Author = require("../entity/Author");
const Book = require("../entity/Book");
const Genre = require("../entity/Genre");
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

async function getMatchingBooksFromDB(data) {
  let genreName;
  let authorName;
  if (data !== "") {
    genreName = await dataSource.getRepository(Genre).findBy({
      name: ILike(`%${data}%`),
    });
    authorName = await dataSource.getRepository(Author).findBy({
      name: ILike(`%${data}%`),
    });
  }

  return await dataSource.getRepository(Book).find({
    where: [
      { title: ILike(`%${data}%`) },
      { isbn: data },
      { genre: genreName.length !== 0 ? genreName[0].id : 0 },
      { author: authorName.length !== 0 ? authorName[0].id : 0 },
    ],
  });
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
  getMatchingBooksFromDB,
  postBookToDB,
  updateBookByIdToDB,
  deleteBookByIdToDB,
};
