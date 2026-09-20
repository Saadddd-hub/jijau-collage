// Type Definitions for Cloudflare Worker & D1 Database

export interface Env {
  DB: D1Database;
  R2_BUCKET: R2Bucket;
  JWT_SECRET?: string;
}

export interface AdminUser {
  id: number;
  username: string;
  password_hash: string;
  created_at: string;
}

export interface NewsArticle {
  id: number;
  title: string;
  slug: string;
  category: 'ITI' | 'Junior College' | 'School' | 'Campus' | string;
  content: string;
  image_url?: string;
  published_date: string;
  is_active: number;
}

export interface ContactInquiry {
  id: number;
  full_name: string;
  phone: string;
  email?: string;
  wing: string;
  message: string;
  status: 'pending' | 'reviewed' | 'resolved' | string;
  created_at: string;
}

export interface JWTPayload {
  username: string;
  iat: number;
  exp: number;
}
