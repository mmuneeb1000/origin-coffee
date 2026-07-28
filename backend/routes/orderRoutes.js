import express from "express";
import {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// Customer
router.post("/", createOrder);

// Admin
router.get("/", authenticate, getOrders);
router.get("/:id", authenticate, getOrder);
router.patch("/:id/status", authenticate, updateOrderStatus);

export default router;
