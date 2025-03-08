import express from "express";
import { sendOrderConfirmation } from "../controllers/emailController.js";

const router = express.Router();
router.post("/send-email", sendOrderConfirmation);

export default router;
