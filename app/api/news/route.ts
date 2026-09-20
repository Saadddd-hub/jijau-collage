import { NextResponse } from "next/server";
import { getD1Database } from "@/lib/db";
import { NewsArticle } from "@/lib/types";

export async function GET() {
  try {
    const db = getD1Database();
    if (!db) {
      // Fallback sample data if DB is unavailable in local dev preview
      return NextResponse.json({
        success: true,
        news: [
          {
            id: 1,
            title: "Admissions Open for Academic Year 2026-27",
            slug: "admissions-open-2026-27-a1b2c3",
            category: "Campus",
            content: "Jijau Dnyanteerth Educational Campus announces admissions open for ITI Trades, Junior College (Arts, Commerce, Science), and Primary & Secondary School wings.",
            image_url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&auto=format&fit=crop",
            published_date: new Date().toISOString(),
            is_active: 1
          },
          {
            id: 2,
            title: "State Level Technical Skill Competition Winners",
            slug: "technical-skill-competition-winners-d4e5f6",
            category: "Jijau ITI",
            content: "Students of Jijau ITI secured top honors in the State Level Electrician and Fitter trade competitions hosted in Aurangabad.",
            image_url: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&auto=format&fit=crop",
            published_date: new Date().toISOString(),
            is_active: 1
          }
        ]
      });
    }

    const { results } = await db.prepare(
      "SELECT id, title, slug, category, content, image_url, published_date, is_active FROM news_updates WHERE is_active = 1 ORDER BY published_date DESC"
    ).all<NewsArticle>();

    return NextResponse.json({ success: true, news: results || [] });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch news", details: error.message },
      { status: 500 }
    );
  }
}
