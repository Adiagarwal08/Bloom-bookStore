import Wishlist from "../models/wishlistModel.js";
import mongoose from "mongoose";

//get all wishlist items
const getWishlists = async (req, res) => {
  const user_id = req.user._id;

  const items = await Wishlist.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(items);
};

//get a single wishlist item

const getWishlist = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such book." });
  }

  const item = await Wishlist.findById(id);

  if (!item) {
    return res.status(404).json({ error: "No such book." });
  }

  res.status(200).json(item);
};

//create a new wishlist item
const createWishlist = async (req, res) => {
  const { title } = req.body;

  try {
    const user_id = req.user._id;

    const item = await Wishlist.create({
      title,
      user_id,
    });
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a wishlist item
const deleteWishlist = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such book." });
  }

  const item = await Wishlist.findOneAndDelete({ _id: id });

  if (!item) {
    return res.status(400).json({ error: "No such book." });
  }

  res.status(200).json(item);
};

//update a wishlist item
const updateWishlist = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such book." });
  }

  const item = await Wishlist.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!item) {
    return res.status(400).json({ error: "No such book" });
  }

  res.status(200).json(item);
};

export {
  getWishlists,
  getWishlist,
  createWishlist,
  updateWishlist,
  deleteWishlist,
};
