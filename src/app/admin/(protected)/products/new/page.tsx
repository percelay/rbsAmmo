import Link from "next/link";

import { AdminProductForm, type ProductFormValues } from "@/components/admin/admin-product-form";
import { PRODUCT_CATEGORY_OPTIONS } from "@/lib/products";

const emptyProductValues: ProductFormValues = {
  productId: "",
  previousSlug: "",
  name: "",
  slug: "",
  description: "",
  caliber: "",
  brand: "",
  grain: "",
  roundCount: "",
  price: "",
  category: PRODUCT_CATEGORY_OPTIONS[0],
  stockQuantity: "0",
  inStock: false,
  imageUrl: "",
};

export const metadata = {
  title: "Add Product | Admin",
};

export default function NewAdminProductPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div className="space-y-2">
        <Link href="/admin/products" className="text-sm font-medium text-slate-600 transition hover:text-slate-900">
          ← Back to products
        </Link>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Add new product</h1>
        <p className="text-sm text-slate-600">Create a product record and optionally upload its storefront image.</p>
      </div>

      <AdminProductForm mode="create" initialValues={emptyProductValues} />
    </div>
  );
}
