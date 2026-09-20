import { NextResponse } from "next/server";
import { getD1Database } from "@/lib/db";
import { ContactInquiry } from "@/lib/types";
import { generateSanitizedCsv } from "@/lib/csv";

export async function GET() {
  try {
    const db = getD1Database();
    let rows: ContactInquiry[] = [];

    if (db) {
      const { results } = await db.prepare(
        "SELECT id, full_name, phone, email, wing, message, status, created_at FROM contact_inquiries ORDER BY created_at DESC"
      ).all<ContactInquiry>();
      rows = results || [];
    } else {
      // Dev mode sample fallback
      rows = [
        {
          id: 1,
          full_name: "Rajesh Sharma",
          phone: "+919876543210",
          email: "rajesh.sharma@example.com",
          wing: "Jijau ITI",
          message: "Interested in Electrician Trade admission details.",
          status: "pending",
          created_at: new Date().toISOString()
        }
      ];
    }

    // Configure headers for CSV export
    const headers = [
      { key: "id" as keyof ContactInquiry, label: "ID" },
      { key: "full_name" as keyof ContactInquiry, label: "Full Name" },
      { key: "phone" as keyof ContactInquiry, label: "Phone" },
      { key: "email" as keyof ContactInquiry, label: "Email" },
      { key: "wing" as keyof ContactInquiry, label: "Wing" },
      { key: "message" as keyof ContactInquiry, label: "Message" },
      { key: "status" as keyof ContactInquiry, label: "Status" },
      { key: "created_at" as keyof ContactInquiry, label: "Date" }
    ];

    // Generate CSV with Formula Injection Defense
    const csvContent = generateSanitizedCsv(rows, headers);

    const fileName = `jijau_inquiries_${new Date().toISOString().split('T')[0]}.csv`;

    return new Response(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Cache-Control": "no-store, no-cache"
      }
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Failed to generate CSV export", details: error.message },
      { status: 500 }
    );
  }
}
