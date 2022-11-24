const { dataSource } = require("../config");
const { ILike } = require("typeorm");

const Author = require("../entity/Author");

async function getAuthorFromDB(name) {
  return await dataSource.getRepository(Author).findBy({
    name: ILike(`%${name}%`),
  });
}

async function postAuthorToDB(data) {
  const author = dataSource.getRepository(Author).create(data);
  const res = await dataSource.getRepository(Author).save(author);
  return author;
}

module.exports = {
  getAuthorFromDB,
  postAuthorToDB,
};
