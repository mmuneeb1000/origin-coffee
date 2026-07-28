import express from "express";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

// Public
router.get("/", getCategories);

// Admin
router.post("/", authenticate, createCategory);
router.patch("/:id", authenticate, updateCategory);
router.delete("/:id", authenticate, deleteCategory);

export default router;
