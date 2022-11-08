const EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "Publisher",
  tableName: "publisher",
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
  },
});
