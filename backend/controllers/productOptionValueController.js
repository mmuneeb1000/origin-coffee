import { supabase } from "../origin/supabase.js";

export const createOptionValue = async (req, res) => {
  try {
    const { id } = req.params;

    const { label, price_adjustment } = req.body;

    const { data, error } = await supabase
      .schema("origin")
      .from("product_option_values")
      .insert({
        option_id: id,
        label,
        price_adjustment,
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

export const updateOptionValue = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .schema("origin")
      .from("product_option_values")
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

export const deleteOptionValue = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .schema("origin")
      .from("product_option_values")
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
