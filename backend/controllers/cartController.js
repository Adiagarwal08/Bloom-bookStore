import Cart from "../models/cartModel.js";
import mongoose from "mongoose";

//get all cart items
const getCarts = async (req, res) => {
  const items = await Cart.find({}).sort({ createdAt: -1 });

  res.status(200).json(items);
};

//get a single cart item

const getCart = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such book." });
  }

  const item = await Cart.findById(id);

  if (!item) {
    return res.status(404).json({ error: "No such book." });
  }

  res.status(200).json(item);
};

//create a new cart item
const createCart = async (req, res) => {
  const { image, title, author, price, quantity, wishlist } = req.body;

  try {
    const item = await Cart.create({
      image,
      title,
      author,
      price,
      quantity,
      wishlist,
    });
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a cart item
const deleteCart = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such book." });
  }

  const item = await Cart.findOneAndDelete({ _id: id });

  if (!item) {
    return res.status(400).json({ error: "No such book." });
  }

  res.status(200).json(item);
};

//update a cart item
const updateCart = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such book." });
  }

  const item = await Cart.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!item) {
    return res.status(400).json({ error: "No such book" });
  }

  res.status(200).json(item);
};

export { getCarts, getCart, createCart, updateCart, deleteCart };
