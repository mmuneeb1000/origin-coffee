import { supabase } from "../origin/supabase.js";

export const getCategories = async (req, res) => {
  try {
    const { data, error } = await supabase
      .schema("origin")
      .from("categories")
      .select("*")
      .order("position");

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name, description, position = 0 } = req.body;

    const { data, error } = await supabase
      .schema("origin")
      .from("categories")
      .insert({
        name,
        description,
        position,
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .schema("origin")
      .from("categories")
      .update(req.body)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .schema("origin")
      .from("categories")
      .delete()
      .eq("id", id);

    if (error) throw error;

    res.json({
      success: true,
      message: "Category deleted",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
