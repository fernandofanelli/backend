const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "User",
  tableName: "user",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
      length: 30,
    },
    password: {
      type: "varchar",
      length: 20,
    },
    email: {
      type: "varchar",
      length: 50,
    },
  },
});
