const HttpError = require("../../models/http-error");
const { getBookByBIDFromDB } = require("../../services/books");
const { getAuthorFromDB, postAuthorToDB } = require("../../services/author");
const {
  getPublisherFromDB,
  postPublisherToDB,
} = require("../../services/publisher");
const { getGenreFromDB, postGenreToDB } = require("../../services/genre");

const getBookByBID = async (id, next) => {
  let book = await getBookByBIDFromDB(id);
  if (book.length === 0) {
    return next(
      new HttpError("Could not find a book for the provided id.", 404)
    );
  }
  return book;
};

const getAuthorIdByName = async (name) => {
  let author = await getAuthorFromDB(name);
  let authorData;
  if (author.length === 0) {
    let body = { name: name };
    authorData = await postAuthorToDB(body);
  }
  return author.length !== 0 ? author[0].id : authorData.id;
};

const getGenreIdByName = async (name) => {
  let genre = await getGenreFromDB(name);
  let genreData;
  if (genre.length === 0) {
    let body = { name: name };
    genreData = await postGenreToDB(body);
  }
  return genre.length !== 0 ? genre[0].id : genreData.id;
};

const getPublisherIdByName = async (name) => {
  let publisher = await getPublisherFromDB(name);
  let publisherData;
  if (publisher.length === 0) {
    let body = { name: name };
    publisherData = await postPublisherToDB(body);
  }
  return publisher.length !== 0 ? publisher[0].id : publisherData.id;
};

exports.getBookUsingId = getBookByBID;
exports.getAuthorIdByName = getAuthorIdByName;
exports.getGenreIdByName = getGenreIdByName;
exports.getPublisherIdByName = getPublisherIdByName;
