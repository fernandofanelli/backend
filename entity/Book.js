const Author = require("./Author");
const Genre = require("./Genre");
const Publisher = require("./Publisher");

const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "Book",
  tableName: "book",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    title: {
      type: "varchar",
      length: 60,
    },
    isbn: {
      type: "varchar",
      length: 13,
      unique: true,
    },
    publication_date: {
      type: "varchar",
      length: 4,
    },
    synopsis: {
      type: "varchar",
      length: 1100,
    },
    cover_image: {
      type: "varchar",
      length: 300000,
    },
    amount: {
      type: "int",
    },
    language: {
      type: "varchar",
      length: 2,
    },
    genre: {
      type: "bigint",
    },
    publisher: {
      type: "bigint",
    },
    author: {
      type: "bigint",
    },
  },
  relations: {
    genre: {
      type: "one-to-one",
      target: Genre,
    },
    publisher: {
      type: "one-to-one",
      target: Publisher,
    },
    author: {
      type: "one-to-one",
      target: Author,
    },
  },
});
