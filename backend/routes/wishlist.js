import express from "express";

import {
  getWishlists,
  getWishlist,
  createWishlist,
  updateWishlist,
  deleteWishlist,
} from "../controllers/wishlistController.js";

const router = express.Router();

//GET all wishlist items
router.get("/", getWishlists);

//GET a single wishlist item
router.get("/:id", getWishlist);

//POST a new wishlist item
router.post("/", createWishlist);

//DELETE a wishlist item
router.delete("/:id", deleteWishlist);

//UPDATE a wishlist item
router.patch("/:id", updateWishlist);

export default router;
