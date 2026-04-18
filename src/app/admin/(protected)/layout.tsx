import Link from "next/link";
import { redirect } from "next/navigation";

import { logoutAction } from "@/app/admin/actions";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { getAuthenticatedAdminState } from "@/lib/supabase-server";

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isAdmin } = await getAuthenticatedAdminState();

  if (!user || !isAdmin) {
    redirect("/admin/login?error=unauthorized");
  }

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="grid min-h-screen lg:grid-cols-[260px_1fr]">
        <aside className="border-b border-slate-200 bg-white px-4 py-6 shadow-sm lg:border-b-0 lg:border-r lg:px-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Link href="/admin" className="text-lg font-semibold tracking-tight text-slate-900">
                RBS Admin
              </Link>
              <p className="text-sm text-slate-600">Simple tools for managing products and customer orders.</p>
            </div>

            <AdminSidebar />
          </div>
        </aside>

        <div className="flex min-h-screen flex-col">
          <header className="border-b border-slate-200 bg-white px-4 py-4 shadow-sm sm:px-6 lg:px-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium text-slate-900">Signed in as</p>
                <p className="text-sm text-slate-600">{user.email}</p>
              </div>

              <form action={logoutAction}>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:text-slate-900"
                >
                  Logout
                </button>
              </form>
            </div>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
