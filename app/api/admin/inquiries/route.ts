import { NextResponse } from "next/server";
import { getD1Database } from "@/lib/db";
import { ContactInquiry } from "@/lib/types";

export async function GET() {
  try {
    const db = getD1Database();
    if (!db) {
      // Dev mode fallback data
      return NextResponse.json({
        success: true,
        inquiries: [
          {
            id: 1,
            full_name: "Rajesh Sharma",
            phone: "+919876543210",
            email: "rajesh.sharma@example.com",
            wing: "Jijau ITI",
            message: "Interested in Electrician Trade admission details for 2026.",
            status: "pending",
            created_at: new Date().toISOString()
          }
        ]
      });
    }

    const { results } = await db.prepare(
      "SELECT * FROM contact_inquiries ORDER BY created_at DESC"
    ).all<ContactInquiry>();

    return NextResponse.json({ success: true, inquiries: results || [] });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch inquiries", details: error.message },
      { status: 500 }
    );
  }
}
