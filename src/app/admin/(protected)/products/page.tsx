import Image from "next/image";
import Link from "next/link";

import { DeleteProductButton } from "@/components/admin/delete-product-button";
import { formatCurrency } from "@/lib/products";
import { getAdminProducts } from "@/lib/admin-data";

type AdminProductsPageProps = {
  searchParams: Promise<{ q?: string; message?: string; error?: string }>;
};

export const metadata = {
  title: "Products | Admin",
};

export default async function AdminProductsPage({ searchParams }: AdminProductsPageProps) {
  const { q, message, error } = await searchParams;
  const result = await getAdminProducts(q);

  if (result.error || !result.data) {
    return (
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">Products</p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Manage inventory</h1>
            <p className="text-sm text-slate-600">Search, edit, add, or remove products from the storefront.</p>
          </div>

          <Link
            href="/admin/products/new"
            className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            Add New Product
          </Link>
        </section>

        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          {result.error ?? "Unable to load products right now."}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">Products</p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Manage inventory</h1>
          <p className="text-sm text-slate-600">Search, edit, add, or remove products from the storefront.</p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
        >
          Add New Product
        </Link>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <form className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto]" method="get">
          <input
            type="search"
            name="q"
            defaultValue={q ?? ""}
            placeholder="Search by name or caliber"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
          >
            Search
          </button>
        </form>
      </section>

      {message && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm text-emerald-700">
          {message}
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {result.data.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">No products found</h2>
          <p className="mt-2 text-sm text-slate-600">Try a different search or add your first product.</p>
        </div>
      ) : (
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr className="text-left text-xs uppercase tracking-[0.16em] text-slate-500">
                  <th className="px-6 py-3">Image</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Caliber</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Stock</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
                {result.data.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4">
                      <div className="relative h-16 w-16 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                        {product.imageSrc ? (
                          <Image src={product.imageSrc} alt={product.name} fill className="object-cover" sizes="64px" />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-slate-400">No image</div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{product.name}</div>
                      <div className="mt-1 text-xs text-slate-500">{product.slug}</div>
                    </td>
                    <td className="px-6 py-4">{product.caliber}</td>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4">{formatCurrency(product.price)}</td>
                    <td className="px-6 py-4">{product.stockQuantity}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${
                          product.inStock
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "border-slate-200 bg-slate-50 text-slate-600"
                        }`}
                      >
                        {product.inStock ? "In stock" : "Out of stock"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-2">
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
                        >
                          Edit
                        </Link>
                        <DeleteProductButton
                          productId={product.id}
                          productSlug={product.slug}
                          productName={product.name}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
