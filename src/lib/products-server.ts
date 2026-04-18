import "server-only";

import { mapProductRow, type Product, type ProductRow, type StorefrontCategory } from "@/lib/products";
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
  created_at,
  updated_at
`;

export async function getAllProducts(): Promise<Product[]> {
  const { data, error } = await supabase.from("products").select(PRODUCT_COLUMNS).order("name");

  if (error) {
    console.error("Failed to load products:", error.message);
    return [];
  }

  return (data ?? []).map((row) => mapProductRow(row as ProductRow));
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

  return data ? mapProductRow(data as ProductRow) : null;
}

export async function getProductsByCategory(category: StorefrontCategory): Promise<Product[]> {
  const products = await getAllProducts();
  return products.filter((product) => product.storefrontCategory === category);
}
