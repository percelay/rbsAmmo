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

const STOREFRONT_CATEGORY_RANK: Record<StorefrontCategory, number> = {
  Pistol: 0,
  Rifle: 1,
  Reloading: 2,
};

export const ROUND_COUNT_FILTERS = ["50", "250"] as const;
export type RoundCountFilter = (typeof ROUND_COUNT_FILTERS)[number];

export const ORDER_STATUS_OPTIONS = ["pending", "paid", "shipped", "delivered", "cancelled"] as const;

export type OrderStatus = (typeof ORDER_STATUS_OPTIONS)[number];

export const PAYMENT_STATUS_OPTIONS = ["unpaid", "paid"] as const;

export type PaymentStatus = (typeof PAYMENT_STATUS_OPTIONS)[number];

export type ProductVariant = {
  id: string;
  label: string;
  roundCount: number;
  price: number;
  sku: string | null;
  inStock: boolean;
  stockQuantity: number;
};

export type ProductVariantRow = {
  id: string;
  product_id: string;
  label: string;
  round_count: number;
  sku: string | null;
  price: number | string;
  in_stock: boolean | null;
  stock_quantity: number | null;
  sort_order: number | null;
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
  sort_order?: number | null;
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
  sortOrder: number;
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

export function mapProductVariantRow(row: ProductVariantRow): ProductVariant {
  return {
    id: row.id,
    label: row.label,
    roundCount: row.round_count,
    price: toNumber(row.price),
    sku: row.sku,
    inStock: Boolean(row.in_stock ?? true),
    stockQuantity: row.stock_quantity ?? 0,
  };
}

export function mapProductRow(row: ProductRow, variantRows?: ProductVariantRow[]): Product {
  const category = normalizeProductCategory(row.category);
  const stockQuantity = row.stock_quantity ?? 0;
  const inStock = Boolean(row.in_stock ?? true);

  const variants = variantRows && variantRows.length > 0
    ? variantRows
        .slice()
        .sort((a, b) => {
          const aOrder = a.sort_order ?? 0;
          const bOrder = b.sort_order ?? 0;
          if (aOrder !== bOrder) return aOrder - bOrder;
          return a.round_count - b.round_count;
        })
        .map(mapProductVariantRow)
    : undefined;

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
    sortOrder: row.sort_order ?? 0,
    variants,
  };
}

function productMatchesRoundCount(product: Product, count: number): boolean {
  if (product.variants && product.variants.length > 0) {
    return product.variants.some((variant) => variant.roundCount === count);
  }
  return product.roundCount === count;
}

export function getAllCategories(): StorefrontCategory[] {
  return [...STOREFRONT_CATEGORY_OPTIONS];
}

export function filterProducts(
  products: Product[],
  category?: string,
  sort?: string,
  roundCount?: string,
): Product[] {
  let result = [...products];

  if (category && category !== "All") {
    result = result.filter(
      (product) => product.storefrontCategory === category || product.category === category,
    );
  }

  if (roundCount) {
    const count = Number(roundCount);
    if (Number.isFinite(count)) {
      result = result.filter((product) => productMatchesRoundCount(product, count));
    }
  }

  if (sort === "price-asc") {
    result.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    result.sort((a, b) => b.price - a.price);
  } else if (sort === "name") {
    result.sort((a, b) => a.name.localeCompare(b.name));
  } else {
    // Default: storefront category group (Pistol → Rifle → Reloading), then sort_order, then name
    result.sort((a, b) => {
      const catDiff =
        STOREFRONT_CATEGORY_RANK[a.storefrontCategory] -
        STOREFRONT_CATEGORY_RANK[b.storefrontCategory];
      if (catDiff !== 0) return catDiff;
      if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
      return a.name.localeCompare(b.name);
    });
  }

  return result;
}

export function formatPriceRange(product: Product): string {
  if (!product.variants || product.variants.length < 2) {
    return formatCurrency(product.price);
  }

  const prices = product.variants.map((variant) => variant.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);

  if (min === max) return formatCurrency(min);

  return `${formatCurrency(min)} – ${formatCurrency(max)}`;
}

export function formatRoundCountOptions(product: Product): string {
  if (!product.variants || product.variants.length === 0) {
    return `${product.roundCount} ct`;
  }

  return product.variants
    .map((variant) => (variant.roundCount === 250 ? "250ct Sport Pack" : `${variant.roundCount}ct Box`))
    .join(" / ");
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
