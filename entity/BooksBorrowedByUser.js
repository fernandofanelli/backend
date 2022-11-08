const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "BooksBorrowedByUser",
  tableName: "books_borrowed_by_user",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    user_id: {
      type: "bigint",
      primaryKeyConstraintName: "books_borrowed_by_user_pk",
      //primary: true,
    },
    book_id: {
      type: "bigint",
      primaryKeyConstraintName: "books_borrowed_by_user_pk",
      //primary: true,
    },
    borrowed_date: {
      type: "date",
    },
  },
});
