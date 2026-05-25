import { supabase } from "@/lib/supabase";

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png"];

/**
 * Check whether a file is an allowed image type (JPG/JPEG or PNG).
 */
export function isAllowedImageType(file: File): boolean {
  return ALLOWED_IMAGE_TYPES.includes(file.type);
}

/**
 * Converts a File to a JPEG Blob (90% quality) using Canvas API.
 * Caps maximum dimension at 1600px to optimize file sizes while maintaining extreme clarity.
 * Fills transparency with white to avoid black background artifacts.
 */
export function convertImageToJpeg(file: File | Blob): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      const MAX_DIMENSION = 1600;
      let width = img.naturalWidth;
      let height = img.naturalHeight;

      if (width > MAX_DIMENSION || height > MAX_DIMENSION) {
        if (width > height) {
          height = Math.round((height * MAX_DIMENSION) / width);
          width = MAX_DIMENSION;
        } else {
          width = Math.round((width * MAX_DIMENSION) / height);
          height = MAX_DIMENSION;
        }
      }

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("Could not get canvas context"));
        return;
      }

      // Fill background with white (so transparent PNGs/WebPs don't turn black in JPEG)
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);

      // Draw the image scaled to the new dimensions
      ctx.drawImage(img, 0, 0, width, height);

      // Export as image/jpeg
      canvas.toBlob(
        (blob) => {
          URL.revokeObjectURL(objectUrl);
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Canvas to blob conversion failed"));
          }
        },
        "image/jpeg",
        0.9
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Failed to load image for conversion"));
    };

    img.src = objectUrl;
  });
}

/**
 * Upload a file to Supabase Storage, converting to JPEG first.
 * Uses upsert so re-uploads overwrite existing files at the same path.
 *
 * @returns The public URL of the uploaded file.
 */
export async function uploadImage(
  bucket: string,
  path: string,
  file: File | Blob
): Promise<string> {
  // Always save the file with a .jpg extension
  const jpgPath = path.replace(/\.[^/.]+$/, "") + ".jpg";

  let uploadData: Blob | File = file;
  try {
    uploadData = await convertImageToJpeg(file);
  } catch (err) {
    console.warn("JPEG conversion failed, falling back to original file upload:", err);
  }

  const { error } = await supabase.storage
    .from(bucket)
    .upload(jpgPath, uploadData, { upsert: true });

  if (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }

  return getPublicUrl(bucket, jpgPath);
}

/**
 * Delete a file from Supabase Storage.
 */
export async function deleteImage(
  bucket: string,
  path: string
): Promise<void> {
  const { error } = await supabase.storage.from(bucket).remove([path]);

  if (error) {
    throw new Error(`Delete failed: ${error.message}`);
  }
}

/**
 * Get the public URL for a file in Supabase Storage.
 */
export function getPublicUrl(bucket: string, path: string): string {
  const {
    data: { publicUrl },
  } = supabase.storage.from(bucket).getPublicUrl(path);

  return publicUrl;
}
