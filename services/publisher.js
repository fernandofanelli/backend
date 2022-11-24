const { dataSource } = require("../config");
const { ILike } = require("typeorm");
const Publisher = require("../entity/Publisher");

async function getPublisherFromDB(name) {
  return await dataSource.getRepository(Publisher).findBy({
    name: ILike(`%${name}%`),
  });
}

async function postPublisherToDB(data) {
  const publisher = dataSource.getRepository(Publisher).create(data);
  const res = await dataSource.getRepository(Publisher).save(publisher);
  return publisher;
}

module.exports = {
  getPublisherFromDB,
  postPublisherToDB,
};
