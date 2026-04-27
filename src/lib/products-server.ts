import "server-only";

import {
  mapProductRow,
  type Product,
  type ProductRow,
  type ProductVariantRow,
  type StorefrontCategory,
} from "@/lib/products";
import { supabase } from "@/lib/supabase";

export const PRODUCT_COLUMNS = `
  id,
  name,
  slug,
  description,
  caliber,
  brand,
  grain,
  round_count,
  price,
  image_url,
  in_stock,
  stock_quantity,
  category,
  sort_order,
  created_at,
  updated_at
`;

const VARIANT_COLUMNS = `
  id,
  product_id,
  label,
  round_count,
  sku,
  price,
  in_stock,
  stock_quantity,
  sort_order
`;

async function fetchVariantsForProductIds(productIds: string[]): Promise<Map<string, ProductVariantRow[]>> {
  const grouped = new Map<string, ProductVariantRow[]>();
  if (productIds.length === 0) return grouped;

  const { data, error } = await supabase
    .from("product_variants")
    .select(VARIANT_COLUMNS)
    .in("product_id", productIds);

  if (error) {
    console.error("Failed to load product variants:", error.message);
    return grouped;
  }

  for (const row of (data ?? []) as ProductVariantRow[]) {
    const list = grouped.get(row.product_id) ?? [];
    list.push(row);
    grouped.set(row.product_id, list);
  }

  return grouped;
}

export async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_COLUMNS)
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) {
    console.error("Failed to load products:", error.message);
    return [];
  }

  const rows = (data ?? []) as ProductRow[];
  const variantsByProductId = await fetchVariantsForProductIds(rows.map((r) => r.id));

  return rows.map((row) => mapProductRow(row, variantsByProductId.get(row.id)));
}

export async function getFeaturedProducts(count = 6): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter((product) => product.inStock).slice(0, count);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select(PRODUCT_COLUMNS)
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error(`Failed to load product for slug "${slug}":`, error.message);
    return null;
  }

  if (!data) return null;

  const row = data as ProductRow;
  const variantsByProductId = await fetchVariantsForProductIds([row.id]);

  return mapProductRow(row, variantsByProductId.get(row.id));
}

export async function getProductsByCategory(category: StorefrontCategory): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter((product) => product.storefrontCategory === category);
}
