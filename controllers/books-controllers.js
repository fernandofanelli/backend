const { v4: uuidv4 } = require("uuid");

const HttpError = require("../models/http-error");

const DUMMY_BOOKS = [
  {
    id: "b1",
    title: "The Green Mile",
    description: `The Green Mile is a 1996 serial novel by American writer Stephen King. It tells the story of death row supervisor Paul Edgecombe's encounter with John Coffey, an unusual inmate who displays inexplicable healing and empathetic abilities.`,
    creator: "Stephen King",
    language: "en",
    genre: "Dark Fantasy",
    publicationDate: "1996",
  },
  {
    id: "b2",
    title: "Pet Sematary",
    description: `Louis Creed, a doctor from Chicago, is appointed director of the University of Maine's campus health service. He moves to a large house near the small town of Ludlow with his wife Rachel, their two young children, Ellie and Gage, and Ellie's cat, Winston Churchill ("Church").`,
    creator: "Stephen King",
    language: "en",
    genre: "Horror",
    publicationDate: "1983",
  },
  {
    id: "b3",
    title: "The Shining",
    description: `The Shining is a 1977 horror novel by American author Stephen King. It is King's third published novel and first hardback bestseller; its success firmly established King as a preeminent author in the horror genre. The setting and characters are influenced by King's personal experiences, including both his visit to The Stanley Hotel in 1974 and his struggle with alcoholism.`,
    creator: "Stephen King",
    language: "en",
    genre: "Horror",
    publicationDate: "1977",
  },
];

const getBookById = (req, res, next) => {
  const bookId = req.params.bid; // { bid: 'b1' }

  const book = DUMMY_BOOKS.find((b) => {
    return b.id === bookId;
  });

  if (!book) {
    throw new HttpError("Could not find a book for the provided id.", 404);
  }

  res.json({ book });
};

const getBookByUserId = (req, res, next) => {
  const userId = req.params.uid;

  const book = DUMMY_BOOKS.find((b) => {
    return b.creator === userId;
  });

  if (!book) {
    return next(
      new HttpError("Could not find a book for the provided user id.", 404)
    );
  }

  res.json({ book });
};

const createBook = (req, res, next) => {
  const { title, description, creator, language, genre, publicationDate } =
    req.body;
  const createdBook = {
    id: uuidv4(),
    title,
    description,
    creator,
    language,
    genre,
    publicationDate,
  };

  DUMMY_BOOKS.push(createdBook);

  res.status(201).json({ book: createdBook });
};

exports.getBookById = getBookById;
exports.getBookByUserId = getBookByUserId;
exports.createBook = createBook;
