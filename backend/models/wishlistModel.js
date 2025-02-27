import mongoose from "mongoose";

const Schema = mongoose.Schema;

const wishlistSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Wishlist", wishlistSchema);
