import { supabase } from "../origin/supabase.js";

export const createOrder = async (req, res) => {
  const { customerName, phone, orderType, address, notes, items } = req.body;

  if (!customerName || !phone || !items?.length) {
    return res.status(400).json({
      error: "Missing required fields",
    });
  }

  let subtotal = 0;

  const productIds = items.map((item) => item.productId);

  const { data: products, error: productError } = await supabase
    .schema("origin")
    .from("products")
    .select("id, price")
    .in("id", productIds);

  if (productError) {
    return res.status(500).json({
      error: productError.message,
    });
  }

  const priceMap = Object.fromEntries(
    products.map((p) => [p.id, Number(p.price)]),
  );

  const orderItems = items.map((item) => {
    const price = priceMap[item.productId];

    subtotal += price * item.quantity;

    return {
      product_id: item.productId,
      quantity: item.quantity,
      unit_price: price,
      options: item.options || {},
    };
  });

  const { data: order, error: orderError } = await supabase
    .schema("origin")
    .from("orders")
    .insert({
      customer_name: customerName,
      phone,
      order_type: orderType,
      address,
      notes,
      subtotal,
    })
    .select()
    .single();

  if (orderError) {
    return res.status(500).json({
      error: orderError.message,
    });
  }

  const itemsWithOrder = orderItems.map((item) => ({
    ...item,
    order_id: order.id,
  }));

  const { error: itemError } = await supabase
    .schema("origin")
    .from("order_items")
    .insert(itemsWithOrder);

  if (itemError) {
    return res.status(500).json({
      error: itemError.message,
    });
  }

  res.status(201).json({
    success: true,
    orderId: order.id,
    subtotal,
  });
};

export const getOrders = async (req, res) => {
  try {
    const { status } = req.query;

    let query = supabase.schema("origin").from("orders").select(`
        *,
        order_items (
          *,
          products (
            id,
            name,
            image
          )
        )
      `);

    if (status) {
      query = query.eq("status", status);
    }

    const { data, error } = await query.order("created_at", {
      ascending: false,
    });

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const getOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .schema("origin")
      .from("orders")
      .select(
        `
        *,
        order_items (
          *,
          products (
            id,
            name,
            image
          )
        )
      `,
      )
      .eq("id", id)
      .single();

    if (error) throw error;

    res.json(data);
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const { data, error } = await supabase
      .schema("origin")
      .from("orders")
      .update({ status })
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
