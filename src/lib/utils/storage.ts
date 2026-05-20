import { supabase } from "@/lib/supabase";

/**
 * Upload a file to Supabase Storage.
 * Uses upsert so re-uploads overwrite existing files at the same path.
 *
 * @returns The public URL of the uploaded file.
 */
export async function uploadImage(
  bucket: string,
  path: string,
  file: File
): Promise<string> {
  const { error } = await supabase.storage
    .from(bucket)
    .upload(path, file, { upsert: true });

  if (error) {
    throw new Error(`Upload failed: ${error.message}`);
  }

  return getPublicUrl(bucket, path);
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
