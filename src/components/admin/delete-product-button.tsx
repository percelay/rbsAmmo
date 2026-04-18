"use client";

import { deleteProductAction } from "@/app/admin/actions";
import { AdminSubmitButton } from "@/components/admin/admin-submit-button";

type DeleteProductButtonProps = {
  productId: string;
  productSlug: string;
  productName: string;
};

export function DeleteProductButton({ productId, productSlug, productName }: DeleteProductButtonProps) {
  return (
    <form
      action={deleteProductAction}
      onSubmit={(event) => {
        const confirmed = window.confirm(`Are you sure you want to delete "${productName}"?`);

        if (!confirmed) {
          event.preventDefault();
        }
      }}
    >
      <input type="hidden" name="productId" value={productId} />
      <input type="hidden" name="productSlug" value={productSlug} />
      <AdminSubmitButton
        label="Delete"
        pendingLabel="Deleting..."
        className="rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-medium text-red-700 hover:bg-red-50"
      />
    </form>
  );
}
