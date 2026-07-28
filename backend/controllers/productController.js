import { supabase } from "../origin/supabase.js";

export const getProducts = async (req, res) => {
  try {
    const { category } = req.query;

    let query = supabase.schema("origin").from("products").select(`
        *,
        categories (
          id,
          name
        )
      `);

    if (category) {
      query = query.eq("category_id", category);
    }

    const { data, error } = await query.order("name");

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .schema("origin")
      .from("products")
      .select(
        `
        *,
        categories (
          id,
          name
        )
      `,
      )
      .eq("id", id)
      .single();

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const {
      category_id,
      name,
      description,
      image,
      price,
      featured,
      available,
    } = req.body;

    const { data, error } = await supabase
      .schema("origin")
      .from("products")
      .insert({
        category_id,
        name,
        description,
        image,
        price,
        featured,
        available,
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .schema("origin")
      .from("products")
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

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .schema("origin")
      .from("products")
      .delete()
      .eq("id", id);

    if (error) throw error;

    res.json({
      success: true,
      message: "Product deleted",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
