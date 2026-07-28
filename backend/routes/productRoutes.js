import express from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// Public
router.get("/", getProducts);
router.get("/:id", getProduct);

// Admin
router.post("/", authenticate, createProduct);
router.patch("/:id", authenticate, updateProduct);
router.delete("/:id", authenticate, deleteProduct);

export default router;
