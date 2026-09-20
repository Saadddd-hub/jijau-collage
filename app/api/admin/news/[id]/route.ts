import { NextResponse } from "next/server";
import { getD1Database } from "@/lib/db";

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    if (!id) {
      return NextResponse.json({ success: false, error: "Article ID is required" }, { status: 400 });
    }

    const db = getD1Database();
    if (db) {
      await db.prepare("DELETE FROM news_updates WHERE id = ?").bind(id).run();
    }

    return NextResponse.json({ success: true, message: `Article #${id} deleted successfully` });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: "Failed to delete article", details: error.message },
      { status: 500 }
    );
  }
}
