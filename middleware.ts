import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

/**
 * /admin altındaki tüm sayfaları korur (giriş sayfası hariç).
 * Oturum yoksa /admin/login'e yönlendirir.
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Giriş sayfası ve giriş API'si serbest
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const authenticated = await verifySessionToken(token);

  if (!authenticated) {
    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("from", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // /admin ve alt yolları (giriş sayfası middleware içinde ayrıca elenir)
  matcher: ["/admin/:path*"],
};
