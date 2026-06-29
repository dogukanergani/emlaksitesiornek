import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "./auth";

/**
 * Route handler'larda (API) admin oturumunu doğrular.
 * Middleware sayfaları korur; API route'ları için ek savunma katmanıdır.
 */
export async function isAdminRequest(): Promise<boolean> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return verifySessionToken(token);
}
