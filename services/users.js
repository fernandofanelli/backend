const { dataSource } = require("../config");
const User = require("../entity/User");

async function getUsersFromDB() {
  return await dataSource.getRepository(User).find();
}

async function getUserByIdFromDB(userId) {
  return await dataSource.getRepository(User).find({
    where: { id: userId },
  });
}

async function getUserByEmailFromDB(userEmail) {
  return await dataSource.getRepository(User).find({
    where: { email: userEmail },
  });
}

async function postUserToDB(data) {
  const user = dataSource.getRepository(User).create(data);
  const res = await dataSource.getRepository(User).save(user);
  return user;
}

module.exports = {
  getUsersFromDB,
  getUserByIdFromDB,
  getUserByEmailFromDB,
  postUserToDB,
};
