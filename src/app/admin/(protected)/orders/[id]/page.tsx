import Link from "next/link";
import { notFound } from "next/navigation";

import { updateOrderStatusAction } from "@/app/admin/actions";
import { AdminSubmitButton } from "@/components/admin/admin-submit-button";
import { getAdminOrderById } from "@/lib/admin-data";
import {
  ORDER_STATUS_OPTIONS,
  formatCurrency,
  formatDateTime,
  formatOrderStatusLabel,
  truncateId,
  type OrderItem,
} from "@/lib/products";

type AdminOrderDetailPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ message?: string; error?: string }>;
};

function renderAddress(orderAddress: Record<string, unknown> | null) {
  if (!orderAddress) {
    return (
      <p className="text-sm text-slate-600">No shipping address was saved for this order.</p>
    );
  }

  const lines = [
    orderAddress.street,
    [orderAddress.city, orderAddress.state].filter(Boolean).join(", "),
    orderAddress.zip,
  ]
    .map((value) => String(value ?? "").trim())
    .filter(Boolean);

  if (lines.length === 0) {
    return <p className="text-sm text-slate-600">No shipping address was saved for this order.</p>;
  }

  return (
    <div className="space-y-1 text-sm text-slate-700">
      {lines.map((line) => (
        <p key={line}>{line}</p>
      ))}
    </div>
  );
}

export const metadata = {
  title: "Order Detail | Admin",
};

export default async function AdminOrderDetailPage({
  params,
  searchParams,
}: AdminOrderDetailPageProps) {
  const { id } = await params;
  const { message, error } = await searchParams;
  const result = await getAdminOrderById(id);

  if (result.error && result.error === "Order not found.") {
    notFound();
  }

  if (result.error || !result.data) {
    return (
      <div className="mx-auto max-w-4xl rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
        {result.error ?? "Unable to load this order right now."}
      </div>
    );
  }

  const order = result.data;
  const orderItems = (order.items ?? []) as OrderItem[];

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <div className="space-y-2">
        <Link href="/admin/orders" className="text-sm font-medium text-slate-600 transition hover:text-slate-900">
          ← Back to orders
        </Link>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">Order detail</p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900">
              Order #{truncateId(order.id).toUpperCase()}
            </h1>
            <p className="mt-2 text-sm text-slate-600">Placed {formatDateTime(order.created_at)}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
              Payment: {formatOrderStatusLabel(order.payment_status)}
            </span>
            <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
              Status: {formatOrderStatusLabel(order.status)}
            </span>
          </div>
        </div>
      </div>

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

      <div className="grid gap-8 xl:grid-cols-[minmax(0,1.2fr)_360px]">
        <div className="space-y-8">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Customer</h2>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-slate-500">Name</p>
                <p className="mt-1 text-sm text-slate-900">{order.customer_name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Email</p>
                <p className="mt-1 text-sm text-slate-900">{order.customer_email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Age verified</p>
                <p className="mt-1 text-sm text-slate-900">{order.age_verified ? "Yes" : "No"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">Transaction ID</p>
                <p className="mt-1 break-all text-sm text-slate-900">{order.transaction_id ?? "Not provided"}</p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Shipping address</h2>
            <div className="mt-5">{renderAddress(order.shipping_address as Record<string, unknown> | null)}</div>
          </section>

          <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-6 py-5">
              <h2 className="text-lg font-semibold text-slate-900">Order items</h2>
            </div>

            {orderItems.length === 0 ? (
              <div className="px-6 py-12 text-center text-sm text-slate-500">No line items were saved for this order.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr className="text-left text-xs uppercase tracking-[0.16em] text-slate-500">
                      <th className="px-6 py-3">Product</th>
                      <th className="px-6 py-3">Quantity</th>
                      <th className="px-6 py-3">Unit Price</th>
                      <th className="px-6 py-3">Line Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
                    {orderItems.map((item, index) => {
                      const quantity = Number(item.quantity ?? 0);
                      const unitPrice = Number(item.price ?? 0);

                      return (
                        <tr key={`${item.name}-${index}`}>
                          <td className="px-6 py-4 font-medium text-slate-900">{item.name}</td>
                          <td className="px-6 py-4">{quantity}</td>
                          <td className="px-6 py-4">{formatCurrency(unitPrice)}</td>
                          <td className="px-6 py-4">{formatCurrency(quantity * unitPrice)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        </div>

        <div className="space-y-8">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Update status</h2>
            <p className="mt-2 text-sm text-slate-600">Set the current order status and save it back to Supabase.</p>

            <form action={updateOrderStatusAction} className="mt-6 space-y-4">
              <input type="hidden" name="orderId" value={order.id} />
              <div className="space-y-2">
                <label htmlFor="status" className="block text-sm font-medium text-slate-700">
                  Order status
                </label>
                <select
                  id="status"
                  name="status"
                  defaultValue={order.status}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                >
                  {ORDER_STATUS_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {formatOrderStatusLabel(option)}
                    </option>
                  ))}
                </select>
              </div>

              <AdminSubmitButton label="Save Status" pendingLabel="Saving..." className="w-full" />
            </form>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">Totals</h2>
            <div className="mt-5 space-y-3 text-sm text-slate-700">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Subtotal</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Shipping</span>
                <span>{formatCurrency(order.shipping_cost)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Tax</span>
                <span>{formatCurrency(order.tax)}</span>
              </div>
              <div className="flex items-center justify-between border-t border-slate-200 pt-3 text-base font-semibold text-slate-900">
                <span>Total</span>
                <span>{formatCurrency(order.total)}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
