// Cloudflare R2 Bucket Helper & Key Sanitization

export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
export const KEY_REGEX = /^[a-zA-Z0-9_\-\.]+$/; // Sanitize key parameter

/**
 * Validates object key to prevent directory traversal attacks (e.g., ../)
 */
export function sanitizeR2Key(key: string): string | null {
  if (!key || typeof key !== "string") return null;
  const trimmed = key.trim();
  if (trimmed.includes("..") || trimmed.includes("/") || trimmed.includes("\\")) {
    return null; // Reject directory traversal
  }
  const regex = /^[a-zA-Z0-9_\-\.]+$/;
  return regex.test(trimmed) ? trimmed : null;
}

/**
 * Validates uploaded file MIME type
 */
export function isAllowedMimeType(mimeType: string): boolean {
  return ALLOWED_IMAGE_TYPES.includes(mimeType?.toLowerCase());
}

/**
 * Resolves Cloudflare R2 Bucket binding
 */
export function getR2Bucket(): R2Bucket | null {
  try {
    const { getCloudflareContext } = require('@cloudflare/next-on-pages');
    const ctx = getCloudflareContext();
    if (ctx?.env?.R2_BUCKET) {
      return ctx.env.R2_BUCKET as R2Bucket;
    }
  } catch (e) {
    // Ignore error when not running in Cloudflare context
  }

  if ((process.env as any).R2_BUCKET) {
    return (process.env as any).R2_BUCKET as R2Bucket;
  }

  return null;
}
