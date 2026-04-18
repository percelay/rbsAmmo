import Link from "next/link";

import {
  formatCurrency,
  formatDate,
  formatOrderStatusLabel,
  truncateId,
} from "@/lib/products";
import { getDashboardData } from "@/lib/admin-data";

function StatCard({
  label,
  value,
  helper,
}: {
  label: string;
  value: string;
  helper: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <p className="text-sm font-medium text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">{value}</p>
      <p className="mt-2 text-sm text-slate-600">{helper}</p>
    </div>
  );
}

export const metadata = {
  title: "Admin Dashboard | RBS Ammunition",
};

export default async function AdminDashboardPage() {
  const result = await getDashboardData();

  if (result.error || !result.data) {
    return (
      <div className="mx-auto max-w-7xl space-y-8">
        <section className="space-y-2">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">Dashboard</p>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Store overview</h1>
          <p className="text-sm text-slate-600">Quick visibility into order activity, revenue, and current inventory status.</p>
        </section>

        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
          {result.error ?? "Unable to load dashboard data right now."}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      <section className="space-y-2">
        <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">Dashboard</p>
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Store overview</h1>
        <p className="text-sm text-slate-600">Quick visibility into order activity, revenue, and current inventory status.</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total Orders"
          value={String(result.data.stats.totalOrders)}
          helper="All orders in Supabase"
        />
        <StatCard
          label="Total Revenue"
          value={formatCurrency(result.data.stats.totalRevenue)}
          helper="Paid orders only"
        />
        <StatCard
          label="Orders Today"
          value={String(result.data.stats.ordersToday)}
          helper="Created since midnight"
        />
        <StatCard
          label="Inventory"
          value={`${result.data.stats.inStockProducts} / ${result.data.stats.outOfStockProducts}`}
          helper="In stock / out of stock"
        />
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-200 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Recent orders</h2>
            <p className="text-sm text-slate-600">The 5 most recent customer orders.</p>
          </div>
          <Link
            href="/admin/orders"
            className="inline-flex items-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
          >
            View all orders
          </Link>
        </div>

        {result.data.recentOrders.length === 0 ? (
          <div className="px-6 py-12 text-center text-sm text-slate-500">No orders have been placed yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr className="text-left text-xs uppercase tracking-[0.16em] text-slate-500">
                  <th className="px-6 py-3">Order</th>
                  <th className="px-6 py-3">Customer</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Total</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {result.data.recentOrders.map((order) => (
                  <tr key={order.id} className="text-sm text-slate-700">
                    <td className="px-6 py-4 font-medium text-slate-900">
                      <Link href={`/admin/orders/${order.id}`} className="transition hover:text-slate-600">
                        #{truncateId(order.id).toUpperCase()}
                      </Link>
                    </td>
                    <td className="px-6 py-4">{order.customer_name}</td>
                    <td className="px-6 py-4">{formatDate(order.created_at)}</td>
                    <td className="px-6 py-4">{formatCurrency(order.total)}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700">
                        {formatOrderStatusLabel(order.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
