"use client";

import { useFormStatus } from "react-dom";

type AdminSubmitButtonProps = {
  label: string;
  pendingLabel: string;
  className?: string;
};

export function AdminSubmitButton({ label, pendingLabel, className }: AdminSubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`inline-flex items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60 ${className ?? ""}`}
    >
      {pending ? pendingLabel : label}
    </button>
  );
}
