"use client";

import { useState } from "react";

type ConfirmDeleteProps = {
  onConfirm: () => void;
};

export default function ConfirmDelete({ onConfirm }: ConfirmDeleteProps) {
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <span className="inline-flex items-center gap-1.5 text-sm">
        <span className="text-gray-500">Sure?</span>
        <button
          type="button"
          onClick={() => {
            onConfirm();
            setConfirming(false);
          }}
          className="text-red-600 hover:text-red-800 font-medium cursor-pointer"
        >
          Yes
        </button>
        <button
          type="button"
          onClick={() => setConfirming(false)}
          className="text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          No
        </button>
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      className="text-sm text-red-600 hover:text-red-800 cursor-pointer"
    >
      Delete
    </button>
  );
}
