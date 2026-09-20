// Data Types and Interface Definitions

export interface AdminUser {
  id: number;
  username: string;
  password_hash: string;
  salt: string;
  created_at: string;
}

export interface NewsArticle {
  id: number;
  title: string;
  slug: string;
  category: 'Jijau ITI' | 'Junior College' | 'School' | 'Campus' | string;
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

export interface SessionPayload {
  username: string;
  iat: number;
  exp: number;
}
