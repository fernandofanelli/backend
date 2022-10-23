const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const loginRoute = require("./routes/login");
const booksRoute = require("./routes/books");

dotenv.config();

const app = express();

//if you want only your frontend to connect
app.use(cors({ origin: "http://localhost:3000" }));

//app set to only accept json data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Middlewares
app.use("/api/login", loginRoute);
app.use("/api/books", booksRoute);

//Listener
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
