const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const usersRoute = require("./routes/users");
const booksRoute = require("./routes/books");
const { dataSource } = require("./config");

dotenv.config();

const app = express();

//if you want only your frontend to connect
app.use(cors({ origin: "http://localhost:3000" }));

//app set to only accept json data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Middlewares
app.use("/api/users", usersRoute);
app.use("/api/books", booksRoute);

//Error Middleware function
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

//Listener
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

try {
  dataSource.initialize();
  console.log("Database connected.");
} catch (error) {
  console.log(error);
}
