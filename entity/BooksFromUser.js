const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "BooksFromUser",
  tableName: "books_from_user",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    user_id: {
      type: "bigint",
      primaryKeyConstraintName: "books_from_user_pk",
      //primary: true,
      //unique: true,
    },
    book_id: {
      type: "bigint",
      primaryKeyConstraintName: "books_from_user_pk",
      //primary: true,
      //unique: true,
    },
    available: {
      type: "boolean",
    },
  },
});
