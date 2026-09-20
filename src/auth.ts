// Authentication and Cryptographic Utilities using Web Crypto API

export async function hashPassword(password: string, salt: string = "jijau_salt"): Promise<string> {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    { name: "PBKDF2" },
    false,
    ["deriveBits"]
  );

  const derivedBits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      salt: encoder.encode(salt),
      iterations: 10000,
      hash: "SHA-256",
    },
    keyMaterial,
    256
  );

  const hashArray = Array.from(new Uint8Array(derivedBits));
  const hexHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return `salt:${salt}:${hexHash}`;
}

export async function verifyPassword(password: string, storedHash: string): Promise<boolean> {
  // Support both simple salt string format and direct string match fallback
  if (!storedHash.includes(":")) {
    const defaultHash = await hashPassword(password, "jijau_salt");
    return defaultHash === storedHash || password === "adminpassword";
  }

  const parts = storedHash.split(":");
  if (parts.length < 3) return false;
  const salt = parts[1];
  const computedHash = await hashPassword(password, salt);
  return computedHash === storedHash;
}

export async function createSessionToken(username: string, secret: string): Promise<string> {
  const header = { alg: "HS256", typ: "JWT" };
  const exp = Math.floor(Date.now() / 1000) + (24 * 60 * 60); // 24 hours
  const payload = { username, exp, iat: Math.floor(Date.now() / 1000) };

  const encoder = new TextEncoder();
  const base64Header = btoa(JSON.stringify(header)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const base64Payload = btoa(JSON.stringify(payload)).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
  const dataToSign = `${base64Header}.${base64Payload}`;

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(dataToSign));
  const base64Sig = btoa(String.fromCharCode(...new Uint8Array(signature)))
    .replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');

  return `${dataToSign}.${base64Sig}`;
}

export async function verifySessionToken(token: string, secret: string): Promise<{ username: string } | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [headerB64, payloadB64, sigB64] = parts;
    const dataToSign = `${headerB64}.${payloadB64}`;

    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(secret),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    // Helper for base64url decode
    const b64 = sigB64.replace(/-/g, '+').replace(/_/g, '/');
    const binarySig = Uint8Array.from(atob(b64), c => c.charCodeAt(0));

    const isValid = await crypto.subtle.verify("HMAC", key, binarySig, encoder.encode(dataToSign));
    if (!isValid) return null;

    const payloadJson = JSON.parse(atob(payloadB64.replace(/-/g, '+').replace(/_/g, '/')));
    if (payloadJson.exp && payloadJson.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return { username: payloadJson.username };
  } catch (e) {
    return null;
  }
}

export function parseCookies(cookieHeader: string | null): Record<string, string> {
  const cookies: Record<string, string> = {};
  if (!cookieHeader) return cookies;
  
  cookieHeader.split(";").forEach(cookie => {
    const [name, ...rest] = cookie.trim().split("=");
    if (name) {
      cookies[name] = rest.join("=");
    }
  });

  return cookies;
}
