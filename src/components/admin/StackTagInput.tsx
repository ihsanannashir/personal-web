"use client";

import { useState, KeyboardEvent } from "react";
import type { StackItem } from "@/lib/types/database";

type StackTagInputProps = {
  value: StackItem[];
  onChange: (tags: StackItem[]) => void;
};

const DOMAINS: StackItem["domain"][] = ["frontend", "backend", "other"];

export default function StackTagInput({ value, onChange }: StackTagInputProps) {
  const [input, setInput] = useState("");
  const [domain, setDomain] = useState<StackItem["domain"]>("frontend");

  function addTag(label: string) {
    const trimmed = label.trim();
    if (trimmed && !value.some((t) => t.label === trimmed)) {
      onChange([...value, { label: trimmed, domain }]);
    }
    setInput("");
  }

  function removeTag(index: number) {
    onChange(value.filter((_, i) => i !== index));
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(input);
    }
    if (e.key === "Backspace" && input === "" && value.length > 0) {
      removeTag(value.length - 1);
    }
  }

  return (
    <div>
      {value.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-2">
          {value.map((tag, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
            >
              {tag.label}
              <span className="text-gray-400">·</span>
              <span className="text-gray-400">{tag.domain}</span>
              <button
                type="button"
                onClick={() => removeTag(i)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer leading-none"
                aria-label={`Remove ${tag.label}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => {
            if (input.trim()) addTag(input);
          }}
          placeholder="Type and press Enter to add…"
          className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
        />
        <select
          value={domain}
          onChange={(e) => setDomain(e.target.value as StackItem["domain"])}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none bg-white"
        >
          {DOMAINS.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
