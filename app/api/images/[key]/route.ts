import { NextResponse } from "next/server";
import { getR2Bucket, sanitizeR2Key } from "@/lib/r2";

export async function GET(
  request: Request,
  { params }: { params: { key: string } }
) {
  try {
    const rawKey = params.key;
    const key = sanitizeR2Key(rawKey);

    if (!key) {
      return NextResponse.json(
        { error: "Invalid key parameter. Directory traversal characters are strictly forbidden." },
        { status: 400 }
      );
    }

    const bucket = getR2Bucket();
    if (!bucket) {
      return NextResponse.json({ error: "R2 Storage binding unavailable" }, { status: 500 });
    }

    const object = await bucket.get(key);
    if (!object) {
      return new Response("Image not found in R2 storage", { status: 404 });
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set("etag", object.httpEtag);
    
    // Security & Cache Headers
    headers.set("X-Content-Type-Options", "nosniff");
    headers.set("Content-Security-Policy", "default-src 'none'");
    headers.set("Cache-Control", "public, max-age=31536000, immutable");

    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "image/jpeg");
    }

    return new Response(object.body as any, { headers });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error streaming image from R2", details: error.message },
      { status: 500 }
    );
  }
}
