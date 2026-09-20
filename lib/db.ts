// Cloudflare D1 Database Helper

export function getD1Database(): D1Database | null {
  try {
    // Try retrieving Cloudflare context from @cloudflare/next-on-pages
    const { getCloudflareContext } = require('@cloudflare/next-on-pages');
    const ctx = getCloudflareContext();
    if (ctx?.env?.DB) {
      return ctx.env.DB as D1Database;
    }
  } catch (e) {
    // Ignore error when not running in Cloudflare Workers context
  }

  // Fallback to process.env binding if available
  if ((process.env as any).DB) {
    return (process.env as any).DB as D1Database;
  }

  return null;
}
