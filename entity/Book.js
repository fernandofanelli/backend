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
      type: "bigint",
      unique: true,
    },
    publication_date: {
      type: "varchar",
      length: 4,
    },
    plot: {
      type: "varchar",
      length: 2000,
    },
    cover_image: {
      type: "varchar",
      length: 200,
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
});
