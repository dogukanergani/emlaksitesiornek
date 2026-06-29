/**
 * Basit, şifre korumalı admin oturumu.
 * Şifre process.env.ADMIN_PASSWORD ile doğrulanır; başarılı girişte
 * httpOnly bir cookie'ye HMAC tabanlı bir token yazılır.
 *
 * Web Crypto (crypto.subtle) kullanıldığı için hem Node hem de Edge
 * (middleware) runtime'ında çalışır.
 */

export const SESSION_COOKIE = "admin_session";

const encoder = new TextEncoder();

function sessionSecret(): string {
  // Ayrı bir secret tercih edilir; yoksa şifreden türetilir.
  return (
    process.env.ADMIN_SESSION_SECRET ||
    process.env.ADMIN_PASSWORD ||
    "insecure-dev-secret"
  );
}

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const b of bytes) binary += String.fromCharCode(b);
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function hmac(message: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(sessionSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  return toBase64Url(new Uint8Array(sig));
}

/** Girişte cookie'ye yazılacak oturum token'ını üretir. */
export async function createSessionToken(): Promise<string> {
  return hmac("admin-authenticated");
}

/** Cookie'deki token'ı doğrular (sabit zamanlı karşılaştırma değil; basit). */
export async function verifySessionToken(
  token: string | undefined
): Promise<boolean> {
  if (!token) return false;
  const expected = await createSessionToken();
  return token === expected;
}

/** Girilen şifrenin doğru olup olmadığını kontrol eder. */
export function isPasswordValid(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  return Boolean(expected) && password === expected;
}
