import { redirect } from "next/navigation";

import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { getAuthenticatedAdminState } from "@/lib/supabase-server";

type AdminLoginPageProps = {
  searchParams: Promise<{ next?: string; error?: string }>;
};

export const metadata = {
  title: "Admin Login | RBS Ammunition",
};

export default async function AdminLoginPage({ searchParams }: AdminLoginPageProps) {
  const { user, isAdmin } = await getAuthenticatedAdminState();

  if (user && isAdmin) {
    redirect("/admin");
  }

  const { next, error } = await searchParams;
  const nextPath = next?.startsWith("/admin") ? next : "/admin";
  const initialError =
    error === "unauthorized" ? "That account is signed in, but it is not on the admin allowlist." : null;

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(226,232,240,0.9),transparent_45%),linear-gradient(180deg,#f8fafc_0%,#e2e8f0_100%)] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1.1fr_420px] lg:items-center">
        <section className="space-y-6">
          <span className="inline-flex rounded-full border border-slate-300 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600 shadow-sm">
            Internal Admin
          </span>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
              Manage products and orders without touching the storefront.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              This admin panel is for the site owner only. Sign in with the email and password created in Supabase Authentication.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur">
            <p className="text-sm leading-7 text-slate-600">
              Accounts are created manually in Supabase. There is no public signup page, and all other admin routes stay protected behind login.
            </p>
          </div>
        </section>

        <section className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/70">
          <div className="space-y-2">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-slate-500">RBS Ammunition</p>
            <h2 className="text-2xl font-semibold text-slate-900">Admin Sign In</h2>
            <p className="text-sm text-slate-600">Use your admin email and password to continue.</p>
          </div>

          <div className="mt-8">
            <AdminLoginForm nextPath={nextPath} initialError={initialError} />
          </div>
        </section>
      </div>
    </main>
  );
}
