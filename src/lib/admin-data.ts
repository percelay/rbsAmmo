import "server-only";

import { redirect } from "next/navigation";

import {
  ORDER_STATUS_OPTIONS,
  PRODUCT_CATEGORY_OPTIONS,
  formatOrderStatusLabel,
  mapProductRow,
  toNumber,
  type OrderRow,
  type Product,
  type ProductRow,
} from "@/lib/products";
import { PRODUCT_COLUMNS } from "@/lib/products-server";
import { getAuthenticatedAdminState } from "@/lib/supabase-server";

export const ORDER_COLUMNS = `
  id,
  status,
  customer_email,
  customer_name,
  shipping_address,
  items,
  subtotal,
  shipping_cost,
  tax,
  total,
  payment_status,
  transaction_id,
  age_verified,
  created_at
`;

type QueryState<T> =
  | {
      data: T;
      error: null;
    }
  | {
      data: null;
      error: string;
    };

export type DashboardData = {
  stats: {
    totalOrders: number;
    totalRevenue: number;
    ordersToday: number;
    inStockProducts: number;
    outOfStockProducts: number;
  };
  recentOrders: Pick<
    OrderRow,
    "id" | "customer_name" | "total" | "status" | "payment_status" | "created_at"
  >[];
};

function sanitizeSearchTerm(value: string | undefined) {
  return (value ?? "").trim().replace(/[,%()]/g, " ");
}

export async function requireAdminSession() {
  const { supabase, user, isAdmin } = await getAuthenticatedAdminState();

  if (!user || !isAdmin) {
    redirect("/admin/login?error=unauthorized");
  }

  return { supabase, user };
}

export async function getDashboardData(): Promise<QueryState<DashboardData>> {
  const { supabase } = await requireAdminSession();

  const [ordersResult, recentOrdersResult, productsResult] = await Promise.all([
    supabase
      .from("orders")
      .select("id, total, payment_status, created_at", { count: "exact" })
      .order("created_at", { ascending: false }),
    supabase
      .from("orders")
      .select("id, customer_name, total, status, payment_status, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase.from("products").select("id, in_stock, stock_quantity"),
  ]);

  if (ordersResult.error) {
    return { data: null, error: "Unable to load dashboard order stats right now." };
  }

  if (recentOrdersResult.error) {
    return { data: null, error: "Unable to load recent orders right now." };
  }

  if (productsResult.error) {
    return { data: null, error: "Unable to load product inventory stats right now." };
  }

  const orders = ordersResult.data ?? [];
  const products = productsResult.data ?? [];
  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const totalRevenue = orders.reduce((sum, order) => {
    return order.payment_status === "paid" ? sum + toNumber(order.total) : sum;
  }, 0);

  const ordersToday = orders.filter((order) => new Date(order.created_at) >= startOfToday).length;

  const inventorySummary = products.reduce(
    (summary, product) => {
      const isAvailable = Boolean(product.in_stock);

      if (isAvailable) {
        summary.inStockProducts += 1;
      } else {
        summary.outOfStockProducts += 1;
      }

      return summary;
    },
    { inStockProducts: 0, outOfStockProducts: 0 },
  );

  return {
    data: {
      stats: {
        totalOrders: ordersResult.count ?? orders.length,
        totalRevenue,
        ordersToday,
        ...inventorySummary,
      },
      recentOrders: (recentOrdersResult.data ?? []) as DashboardData["recentOrders"],
    },
    error: null,
  };
}

export async function getAdminProducts(searchQuery?: string): Promise<QueryState<Product[]>> {
  const { supabase } = await requireAdminSession();
  const query = sanitizeSearchTerm(searchQuery);
  let request = supabase.from("products").select(PRODUCT_COLUMNS).order("created_at", { ascending: false });

  if (query) {
    request = request.or(`name.ilike.%${query}%,caliber.ilike.%${query}%`);
  }

  const { data, error } = await request;

  if (error) {
    return { data: null, error: "Unable to load products right now." };
  }

  return {
    data: (data ?? []).map((row) => mapProductRow(row as ProductRow)),
    error: null,
  };
}

export async function getAdminProductById(productId: string): Promise<QueryState<ProductRow>> {
  const { supabase } = await requireAdminSession();

  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_COLUMNS)
    .eq("id", productId)
    .maybeSingle();

  if (error) {
    return { data: null, error: "Unable to load that product right now." };
  }

  if (!data) {
    return { data: null, error: "Product not found." };
  }

  return {
    data: data as ProductRow,
    error: null,
  };
}

export async function getAdminOrders(options?: {
  query?: string;
  status?: string;
}): Promise<QueryState<OrderRow[]>> {
  const { supabase } = await requireAdminSession();
  const query = sanitizeSearchTerm(options?.query);
  const status = (options?.status ?? "").trim().toLowerCase();
  let request = supabase.from("orders").select(ORDER_COLUMNS).order("created_at", { ascending: false });

  if (status && status !== "all" && ORDER_STATUS_OPTIONS.includes(status as (typeof ORDER_STATUS_OPTIONS)[number])) {
    request = request.eq("status", status);
  }

  if (query) {
    request = request.or(`customer_name.ilike.%${query}%,customer_email.ilike.%${query}%`);
  }

  const { data, error } = await request;

  if (error) {
    return { data: null, error: "Unable to load orders right now." };
  }

  return {
    data: (data ?? []) as OrderRow[],
    error: null,
  };
}

export async function getAdminOrderById(orderId: string): Promise<QueryState<OrderRow>> {
  const { supabase } = await requireAdminSession();

  const { data, error } = await supabase.from("orders").select(ORDER_COLUMNS).eq("id", orderId).maybeSingle();

  if (error) {
    return { data: null, error: "Unable to load that order right now." };
  }

  if (!data) {
    return { data: null, error: "Order not found." };
  }

  return {
    data: data as OrderRow,
    error: null,
  };
}

export function getCategoryOptions() {
  return [...PRODUCT_CATEGORY_OPTIONS];
}

export function getOrderStatusOptions() {
  return ORDER_STATUS_OPTIONS.map((status) => ({
    value: status,
    label: formatOrderStatusLabel(status),
  }));
}
