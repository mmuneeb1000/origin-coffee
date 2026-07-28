import express from "express";
import {
  createOptionValue,
  updateOptionValue,
  deleteOptionValue,
} from "../controllers/productOptionValueController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.post("/options/:id/values", authenticate, createOptionValue);

router.patch("/values/:id", authenticate, updateOptionValue);

router.delete("/values/:id", authenticate, deleteOptionValue);

export default router;
