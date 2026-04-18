export const PRODUCT_CATEGORY_OPTIONS = [
  "Handgun",
  "Rifle",
  "Shotgun",
  "Rimfire",
  "Bullets",
  "Brass",
] as const;

type AdminProductCategory = (typeof PRODUCT_CATEGORY_OPTIONS)[number];

export type ProductCategory = AdminProductCategory | "Pistol" | "Reloading";

export const STOREFRONT_CATEGORY_OPTIONS = ["Pistol", "Rifle", "Reloading"] as const;

export type StorefrontCategory = (typeof STOREFRONT_CATEGORY_OPTIONS)[number];

export const ORDER_STATUS_OPTIONS = ["pending", "paid", "shipped", "delivered", "cancelled"] as const;

export type OrderStatus = (typeof ORDER_STATUS_OPTIONS)[number];

export const PAYMENT_STATUS_OPTIONS = ["unpaid", "paid"] as const;

export type PaymentStatus = (typeof PAYMENT_STATUS_OPTIONS)[number];

export type ProductVariant = {
  label: string;
  roundCount: number;
  price: number;
};

export type ProductRow = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  caliber: string;
  brand: string | null;
  grain: number | null;
  round_count: number | null;
  price: number | string;
  image_url: string | null;
  in_stock: boolean | null;
  stock_quantity: number | null;
  category: string | null;
  created_at?: string | null;
  updated_at?: string | null;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  caliber: string;
  brand: string;
  grain: number | null;
  roundCount: number;
  price: number;
  imageSrc: string | null;
  inStock: boolean;
  stockQuantity: number;
  category: ProductCategory;
  storefrontCategory: StorefrontCategory;
  variants?: ProductVariant[];
};

export type ShippingAddress = {
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  [key: string]: unknown;
};

export type OrderItem = {
  product_id?: string;
  name: string;
  quantity: number;
  price: number | string;
};

export type OrderRow = {
  id: string;
  status: string;
  customer_email: string;
  customer_name: string;
  shipping_address: ShippingAddress | null;
  items: OrderItem[] | null;
  subtotal: number | string | null;
  shipping_cost: number | string | null;
  tax: number | string | null;
  total: number | string;
  payment_status: string | null;
  transaction_id: string | null;
  age_verified: boolean | null;
  created_at: string;
};

export function toNumber(value: number | string | null | undefined) {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

export function normalizeProductCategory(value: string | null | undefined): ProductCategory {
  const normalized = (value ?? "").trim().toLowerCase();

  switch (normalized) {
    case "handgun":
      return "Handgun";
    case "rifle":
      return "Rifle";
    case "shotgun":
      return "Shotgun";
    case "rimfire":
      return "Rimfire";
    case "bullets":
      return "Bullets";
    case "brass":
      return "Brass";
    case "pistol":
      return "Pistol";
    case "reloading":
      return "Reloading";
    default:
      return "Rifle";
  }
}

export function getStorefrontCategory(category: string | null | undefined): StorefrontCategory {
  const normalized = normalizeProductCategory(category);

  if (normalized === "Handgun" || normalized === "Pistol") {
    return "Pistol";
  }

  if (normalized === "Bullets" || normalized === "Brass" || normalized === "Reloading") {
    return "Reloading";
  }

  return "Rifle";
}

export function mapProductRow(row: ProductRow): Product {
  const category = normalizeProductCategory(row.category);
  const stockQuantity = row.stock_quantity ?? 0;
  const inStock = Boolean(row.in_stock ?? true) && stockQuantity > 0;

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description ?? "",
    caliber: row.caliber,
    brand: row.brand ?? "",
    grain: row.grain,
    roundCount: row.round_count ?? 0,
    price: toNumber(row.price),
    imageSrc: row.image_url,
    inStock,
    stockQuantity,
    category,
    storefrontCategory: getStorefrontCategory(category),
  };
}

export function getAllCategories(): StorefrontCategory[] {
  return [...STOREFRONT_CATEGORY_OPTIONS];
}

export function filterProducts(products: Product[], category?: string, sort?: string): Product[] {
  let result = [...products];

  if (category && category !== "All") {
    result = result.filter(
      (product) => product.storefrontCategory === category || product.category === category,
    );
  }

  if (sort === "price-asc") {
    result.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    result.sort((a, b) => b.price - a.price);
  } else if (sort === "name") {
    result.sort((a, b) => a.name.localeCompare(b.name));
  }

  return result;
}

export function formatPriceRange(product: Product): string {
  if (!product.variants || product.variants.length < 2) {
    return formatCurrency(product.price);
  }

  const prices = product.variants.map((variant) => variant.price);

  return `${formatCurrency(Math.min(...prices))} - ${formatCurrency(Math.max(...prices))}`;
}

export function formatCurrency(value: number | string | null | undefined) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(toNumber(value));
}

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

export function formatOrderStatusLabel(value: string | null | undefined) {
  const normalized = (value ?? "pending").trim().toLowerCase();
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
}

export function truncateId(value: string, length = 8) {
  return value.length <= length ? value : value.slice(0, length);
}

export function formatAddress(address: ShippingAddress | null | undefined) {
  if (!address) {
    return "No shipping address provided";
  }

  const parts = [address.street, address.city, address.state, address.zip].filter(Boolean);

  return parts.length > 0 ? parts.join(", ") : "No shipping address provided";
}
