import express from "express";
import {
  getProductOptions,
  createProductOption,
  updateProductOption,
  deleteProductOption,
} from "../controllers/productOptionController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.get("/products/:id/options", authenticate, getProductOptions);

router.post("/products/:id/options", authenticate, createProductOption);

router.patch("/options/:id", authenticate, updateProductOption);

router.delete("/options/:id", authenticate, deleteProductOption);

export default router;
