import { supabase } from "../origin/supabase.js";

export const getSettings = async (req, res) => {
  try {
    const { data, error } = await supabase
      .schema("origin")
      .from("settings")
      .select("*")
      .single();

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const { data: current, error: findError } = await supabase
      .schema("origin")
      .from("settings")
      .select("id")
      .single();

    if (findError) throw findError;

    const { data, error } = await supabase
      .schema("origin")
      .from("settings")
      .update({
        ...req.body,
        updated_at: new Date().toISOString(),
      })
      .eq("id", current.id)
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
