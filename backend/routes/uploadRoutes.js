import express from "express";
import {
  upload,
  uploadImage,
  deleteImage,
} from "../controllers/uploadController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.use(authenticate);

router.post("/", upload.single("image"), uploadImage);

router.delete("/:fileName", deleteImage);

export default router;
