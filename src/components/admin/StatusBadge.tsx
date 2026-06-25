"use client";

type StatusBadgeProps = {
  status: "published" | "draft";
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const styles =
    status === "published"
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700";

  return (
    <span
      className={`inline-block text-xs font-medium px-2 py-0.5 rounded-full capitalize ${styles}`}
    >
      {status}
    </span>
  );
}
