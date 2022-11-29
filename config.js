const env = process.env;
const typeorm = require("typeorm");

const dataSource = new typeorm.DataSource({
  type: "postgres",
  host: env.DB_HOST || "localhost",
  port: env.DB_PORT || 5432,
  username: env.DB_USER || "postgres",
  password: env.DB_PASSWORD || "cuvl1234",
  database: env.DB_NAME || "postgres",
  schema: "tp2_grupo_03",
  synchronize: true,
  //logging: true,
  entities: [
    require("./entity/User"),
    require("./entity/Book"),
    require("./entity/Genre"),
    require("./entity/Author"),
    require("./entity/Publisher"),
    require("./entity/UserBooks"),
  ],
});

module.exports = { dataSource };
