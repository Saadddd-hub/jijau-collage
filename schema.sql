-- Database Migration Script for Cloudflare D1
-- Project: Jijau Dnyanteerth Educational Campus

-- 1. Admins Table (PBKDF2 SHA-256 with 100,000 iterations and per-admin salt)
CREATE TABLE IF NOT EXISTS admins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  salt TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2. News & Updates Table
CREATE TABLE IF NOT EXISTS news_updates (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL, -- 'Jijau ITI', 'Junior College', 'School', 'Campus'
  content TEXT NOT NULL,
  image_url TEXT,
  published_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  is_active INTEGER DEFAULT 1
);

-- 3. Contact Inquiries Table
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  full_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  wing TEXT NOT NULL, -- 'Jijau ITI', 'Jijau Junior College', 'Primary & Secondary School', 'Ramraoji Lohat School'
  message TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for Query Performance
CREATE INDEX IF NOT EXISTS idx_news_active_date ON news_updates(is_active, published_date DESC);
CREATE INDEX IF NOT EXISTS idx_inquiries_created ON contact_inquiries(created_at DESC);

-- Seed Initial Default Admin (username: admin, salt: jijau_admin_salt_2026)
INSERT OR IGNORE INTO admins (id, username, password_hash, salt) 
VALUES (1, 'admin', 'salt:jijau_admin_salt_2026:8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 'jijau_admin_salt_2026');

-- Seed Sample Active News Articles
INSERT OR IGNORE INTO news_updates (id, title, slug, category, content, image_url, published_date, is_active) VALUES 
(1, 'Admissions Open for Academic Year 2026-27', 'admissions-open-2026-27-a1b2c3', 'Campus', 'Jijau Dnyanteerth Educational Campus announces admissions open for ITI Trades, Junior College (Arts, Commerce, Science), and Primary & Secondary School wings.', '/api/images/sample-hero.jpg', CURRENT_TIMESTAMP, 1),
(2, 'State Level Technical Skill Competition Winners', 'technical-skill-competition-winners-d4e5f6', 'Jijau ITI', 'Students of Jijau ITI secured top honors in the State Level Electrician and Fitter trade competitions hosted in Aurangabad.', '/api/images/sample-iti.jpg', CURRENT_TIMESTAMP, 1),
(3, '100% Result in HSC Board Examination', '100-percent-result-hsc-board-789abc', 'Junior College', 'Jijau Junior College achieves a stellar 100% pass rate in the Science and Commerce board examinations with 45+ distinction holders.', '/api/images/sample-jrcollege.jpg', CURRENT_TIMESTAMP, 1);
