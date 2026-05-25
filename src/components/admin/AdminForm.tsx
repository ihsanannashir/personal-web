"use client";

type AdminFormProps = {
  title: string;
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
  submitLabel?: string;
  saving?: boolean;
};

export default function AdminForm({
  title,
  onSubmit,
  children,
  submitLabel = "Save",
  saving = false,
}: AdminFormProps) {
  return (
    <div className="w-full">
      <h1 className="text-xl font-bold text-gray-900 mb-6">{title}</h1>
      <form onSubmit={onSubmit}>
        <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-5">
          {children}
        </div>
        <div className="mt-6">
          <button
            type="submit"
            disabled={saving}
            className="bg-gray-900 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            {saving ? "Saving…" : submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}
