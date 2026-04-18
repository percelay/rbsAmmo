"use client";

import Image from "next/image";
import { useActionState, useEffect, useState } from "react";

import { saveProductAction } from "@/app/admin/actions";
import { AdminSubmitButton } from "@/components/admin/admin-submit-button";
import { PRODUCT_CATEGORY_OPTIONS } from "@/lib/products";

export type ProductFormValues = {
  productId: string;
  previousSlug: string;
  name: string;
  slug: string;
  description: string;
  caliber: string;
  brand: string;
  grain: string;
  roundCount: string;
  price: string;
  category: string;
  stockQuantity: string;
  inStock: boolean;
  imageUrl: string;
};

type AdminProductFormProps = {
  mode: "create" | "edit";
  initialValues: ProductFormValues;
  legacyCategory?: string | null;
};

function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function AdminProductForm({ mode, initialValues, legacyCategory }: AdminProductFormProps) {
  const [state, formAction] = useActionState(saveProductAction, {
    message: null,
    fieldErrors: {},
  });
  const [values, setValues] = useState(initialValues);
  const [slugTouched, setSlugTouched] = useState(
    Boolean(initialValues.productId) && initialValues.slug !== slugify(initialValues.name),
  );
  const [selectedFileName, setSelectedFileName] = useState("");
  const generatedSlug = slugify(values.name);

  useEffect(() => {
    if (!slugTouched) {
      setValues((current) => {
        if (current.slug === generatedSlug) {
          return current;
        }

        return {
          ...current,
          slug: generatedSlug,
        };
      });
    }
  }, [generatedSlug, slugTouched]);

  function updateValue(name: keyof ProductFormValues, value: string | boolean) {
    setValues((current) => ({
      ...current,
      [name]: value,
    }));
  }

  return (
    <form action={formAction} className="space-y-8">
      <input type="hidden" name="productId" value={values.productId} />
      <input type="hidden" name="previousSlug" value={values.previousSlug} />
      <input type="hidden" name="existingImageUrl" value={values.imageUrl} />

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-8">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-slate-900">Product Details</h2>
              <p className="text-sm text-slate-600">Fill in the core storefront information for this product.</p>
            </div>

            <div className="mt-6 grid gap-5">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-slate-700">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  value={values.name}
                  onChange={(event) => updateValue("name", event.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                />
                {state.fieldErrors.name && <p className="text-sm text-red-600">{state.fieldErrors.name}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="slug" className="block text-sm font-medium text-slate-700">
                  Slug
                </label>
                <input
                  id="slug"
                  name="slug"
                  required
                  value={values.slug}
                  onChange={(event) => {
                    setSlugTouched(true);
                    updateValue("slug", event.target.value);
                  }}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                />
                <p className="text-xs text-slate-500">Used in the product URL. It auto-fills from the name until you edit it.</p>
                {state.fieldErrors.slug && <p className="text-sm text-red-600">{state.fieldErrors.slug}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-medium text-slate-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={6}
                  value={values.description}
                  onChange={(event) => updateValue("description", event.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-slate-900">Specs & Pricing</h2>
              <p className="text-sm text-slate-600">These fields drive the public product cards and detail page.</p>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="caliber" className="block text-sm font-medium text-slate-700">
                  Caliber
                </label>
                <input
                  id="caliber"
                  name="caliber"
                  required
                  value={values.caliber}
                  onChange={(event) => updateValue("caliber", event.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                />
                {state.fieldErrors.caliber && <p className="text-sm text-red-600">{state.fieldErrors.caliber}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="brand" className="block text-sm font-medium text-slate-700">
                  Brand
                </label>
                <input
                  id="brand"
                  name="brand"
                  value={values.brand}
                  onChange={(event) => updateValue("brand", event.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="grain" className="block text-sm font-medium text-slate-700">
                  Grain
                </label>
                <input
                  id="grain"
                  name="grain"
                  type="number"
                  min="0"
                  step="1"
                  value={values.grain}
                  onChange={(event) => updateValue("grain", event.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                />
                {state.fieldErrors.grain && <p className="text-sm text-red-600">{state.fieldErrors.grain}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="roundCount" className="block text-sm font-medium text-slate-700">
                  Round count
                </label>
                <input
                  id="roundCount"
                  name="roundCount"
                  type="number"
                  min="0"
                  step="1"
                  value={values.roundCount}
                  onChange={(event) => updateValue("roundCount", event.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                />
                {state.fieldErrors.roundCount && <p className="text-sm text-red-600">{state.fieldErrors.roundCount}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="price" className="block text-sm font-medium text-slate-700">
                  Price
                </label>
                <input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  required
                  value={values.price}
                  onChange={(event) => updateValue("price", event.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                />
                {state.fieldErrors.price && <p className="text-sm text-red-600">{state.fieldErrors.price}</p>}
              </div>

              <div className="space-y-2">
                <label htmlFor="category" className="block text-sm font-medium text-slate-700">
                  Category
                </label>
                {legacyCategory && (
                  <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                    This product currently uses the legacy category <strong>{legacyCategory}</strong>. Choose one of the new admin categories before saving.
                  </div>
                )}
                <select
                  id="category"
                  name="category"
                  required
                  value={values.category}
                  onChange={(event) => updateValue("category", event.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                >
                  <option value="">Select a category</option>
                  {PRODUCT_CATEGORY_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {state.fieldErrors.category && <p className="text-sm text-red-600">{state.fieldErrors.category}</p>}
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-slate-900">Inventory</h2>
              <p className="text-sm text-slate-600">Track availability exactly the way the client will see it.</p>
            </div>

            <div className="mt-6 space-y-5">
              <div className="space-y-2">
                <label htmlFor="stockQuantity" className="block text-sm font-medium text-slate-700">
                  Stock quantity
                </label>
                <input
                  id="stockQuantity"
                  name="stockQuantity"
                  type="number"
                  min="0"
                  step="1"
                  value={values.stockQuantity}
                  onChange={(event) => updateValue("stockQuantity", event.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                />
                {state.fieldErrors.stockQuantity && (
                  <p className="text-sm text-red-600">{state.fieldErrors.stockQuantity}</p>
                )}
              </div>

              <label className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-700">
                <input
                  type="checkbox"
                  name="inStock"
                  checked={values.inStock}
                  onChange={(event) => updateValue("inStock", event.target.checked)}
                  className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-400"
                />
                <span>
                  <span className="block font-medium text-slate-900">In stock</span>
                  <span className="mt-1 block text-slate-600">Leave unchecked if the product should show as unavailable.</span>
                </span>
              </label>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-slate-900">Product Image</h2>
              <p className="text-sm text-slate-600">Upload a new image or leave the field blank to keep the current one.</p>
            </div>

            <div className="mt-6 space-y-4">
              {values.imageUrl ? (
                <div className="relative h-48 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
                  <Image
                    src={values.imageUrl}
                    alt={values.name || "Current product image"}
                    fill
                    className="object-cover"
                    sizes="320px"
                  />
                </div>
              ) : (
                <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
                  No image uploaded yet.
                </div>
              )}

              <div className="space-y-2">
                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  onChange={(event) => setSelectedFileName(event.target.files?.[0]?.name ?? "")}
                  className="block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 file:mr-4 file:rounded-lg file:border-0 file:bg-slate-900 file:px-3 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-slate-700"
                />
                {selectedFileName && <p className="text-sm text-slate-600">Selected file: {selectedFileName}</p>}
                {state.fieldErrors.image && <p className="text-sm text-red-600">{state.fieldErrors.image}</p>}
              </div>
            </div>
          </section>
        </div>
      </div>

      {state.message && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.message}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-500">
          {mode === "create" ? "New products will appear on the storefront after the next revalidation." : "Your changes will be reflected on the storefront after revalidation."}
        </p>
        <AdminSubmitButton
          label={mode === "create" ? "Create Product" : "Save Changes"}
          pendingLabel={mode === "create" ? "Creating..." : "Saving..."}
        />
      </div>
    </form>
  );
}
