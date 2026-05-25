"use client";

import { useState, KeyboardEvent } from "react";

type TagInputProps = {
  value: string[];
  onChange: (tags: string[]) => void;
};

export default function TagInput({ value, onChange }: TagInputProps) {
  const [input, setInput] = useState("");

  function addTag(tag: string) {
    const trimmed = tag.trim();
    if (trimmed && !value.includes(trimmed)) {
      onChange([...value, trimmed]);
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
    // Allow backspace to remove last tag when input is empty
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
              {tag}
              <button
                type="button"
                onClick={() => removeTag(i)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer leading-none"
                aria-label={`Remove ${tag}`}
              >
                ×
              </button>
            </span>
          ))}
        </div>
      )}
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => {
          if (input.trim()) addTag(input);
        }}
        placeholder="Type and press Enter to add…"
        className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-gray-500 focus:ring-1 focus:ring-gray-500 focus:outline-none"
      />
    </div>
  );
}
