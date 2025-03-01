import express from "express";
import {
  getCarts,
  getCart,
  createCart,
  updateCart,
  deleteCart,
} from "../controllers/cartController.js";

import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

//require auth for all book routes
router.use(requireAuth);

//GET all cart items
router.get("/", getCarts);

//GET a single cart item
router.get("/:id", getCart);

//POST a new cart item
router.post("/", createCart);

//DELETE a cart item
router.delete("/:id", deleteCart);

//UPDATE a cart item
router.patch("/:id", updateCart);

export default router;
