import Link from "next/link";
import { notFound } from "next/navigation";

import { AdminProductForm, type ProductFormValues } from "@/components/admin/admin-product-form";
import { getAdminProductById } from "@/lib/admin-data";
import { PRODUCT_CATEGORY_OPTIONS } from "@/lib/products";

type EditAdminProductPageProps = {
  params: Promise<{ id: string }>;
};

export const metadata = {
  title: "Edit Product | Admin",
};

export default async function EditAdminProductPage({ params }: EditAdminProductPageProps) {
  const { id } = await params;
  const result = await getAdminProductById(id);

  if (result.error && result.error === "Product not found.") {
    notFound();
  }

  if (result.error || !result.data) {
    return (
      <div className="mx-auto max-w-4xl rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
        {result.error ?? "Unable to load this product right now."}
      </div>
    );
  }

  const legacyCategory = PRODUCT_CATEGORY_OPTIONS.includes(
    result.data.category as (typeof PRODUCT_CATEGORY_OPTIONS)[number],
  )
    ? null
    : result.data.category;

  const normalizedCategory =
    result.data.category === "Pistol"
      ? "Handgun"
      : PRODUCT_CATEGORY_OPTIONS.includes(result.data.category as (typeof PRODUCT_CATEGORY_OPTIONS)[number])
        ? result.data.category ?? ""
        : "";

  const initialValues: ProductFormValues = {
    productId: result.data.id,
    previousSlug: result.data.slug,
    name: result.data.name,
    slug: result.data.slug,
    description: result.data.description ?? "",
    caliber: result.data.caliber,
    brand: result.data.brand ?? "",
    grain: result.data.grain?.toString() ?? "",
    roundCount: result.data.round_count?.toString() ?? "",
    price: String(result.data.price ?? ""),
    category: normalizedCategory,
    stockQuantity: result.data.stock_quantity?.toString() ?? "0",
    inStock: Boolean(result.data.in_stock),
    imageUrl: result.data.image_url ?? "",
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div className="space-y-2">
        <Link href="/admin/products" className="text-sm font-medium text-slate-600 transition hover:text-slate-900">
          ← Back to products
        </Link>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Edit product</h1>
        <p className="text-sm text-slate-600">Update details, inventory, pricing, or replace the product image.</p>
      </div>

      <AdminProductForm mode="edit" initialValues={initialValues} legacyCategory={legacyCategory} />
    </div>
  );
}
