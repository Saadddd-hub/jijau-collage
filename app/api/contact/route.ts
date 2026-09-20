import { NextResponse } from "next/server";
import { getD1Database } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body: any = await request.json();
    const { full_name, phone, email, wing, message } = body || {};

    if (!full_name || !phone || !wing || !message) {
      return NextResponse.json(
        { success: false, error: "Missing required fields: full_name, phone, wing, and message are required." },
        { status: 400 }
      );
    }

    const db = getD1Database();
    if (!db) {
      return NextResponse.json(
        { success: false, error: "Database binding unavailable" },
        { status: 500 }
      );
    }

    const result = await db.prepare(
      "INSERT INTO contact_inquiries (full_name, phone, email, wing, message, status) VALUES (?, ?, ?, ?, ?, 'pending')"
    ).bind(full_name.trim(), phone.trim(), (email || "").trim(), wing.trim(), message.trim()).run();

    return NextResponse.json(
      {
        success: true,
        message: "Your inquiry has been submitted successfully! Our admissions team will contact you soon.",
        inquiry_id: result.meta?.last_row_id
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Failed to record inquiry", details: error.message },
      { status: 500 }
    );
  }
}
