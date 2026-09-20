// Main Worker Entry Point & Router using blazefw
import { createApp } from "blazefw";
import { Env, ContactInquiry, NewsArticle, AdminUser } from "./types";
import { verifyPassword, createSessionToken, verifySessionToken, parseCookies } from "./auth";
import { renderPublicPage } from "./templates/public";
import { renderAdminPage } from "./templates/admin";

// Create Public App Router
const publicApp = createApp<Env>();

// Create Admin App Router
const adminApp = createApp<Env>();

const JWT_SECRET_DEFAULT = "jijau_dnyanteerth_super_secret_jwt_key_2026";

// Helper: Check authentication status from session cookie
async function getAuthAdmin(req: any): Promise<string | null> {
  const cookieHeader = req.headers.get("cookie");
  const cookies = parseCookies(cookieHeader);
  const sessionToken = cookies.session;
  if (!sessionToken) return null;

  const secret = req.env.JWT_SECRET || JWT_SECRET_DEFAULT;
  const payload = await verifySessionToken(sessionToken, secret);
  return payload ? payload.username : null;
}

// -------------------------------------------------------------
// PUBLIC ROUTES (jijaudnyanteerth.in)
// -------------------------------------------------------------

// 1. GET / - Serves Public Campus Website Template
publicApp.get("/", (req, res) => {
  const html = renderPublicPage();
  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" }
  });
});

// 2. GET /api/news - Fetch Published News Articles
publicApp.get("/api/news", async (req, res) => {
  try {
    const { results } = await req.env.DB.prepare(
      "SELECT id, title, slug, category, content, image_url, published_date, is_active FROM news_updates WHERE is_active = 1 ORDER BY published_date DESC"
    ).all<NewsArticle>();

    return res.json({ success: true, news: results || [] });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: "Failed to fetch news", details: error.message });
  }
});

// 3. POST /api/contact - Create Admission Inquiry
publicApp.post("/api/contact", async (req, res) => {
  try {
    let body: any = {};
    if (typeof req.json === 'function') {
      body = await req.json();
    } else {
      body = req.body;
    }

    const { full_name, phone, email, wing, message } = body || {};

    if (!full_name || !phone || !wing || !message) {
      return res.status(400).json({ success: false, error: "Missing required fields: full_name, phone, wing, and message are required." });
    }

    const result = await req.env.DB.prepare(
      "INSERT INTO contact_inquiries (full_name, phone, email, wing, message, status) VALUES (?, ?, ?, ?, ?, 'pending')"
    ).bind(full_name.trim(), phone.trim(), (email || "").trim(), wing.trim(), message.trim()).run();

    return res.status(201).json({
      success: true,
      message: "Your inquiry has been submitted successfully! Our admissions team will contact you soon.",
      inquiry_id: result.meta?.last_row_id
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: "Failed to record inquiry", details: error.message });
  }
});

// 4. GET /images/:key - Stream media image directly from Cloudflare R2 Bucket
publicApp.get("/images/:key", async (req, res) => {
  try {
    const key = req.params.key;
    if (!key) {
      return res.status(400).json({ error: "Missing image key parameter" });
    }

    const object = await req.env.R2_BUCKET.get(key);
    if (!object) {
      // Fallback placeholder response or 404
      return new Response("Image not found in R2 bucket", { status: 404 });
    }

    const headers = new Headers();
    object.writeHttpMetadata(headers);
    headers.set("etag", object.httpEtag);
    headers.set("Cache-Control", "public, max-age=31536000, immutable");
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "image/jpeg");
    }

    return new Response(object.body, { headers });
  } catch (error: any) {
    return res.status(500).json({ error: "Error streaming image from R2", details: error.message });
  }
});

// Enable image streaming on admin domain as well
adminApp.get("/images/:key", async (req, res) => {
  return publicApp.fetch(req, req.env, req.ctx);
});

// -------------------------------------------------------------
// ADMIN ROUTES (admin.jijaudnyanteerth.in)
// -------------------------------------------------------------

// 1. GET / - Serves Admin Portal Interface
adminApp.get("/", async (req, res) => {
  const username = await getAuthAdmin(req);
  const html = renderAdminPage(!!username, username || "");
  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" }
  });
});

// 2. POST /api/admin/login - Authenticate Admin & Set Cookie
adminApp.post("/api/admin/login", async (req, res) => {
  try {
    let body: any = {};
    if (typeof req.json === 'function') {
      body = await req.json();
    } else {
      body = req.body;
    }

    const { username, password } = body || {};
    if (!username || !password) {
      return res.status(400).json({ success: false, error: "Username and password are required" });
    }

    // Lookup admin user in D1
    const adminUser = await req.env.DB.prepare(
      "SELECT * FROM admins WHERE username = ?"
    ).bind(username).first<AdminUser>();

    let isValid = false;
    if (adminUser) {
      isValid = await verifyPassword(password, adminUser.password_hash);
    } else if (username === "admin" && password === "adminpassword") {
      // Fallback default admin credentials for initial setup
      isValid = true;
    }

    if (!isValid) {
      return res.status(401).json({ success: false, error: "Invalid username or password" });
    }

    // Create session JWT token
    const secret = req.env.JWT_SECRET || JWT_SECRET_DEFAULT;
    const token = await createSessionToken(username, secret);

    // Set secure HTTP-Only session cookie
    const headers = new Headers({ "Content-Type": "application/json" });
    headers.append("Set-Cookie", `session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=86400`);

    return new Response(JSON.stringify({ success: true, message: "Authentication successful" }), {
      status: 200,
      headers
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: "Login failed", details: error.message });
  }
});

// 3. POST /api/admin/logout - Clear Session Cookie
adminApp.post("/api/admin/logout", (req, res) => {
  const headers = new Headers({ "Content-Type": "application/json" });
  headers.append("Set-Cookie", `session=; Path=/; HttpOnly; Max-Age=0`);
  return new Response(JSON.stringify({ success: true, message: "Logged out successfully" }), {
    status: 200,
    headers
  });
});

// 4. GET /api/admin/inquiries - Protected list of all contact inquiries
adminApp.get("/api/admin/inquiries", async (req, res) => {
  const username = await getAuthAdmin(req);
  if (!username) {
    return res.status(401).json({ success: false, error: "Unauthorized access" });
  }

  try {
    const { results } = await req.env.DB.prepare(
      "SELECT * FROM contact_inquiries ORDER BY created_at DESC"
    ).all<ContactInquiry>();

    return res.json({ success: true, inquiries: results || [] });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: "Failed to fetch inquiries", details: error.message });
  }
});

// 5. GET /api/admin/inquiries/export-csv - Stream CSV file of inquiries
adminApp.get("/api/admin/inquiries/export-csv", async (req, res) => {
  const username = await getAuthAdmin(req);
  if (!username) {
    return res.status(401).json({ success: false, error: "Unauthorized access" });
  }

  try {
    const { results } = await req.env.DB.prepare(
      "SELECT id, full_name, phone, email, wing, message, created_at, status FROM contact_inquiries ORDER BY created_at DESC"
    ).all<ContactInquiry>();

    const rows = results || [];

    // Helper for escaping CSV cell values
    const escapeCsv = (val: any) => {
      if (val === null || val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    };

    // CSV Headers
    let csvContent = "ID,Full Name,Phone,Email,Wing,Message,Date,Status\n";

    // Append CSV Data Rows
    for (const r of rows) {
      csvContent += `${r.id},${escapeCsv(r.full_name)},${escapeCsv(r.phone)},${escapeCsv(r.email)},${escapeCsv(r.wing)},${escapeCsv(r.message)},${escapeCsv(r.created_at)},${escapeCsv(r.status)}\n`;
    }

    return new Response(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="jijau_inquiries_${new Date().toISOString().split('T')[0]}.csv"`
      }
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: "Failed to generate CSV export", details: error.message });
  }
});

// 6. POST /api/admin/news - Create News & Upload Image to R2
adminApp.post("/api/admin/news", async (req, res) => {
  const username = await getAuthAdmin(req);
  if (!username) {
    return res.status(401).json({ success: false, error: "Unauthorized access" });
  }

  try {
    const contentType = req.headers.get("content-type") || "";
    let title = "";
    let category = "Campus";
    let content = "";
    let imageUrl = "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      title = (formData.get("title") as string) || "";
      category = (formData.get("category") as string) || "Campus";
      content = (formData.get("content") as string) || "";
      const imageFile = formData.get("image") as File;

      if (imageFile && imageFile.name) {
        const fileExt = imageFile.name.split('.').pop() || 'jpg';
        const fileKey = `news-${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
        const arrayBuffer = await imageFile.arrayBuffer();

        // Upload directly to Cloudflare R2 Bucket
        await req.env.R2_BUCKET.put(fileKey, arrayBuffer, {
          httpMetadata: {
            contentType: imageFile.type || "image/jpeg"
          }
        });

        imageUrl = `/images/${fileKey}`;
      }
    } else {
      let body: any = {};
      if (typeof req.json === 'function') {
        body = await req.json();
      } else {
        body = req.body;
      }
      title = body.title || "";
      category = body.category || "Campus";
      content = body.content || "";
      imageUrl = body.image_url || "/images/default-news.jpg";
    }

    if (!title || !content) {
      return res.status(400).json({ success: false, error: "Title and content are required fields." });
    }

    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "") + "-" + Date.now().toString(36);

    const result = await req.env.DB.prepare(
      "INSERT INTO news_updates (title, slug, category, content, image_url, is_active) VALUES (?, ?, ?, ?, ?, 1)"
    ).bind(title, slug, category, content, imageUrl).run();

    return res.status(201).json({
      success: true,
      message: "News article published successfully",
      news_id: result.meta?.last_row_id,
      image_url: imageUrl
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: "Failed to publish news article", details: error.message });
  }
});

// 7. DELETE /api/admin/news/:id - Delete News Article
adminApp.delete("/api/admin/news/:id", async (req, res) => {
  const username = await getAuthAdmin(req);
  if (!username) {
    return res.status(401).json({ success: false, error: "Unauthorized access" });
  }

  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ success: false, error: "Article ID is required" });
    }

    await req.env.DB.prepare("DELETE FROM news_updates WHERE id = ?").bind(id).run();

    return res.json({ success: true, message: `News article #${id} deleted successfully` });
  } catch (error: any) {
    return res.status(500).json({ success: false, error: "Failed to delete article", details: error.message });
  }
});

// -------------------------------------------------------------
// DUAL-DOMAIN WORKER FETCH DISPATCHER
// -------------------------------------------------------------

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const host = request.headers.get("host") || "";
    
    // Inspect Host header for admin subdomain or admin.localhost
    if (host.startsWith("admin.") || host.includes("admin.localhost")) {
      return adminApp.fetch(request, env, ctx);
    }
    
    // Default to public campus web app & APIs
    return publicApp.fetch(request, env, ctx);
  }
};
