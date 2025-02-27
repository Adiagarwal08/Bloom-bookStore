import mongoose from "mongoose";

const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    editor: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    overview: {
      type: String,
      required: true,
    },
    about_the_author: {
      type: String,
      required: true,
    },
    critics: {
      type: String,
      required: true,
    },
    isbn: {
      type: Number,
      required: true,
    },
    hardcover: {
      type: Number,
      required: true,
    },
    size: {
      type: String,
      required: true,
    },
    font_size: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Book", bookSchema);
