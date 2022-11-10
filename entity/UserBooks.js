const Book = require("./Book");
const User = require("./User");

const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "UserBooks",
  tableName: "user_books",
  columns: {
    id: {
      type: "int",
      primary: true,
      generated: true,
    },
    user_id: {
      type: "bigint",
    },
    book_id: {
      type: "bigint",
    },
    borrower_id: {
      type: "bigint",
      nullable: true,
    },
    borrowed_date: {
      type: "date",
      nullable: true,
    },
  },
  relations: {
    user_id: {
      type: "one-to-one",
      target: User,
    },
    book_id: {
      type: "one-to-one",
      target: Book,
    },
  },
});
