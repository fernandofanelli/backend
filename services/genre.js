const { dataSource } = require("../config");
const { ILike } = require("typeorm");
const Genre = require("../entity/Genre");

async function getGenreFromDB(name) {
  return await dataSource.getRepository(Genre).findBy({
    name: ILike(`%${name}%`),
  });
}

async function getGenreByIdFromDB(id) {
  return await dataSource.getRepository(Genre).find({
    where: { id: id },
  });
}

async function postGenreToDB(data) {
  const genre = dataSource.getRepository(Genre).create(data);
  const res = await dataSource.getRepository(Genre).save(genre);
  return genre;
}

module.exports = {
  getGenreFromDB,
  getGenreByIdFromDB,
  postGenreToDB,
};
