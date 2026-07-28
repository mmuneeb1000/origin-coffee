import multer from "multer";
import { supabase } from "../origin/supabase.js";

const storage = multer.memoryStorage();

export const upload = multer({
  storage,
});

export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "No file uploaded",
      });
    }

    const fileName = `${Date.now()}-${req.file.originalname}`;

    const { error } = await supabase.storage
      .from("products")
      .upload(fileName, req.file.buffer, {
        contentType: req.file.mimetype,
        upsert: false,
      });

    if (error) throw error;

    const {
      data: { publicUrl },
    } = supabase.storage.from("products").getPublicUrl(fileName);

    res.status(201).json({
      fileName,
      url: publicUrl,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const deleteImage = async (req, res) => {
  try {
    const { fileName } = req.params;

    const { error } = await supabase.storage
      .from("products")
      .remove([fileName]);

    if (error) throw error;

    res.json({
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
