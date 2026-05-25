import { supabase } from "@/lib/supabase";

/**
 * Converts a File to a JPEG Blob (90% quality) using Canvas API.
 * Fills transparency with white to avoid black background artifacts.
 */
export function convertImageToJpeg(file: File | Blob): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      const ctx = canvas.getContext("2d");
      if (!ctx) {
        URL.revokeObjectURL(objectUrl);
        reject(new Error("Could not get canvas context"));
        return;
      }

      // Fill background with white (so transparent PNGs/WebPs don't turn black in JPEG)
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw the image
      ctx.drawImage(img, 0, 0);

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
