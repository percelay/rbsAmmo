"use server";

import { supabase, type OrderInsert } from "@/lib/supabase";

type CreateOrderInput = {
  customerName: string;
  customerEmail: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  items: { productId: string; name: string; quantity: number; price: number }[];
  subtotal: number;
  ageVerified: boolean;
};

type CreateOrderResult =
  | { success: true; orderId: string }
  | { success: false; error: string };

export async function createOrder(input: CreateOrderInput): Promise<CreateOrderResult> {
  const shippingCost = 0;
  const tax = 0;
  const total = input.subtotal + shippingCost + tax;

  const order: OrderInsert = {
    customer_name: input.customerName,
    customer_email: input.customerEmail,
    shipping_address: {
      street: input.street,
      city: input.city,
      state: input.state,
      zip: input.zip,
    },
    items: input.items.map((i) => ({
      product_id: i.productId,
      name: i.name,
      quantity: i.quantity,
      price: i.price,
    })),
    subtotal: input.subtotal,
    shipping_cost: shippingCost,
    tax,
    total,
    payment_status: "unpaid",
    age_verified: input.ageVerified,
  };

  const { data, error } = await supabase.from("orders").insert(order).select("id").single();

  if (error) {
    console.error("Order insert failed:", error.message);
    return { success: false, error: "Failed to place order. Please try again." };
  }

  return { success: true, orderId: data.id };
}
