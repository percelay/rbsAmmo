function normalizeEmail(email: string | null | undefined) {
  return email?.trim().toLowerCase() ?? "";
}

export async function isAdminEmail(
  supabase: any,
  email: string | null | undefined,
) {
  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail) {
    return false;
  }

  const { data, error } = await supabase
    .from("admin_users")
    .select("email")
    .eq("email", normalizedEmail)
    .maybeSingle();

  if (error) {
    console.error("Failed to verify admin access:", error.message ?? error);
    return false;
  }

  return Boolean(data);
}
