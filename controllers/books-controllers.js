const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");

let DUMMY_BOOKS = [
  {
    id: "b1",
    title: "The Green Mile",
    description: `The Green Mile is a 1996 serial novel by American writer Stephen King. It tells the story of death row supervisor Paul Edgecombe's encounter with John Coffey, an unusual inmate who displays inexplicable healing and empathetic abilities.`,
    image: "/images/sk1.jpeg",
    author: "Stephen King",
    authorId: "1",
    language: "en",
    genre: "Dark Fantasy",
    publicationDate: "1996",
    available: true,
  },
  {
    id: "b2",
    title: "Pet Sematary",
    description: `Louis Creed, a doctor from Chicago, is appointed director of the University of Maine's campus health service. He moves to a large house near the small town of Ludlow with his wife Rachel, their two young children, Ellie and Gage, and Ellie's cat, Winston Churchill ("Church").`,
    image: "/images/sk2.jpeg",
    author: "Stephen King",
    authorId: "1",
    language: "en",
    genre: "Horror",
    publicationDate: "1983",
    available: false,
  },
  {
    id: "b3",
    title: "The Shining",
    description: `The Shining is a 1977 horror novel by American author Stephen King. It is King's third published novel and first hardback bestseller; its success firmly established King as a preeminent author in the horror genre. The setting and characters are influenced by King's personal experiences, including both his visit to The Stanley Hotel in 1974 and his struggle with alcoholism.`,
    image: "/images/sk3.jpeg",
    author: "Stephen King",
    authorId: "1",
    language: "en",
    genre: "Horror",
    publicationDate: "1977",
    available: true,
  },
  {
    id: "b4",
    title: "The Green Mile",
    description: `The Green Mile is a 1996 serial novel by American writer Stephen King. It tells the story of death row supervisor Paul Edgecombe's encounter with John Coffey, an unusual inmate who displays inexplicable healing and empathetic abilities.`,
    image: "/images/sk1.jpeg",
    author: "Stephen King",
    authorId: "1",
    language: "en",
    genre: "Dark Fantasy",
    publicationDate: "1996",
    available: false,
  },
  {
    id: "b5",
    title: "Pet Sematary",
    description: `Louis Creed, a doctor from Chicago, is appointed director of the University of Maine's campus health service. He moves to a large house near the small town of Ludlow with his wife Rachel, their two young children, Ellie and Gage, and Ellie's cat, Winston Churchill ("Church").`,
    image: "/images/sk2.jpeg",
    author: "Stephen King",
    authorId: "1",
    language: "en",
    genre: "Horror",
    publicationDate: "1983",
    available: true,
  },
  {
    id: "b6",
    title: "The Shining",
    description: `The Shining is a 1977 horror novel by American author Stephen King. It is King's third published novel and first hardback bestseller; its success firmly established King as a preeminent author in the horror genre. The setting and characters are influenced by King's personal experiences, including both his visit to The Stanley Hotel in 1974 and his struggle with alcoholism.`,
    image: "/images/sk3.jpeg",
    author: "Stephen King",
    authorId: "1",
    language: "en",
    genre: "Horror",
    publicationDate: "1977",
    available: true,
  },
];

const DUMMY_USERS_BOOKS = [
  {
    id: "u1",
    name: "Fernando Fanelli",
    bookIds: ["b1", "b2", "b3"],
  },
  {
    id: "u2",
    name: "Agus Bondiola",
    bookId: "b2",
  },
];

const getBooks = (req, res, next) => {
  res.json({ DUMMY_BOOKS });
};

const getBookById = (req, res, next) => {
  const bookId = req.params.bid;

  const book = DUMMY_BOOKS.find((b) => {
    return b.id === bookId;
  });

  if (!book) {
    return next(
      new HttpError("Could not find a book for the provided id.", 404)
    );
  }

  res.json({ book });
};

const getBookByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const user = DUMMY_USERS_BOOKS.find((u) => {
    return u.id === userId;
  });

  if (!user || user.length === 0) {
    return next(
      new HttpError("Could not find a user for the provided user id.", 404)
    );
  }

  user.f;
  const books = DUMMY_BOOKS.filter((b) => user.bookIds.includes(b.id));

  if (!books || books.length === 0) {
    return next(
      new HttpError("Could not find a book for the provided user id.", 404)
    );
  }

  res.json({ books });
};

const createBook = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, description, author, language, genre, publicationDate } =
    req.body;
  const createdBook = {
    id: uuidv4(),
    title,
    description,
    author,
    language,
    genre,
    publicationDate,
  };

  DUMMY_BOOKS.push(createdBook);

  res.status(201).json({ book: createdBook });
};

const updateBook = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, description } = req.body;
  const bookId = req.params.bid;

  const updatedBook = { ...DUMMY_BOOKS.find((b) => b.id === bookId) };
  const bookIndex = DUMMY_BOOKS.findIndex((b) => b.id === bookId);
  updatedBook.title = title;
  updatedBook.description = description;

  DUMMY_BOOKS[bookIndex] = updatedBook;

  res.status(200).json({ book: updatedBook });
};

const deleteBook = (req, res, next) => {
  const bookId = req.params.bid;
  if (!DUMMY_BOOKS.find((b) => b.id === bookId)) {
    return next(new HttpError("Could not find a place for that id.", 404));
  }
  DUMMY_BOOKS = DUMMY_BOOKS.filter((b) => b.id !== bookId);

  res.status(200).json({ message: "Deleted Book." });
};

exports.getBooks = getBooks;
exports.getBookById = getBookById;
exports.getBookByUserId = getBookByUserId;
exports.createBook = createBook;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;
