"use client";

import { ReactNode } from "react";
import Link from "next/link";
import ConfirmDelete from "./ConfirmDelete";

type Column<T = Record<string, unknown>> = {
  key: string;
  label: string;
  render?: (value: T[keyof T], row: T) => ReactNode;
};

type AdminTableProps<T = Record<string, unknown>> = {
  columns: Column<T>[];
  rows: T[];
  getEditHref?: (row: T) => string;
  onDelete?: (row: T) => void;
  emptyMessage?: string;
};

export default function AdminTable<T extends Record<string, unknown>>({
  columns,
  rows,
  getEditHref,
  onDelete,
  emptyMessage = "No items yet",
}: AdminTableProps<T>) {
  const hasActions = getEditHref || onDelete;

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            {columns.map((col) => (
              <th
                key={col.key}
                className="text-left px-4 py-3 font-medium text-gray-500 text-xs uppercase tracking-wider"
              >
                {col.label}
              </th>
            ))}
            {hasActions && (
              <th className="text-left px-4 py-3 font-medium text-gray-500 text-xs uppercase tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {rows.map((row, rowIdx) => (
            <tr key={rowIdx} className="hover:bg-gray-50 transition-colors">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-gray-700">
                  {col.render
                    ? col.render(row[col.key] as T[keyof T], row)
                    : (row[col.key] as ReactNode)}
                </td>
              ))}
              {hasActions && (
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {getEditHref && (
                      <Link
                        href={getEditHref(row)}
                        className="text-sm text-gray-600 hover:text-gray-900"
                      >
                        Edit
                      </Link>
                    )}
                    {onDelete && (
                      <ConfirmDelete onConfirm={() => onDelete(row)} />
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
          {rows.length === 0 && (
            <tr>
              <td
                colSpan={columns.length + (hasActions ? 1 : 0)}
                className="px-4 py-8 text-center text-gray-400"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
