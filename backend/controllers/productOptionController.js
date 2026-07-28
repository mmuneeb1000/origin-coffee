import { supabase } from "../origin/supabase.js";

export const getProductOptions = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .schema("origin")
      .from("product_options")
      .select(
        `
        *,
        product_option_values (*)
      `,
      )
      .eq("product_id", id);

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const createProductOption = async (req, res) => {
  try {
    const { id } = req.params;

    const { name, required } = req.body;

    const { data, error } = await supabase
      .schema("origin")
      .from("product_options")
      .insert({
        product_id: id,
        name,
        required,
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const updateProductOption = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .schema("origin")
      .from("product_options")
      .update(req.body)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const deleteProductOption = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .schema("origin")
      .from("product_options")
      .delete()
      .eq("id", id);

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
