import Book from "../models/bookModel.js";
import mongoose from "mongoose";

//get all books
const getBooks = async (req, res) => {
  const books = await Book.find({}).sort({ createdAt: -1 });

  res.status(200).json(books);
};

//get four random books
const getFourBooks = async (req, res) => {
  try {
    const book = await Book.aggregate([{ $sample: { size: 4 } }]);

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get five random books
const getFiveBooks = async (req, res) => {
  try {
    const book = await Book.aggregate([{ $sample: { size: 5 } }]);

    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//get a single book

const getBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such book" });
  }

  const book = await Book.findById(id);

  if (!book) {
    return res.status(404).json({ error: "No such book" });
  }

  res.status(200).json(book);
};

//create new book
const createBook = async (req, res) => {
  const {
    image,
    title,
    author,
    editor,
    price,
    overview,
    about_the_author,
    critics,
    isbn,
    hardcover,
    size,
    font_size,
  } = req.body;

  try {
    const book = await Book.create({
      image,
      title,
      author,
      editor,
      price,
      overview,
      about_the_author,
      critics,
      isbn,
      hardcover,
      size,
      font_size,
    });
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a book
const deleteBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such book" });
  }

  const book = await Book.findOneAndDelete({ _id: id });

  if (!book) {
    return res.status(400).json({ error: "No such book" });
  }

  res.status(200).json(book);
};

//update a book
const updateBook = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such book" });
  }

  const book = await Book.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!book) {
    return res.status(400).json({ error: "No such book" });
  }

  res.status(200).json(book);
};

export {
  getBooks,
  getFourBooks,
  getBook,
  getFiveBooks,
  createBook,
  deleteBook,
  updateBook,
};
