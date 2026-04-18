import Link from "next/link";

import {
  ORDER_STATUS_OPTIONS,
  formatCurrency,
  formatDate,
  formatOrderStatusLabel,
  truncateId,
} from "@/lib/products";
import { getAdminOrders } from "@/lib/admin-data";

type AdminOrdersPageProps = {
  searchParams: Promise<{ q?: string; status?: string; message?: string; error?: string }>;
};

export const metadata = {
  title: "Orders | Admin",
};

export default async function AdminOrdersPage({ searchParams }: AdminOrdersPageProps) {
  const { q, status, message, error } = await searchParams;
  const result = await getAdminOrders({ query: q, status });

  if (result.error || !result.data) {
    return (
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">Orders</p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Manage customer orders</h1>
          <p className="text-sm text-slate-600">Review order details, search customers, and update fulfillment status.</p>
        </section>

        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          {result.error ?? "Unable to load orders right now."}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <section className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">Orders</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Manage customer orders</h1>
        <p className="text-sm text-slate-600">Review order details, search customers, and update fulfillment status.</p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <form method="get" className="grid gap-3 md:grid-cols-[minmax(0,1fr)_220px_auto]">
          <input
            type="search"
            name="q"
            defaultValue={q ?? ""}
            placeholder="Search by customer name or email"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          />
          <select
            name="status"
            defaultValue={status ?? "all"}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
          >
            <option value="all">All statuses</option>
            {ORDER_STATUS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {formatOrderStatusLabel(option)}
              </option>
            ))}
          </select>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
          >
            Filter
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
          <h2 className="text-lg font-semibold text-slate-900">No orders found</h2>
          <p className="mt-2 text-sm text-slate-600">Try a different search or status filter.</p>
        </div>
      ) : (
        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr className="text-left text-xs uppercase tracking-[0.16em] text-slate-500">
                  <th className="px-6 py-3">Order ID</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Customer</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3">Total</th>
                  <th className="px-6 py-3">Payment</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-sm text-slate-700">
                {result.data.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">
                      <Link href={`/admin/orders/${order.id}`} className="block">
                        #{truncateId(order.id).toUpperCase()}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/admin/orders/${order.id}`} className="block">
                        {formatDate(order.created_at)}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/admin/orders/${order.id}`} className="block">
                        {order.customer_name}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/admin/orders/${order.id}`} className="block">
                        {order.customer_email}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/admin/orders/${order.id}`} className="block">
                        {formatCurrency(order.total)}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/admin/orders/${order.id}`} className="block">
                        {formatOrderStatusLabel(order.payment_status)}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/admin/orders/${order.id}`} className="block">
                        <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
                          {formatOrderStatusLabel(order.status)}
                        </span>
                      </Link>
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
