import express from "express";
import {
  getBooks,
  getFourBooks,
  getBook,
  getFiveBooks,
  createBook,
  deleteBook,
  updateBook,
} from "../controllers/bookController.js";

const router = express.Router();

//GET all books
router.get("/", getBooks);

//GET four random books
router.get("/four", getFourBooks);

//GET five random books
router.get("/five", getFiveBooks);

//GET a single book
router.get("/:id", getBook);

//POST a new book
router.post("/", createBook);

//DELETE a book
router.delete("/:id", deleteBook);

//UPDATE a book
router.patch("/:id", updateBook);

export default router;
