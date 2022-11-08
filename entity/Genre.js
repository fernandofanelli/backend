const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "Genre",
  tableName: "genre",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
      length: 20,
    },
  },
});
