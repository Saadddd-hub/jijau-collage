import { NextResponse } from "next/server";
import { getD1Database } from "@/lib/db";
import { getR2Bucket, isAllowedMimeType } from "@/lib/r2";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let title = "";
    let category = "Campus";
    let content = "";
    let imageUrl = "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      title = (formData.get("title") as string) || "";
      category = (formData.get("category") as string) || "Campus";
      content = (formData.get("content") as string) || "";
      const imageFile = formData.get("image") as File;

      if (imageFile && imageFile.name) {
        if (!isAllowedMimeType(imageFile.type)) {
          return NextResponse.json(
            { success: false, error: "Invalid image format. Allowed formats: JPEG, PNG, WEBP." },
            { status: 400 }
          );
        }

        const fileExt = imageFile.name.split('.').pop() || 'jpg';
        const fileKey = `news-${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
        const arrayBuffer = await imageFile.arrayBuffer();

        const bucket = getR2Bucket();
        if (bucket) {
          await bucket.put(fileKey, arrayBuffer, {
            httpMetadata: {
              contentType: imageFile.type || "image/jpeg"
            }
          });
          imageUrl = `/api/images/${fileKey}`;
        } else {
          imageUrl = `https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop`;
        }
      }
    } else {
      const body: any = await request.json();
      title = body.title || "";
      category = body.category || "Campus";
      content = body.content || "";
      imageUrl = body.image_url || "/api/images/default-news.jpg";
    }

    if (!title || !content) {
      return NextResponse.json(
        { success: false, error: "Title and content are required fields." },
        { status: 400 }
      );
    }

    // Slug Collision Prevention: Title + 6-character random hex/alphanumeric suffix
    const randomSuffix = Math.random().toString(36).substring(2, 8);
    const baseSlug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
    const slug = `${baseSlug}-${randomSuffix}`;

    const db = getD1Database();
    let newsId = Date.now();

    if (db) {
      const result = await db.prepare(
        "INSERT INTO news_updates (title, slug, category, content, image_url, is_active) VALUES (?, ?, ?, ?, ?, 1)"
      ).bind(title, slug, category, content, imageUrl).run();
      newsId = Number(result.meta?.last_row_id) || newsId;
    }

    return NextResponse.json(
      {
        success: true,
        message: "News article published successfully",
        news_id: newsId,
        slug,
        image_url: imageUrl
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Failed to publish news article", details: error.message },
      { status: 500 }
    );
  }
}
