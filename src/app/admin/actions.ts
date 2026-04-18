"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { isAdminEmail } from "@/lib/admin-auth";
import { ORDER_STATUS_OPTIONS, PRODUCT_CATEGORY_OPTIONS } from "@/lib/products";
import { createServerSupabaseClient } from "@/lib/supabase-server";

type LoginFormState = {
  error: string | null;
};

type ProductFieldName =
  | "name"
  | "slug"
  | "caliber"
  | "price"
  | "category"
  | "grain"
  | "roundCount"
  | "stockQuantity"
  | "image";

export type ProductFormState = {
  message: string | null;
  fieldErrors: Partial<Record<ProductFieldName, string>>;
};

function toSafeAdminPath(value: string | null) {
  if (!value || !value.startsWith("/admin")) {
    return "/admin";
  }

  return value;
}

function slugify(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .toLowerCase()
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseOptionalInteger(value: FormDataEntryValue | null) {
  const normalized = String(value ?? "").trim();

  if (!normalized) {
    return null;
  }

  const parsed = Number.parseInt(normalized, 10);
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

function parseRequiredNumber(value: FormDataEntryValue | null) {
  const normalized = String(value ?? "").trim();
  const parsed = Number.parseFloat(normalized);
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

function getFileExtension(fileName: string) {
  const extension = fileName.split(".").pop()?.toLowerCase();
  return extension && extension.length <= 5 ? extension : "jpg";
}

function hasSelectedFile(value: FormDataEntryValue | null): value is File {
  return value instanceof File && value.size > 0;
}

function buildAdminRedirect(pathname: string, key: "message" | "error", value: string) {
  const params = new URLSearchParams({ [key]: value });
  return `${pathname}?${params.toString()}`;
}

export async function loginAction(
  _previousState: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const nextPath = toSafeAdminPath(String(formData.get("next") ?? ""));

  if (!email || !password) {
    return {
      error: "Enter both your email and password to continue.",
    };
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return {
      error: "The email or password was incorrect. Please try again.",
    };
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAdmin = await isAdminEmail(supabase, user?.email);

  if (!user || !isAdmin) {
    await supabase.auth.signOut();
    return {
      error: "This account is not authorized for admin access.",
    };
  }

  redirect(nextPath);
}

export async function logoutAction() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function saveProductAction(
  _previousState: ProductFormState,
  formData: FormData,
): Promise<ProductFormState> {
  const productId = String(formData.get("productId") ?? "").trim();
  const previousSlug = String(formData.get("previousSlug") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const rawSlug = String(formData.get("slug") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const caliber = String(formData.get("caliber") ?? "").trim();
  const brand = String(formData.get("brand") ?? "").trim();
  const grain = parseOptionalInteger(formData.get("grain"));
  const roundCount = parseOptionalInteger(formData.get("roundCount"));
  const price = parseRequiredNumber(formData.get("price"));
  const category = String(formData.get("category") ?? "").trim();
  const stockQuantity = parseOptionalInteger(formData.get("stockQuantity"));
  const inStock = formData.get("inStock") === "on";
  const existingImageUrl = String(formData.get("existingImageUrl") ?? "").trim();
  const imageFile = formData.get("image");
  const slug = slugify(rawSlug || name);

  const fieldErrors: ProductFormState["fieldErrors"] = {};

  if (!name) {
    fieldErrors.name = "Product name is required.";
  }

  if (!slug) {
    fieldErrors.slug = "Slug is required.";
  }

  if (!caliber) {
    fieldErrors.caliber = "Caliber is required.";
  }

  if (!Number.isFinite(price) || price <= 0) {
    fieldErrors.price = "Price must be a positive number.";
  }

  if (!PRODUCT_CATEGORY_OPTIONS.includes(category as (typeof PRODUCT_CATEGORY_OPTIONS)[number])) {
    fieldErrors.category = "Choose a valid category.";
  }

  if (grain !== null && (!Number.isFinite(grain) || grain < 0)) {
    fieldErrors.grain = "Grain must be a whole number of 0 or greater.";
  }

  if (roundCount !== null && (!Number.isFinite(roundCount) || roundCount < 0)) {
    fieldErrors.roundCount = "Round count must be a whole number of 0 or greater.";
  }

  if (stockQuantity !== null && (!Number.isFinite(stockQuantity) || stockQuantity < 0)) {
    fieldErrors.stockQuantity = "Stock quantity must be a whole number of 0 or greater.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return {
      message: "Please fix the highlighted fields and try again.",
      fieldErrors,
    };
  }

  const supabase = await createServerSupabaseClient();
  let imageUrl = existingImageUrl || null;

  if (hasSelectedFile(imageFile)) {
    const fileBuffer = new Uint8Array(await imageFile.arrayBuffer());
    const fileExtension = getFileExtension(imageFile.name);
    const filePath = `${slug}/${Date.now()}.${fileExtension}`;
    const { error: uploadError } = await supabase.storage.from("product-images").upload(filePath, fileBuffer, {
      contentType: imageFile.type,
      upsert: false,
    });

    if (uploadError) {
      return {
        message: "The product image could not be uploaded. Please confirm the bucket and storage policies are set up.",
        fieldErrors: {
          image: "Image upload failed.",
        },
      };
    }

    const { data } = supabase.storage.from("product-images").getPublicUrl(filePath);
    imageUrl = data.publicUrl;
  }

  const payload = {
    name,
    slug,
    description,
    caliber,
    brand: brand || null,
    grain,
    round_count: roundCount ?? 0,
    price,
    category,
    stock_quantity: stockQuantity ?? 0,
    in_stock: inStock,
    image_url: imageUrl,
  };

  const mutation = productId
    ? supabase.from("products").update(payload).eq("id", productId)
    : supabase.from("products").insert(payload);

  const { error } = await mutation;

  if (error) {
    const duplicateSlug = error.code === "23505";

    return {
      message: duplicateSlug
        ? "That slug is already in use. Choose a different slug and try again."
        : "The product could not be saved. Please try again.",
      fieldErrors: duplicateSlug ? { slug: "Slug must be unique." } : {},
    };
  }

  revalidatePath("/");
  revalidatePath("/shop");
  revalidatePath("/admin");
  revalidatePath("/admin/products");

  if (previousSlug) {
    revalidatePath(`/shop/${previousSlug}`);
  }

  revalidatePath(`/shop/${slug}`);

  redirect(buildAdminRedirect("/admin/products", "message", productId ? "Product updated." : "Product created."));
}

export async function deleteProductAction(formData: FormData) {
  const productId = String(formData.get("productId") ?? "").trim();
  const productSlug = String(formData.get("productSlug") ?? "").trim();

  if (!productId) {
    redirect(buildAdminRedirect("/admin/products", "error", "Missing product id."));
  }

  const supabase = await createServerSupabaseClient();
  const { error } = await supabase.from("products").delete().eq("id", productId);

  if (error) {
    redirect(buildAdminRedirect("/admin/products", "error", "The product could not be deleted."));
  }

  revalidatePath("/");
  revalidatePath("/shop");
  revalidatePath("/admin");
  revalidatePath("/admin/products");

  if (productSlug) {
    revalidatePath(`/shop/${productSlug}`);
  }

  redirect(buildAdminRedirect("/admin/products", "message", "Product deleted."));
}

export async function updateOrderStatusAction(formData: FormData) {
  const orderId = String(formData.get("orderId") ?? "").trim();
  const nextStatus = String(formData.get("status") ?? "").trim().toLowerCase();

  if (!orderId || !ORDER_STATUS_OPTIONS.includes(nextStatus as (typeof ORDER_STATUS_OPTIONS)[number])) {
    redirect(buildAdminRedirect(`/admin/orders/${orderId}`, "error", "Choose a valid order status."));
  }

  const supabase = await createServerSupabaseClient();
  const { data: existingOrder, error: existingOrderError } = await supabase
    .from("orders")
    .select("payment_status")
    .eq("id", orderId)
    .maybeSingle();

  if (existingOrderError || !existingOrder) {
    redirect(buildAdminRedirect(`/admin/orders/${orderId}`, "error", "The order could not be updated."));
  }

  const nextPaymentStatus =
    nextStatus === "paid" || existingOrder.payment_status === "paid" ? "paid" : "unpaid";

  const { error } = await supabase
    .from("orders")
    .update({
      status: nextStatus,
      payment_status: nextPaymentStatus,
    })
    .eq("id", orderId);

  if (error) {
    redirect(buildAdminRedirect(`/admin/orders/${orderId}`, "error", "The order could not be updated."));
  }

  revalidatePath("/admin");
  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);

  redirect(buildAdminRedirect(`/admin/orders/${orderId}`, "message", "Order updated."));
}
