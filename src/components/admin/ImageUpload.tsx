"use client";

import { useState, useRef } from "react";
import { uploadImage, isAllowedImageType } from "@/lib/utils/storage";

type ImageUploadProps = {
  currentUrl?: string | null;
  onUpload: (url: string) => void;
  bucket: string;
  path: string;
};

export default function ImageUpload({
  currentUrl,
  onUpload,
  bucket,
  path,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentUrl ?? null);
  const [uploading, setUploading] = useState(false);
  const [fileError, setFileError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File | undefined) {
    if (!file) return;

    // Validate file type
    if (!isAllowedImageType(file)) {
      setFileError("Please upload a JPG, JPEG, or PNG file only.");
      if (inputRef.current) inputRef.current.value = "";
      return;
    }
    setFileError("");

    // Show local preview immediately
    setPreview(URL.createObjectURL(file));
    setUploading(true);

    try {
      const fullPath = path.endsWith(".jpg") ? path : `${path}.jpg`;
      const publicUrl = await uploadImage(bucket, fullPath, file);
      onUpload(publicUrl);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Upload failed");
      // Revert preview on error
      setPreview(currentUrl ?? null);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-2">
      <p className="text-xs text-gray-400">
        Only JPG/JPEG and PNG files are accepted.
      </p>
      {preview && (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={preview}
          alt="Preview"
          className="max-w-xs max-h-48 rounded-md object-cover border border-gray-200"
        />
      )}
      <div className="flex items-center gap-3">
        <input
          ref={inputRef}
          type="file"
          accept=".jpg,.jpeg,.png,image/jpeg,image/png"
          disabled={uploading}
          onChange={(e) => handleFile(e.target.files?.[0])}
          className="block w-full text-sm text-gray-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border file:border-gray-300 file:text-sm file:font-medium file:bg-white file:text-gray-700 hover:file:bg-gray-50 file:cursor-pointer disabled:opacity-50"
        />
        {uploading && (
          <span className="text-xs text-gray-400 animate-pulse whitespace-nowrap">
            Uploading…
          </span>
        )}
      </div>
      {fileError && (
        <p className="text-xs text-red-500">{fileError}</p>
      )}
    </div>
  );
}
