import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const url = req.nextUrl.clone();

  if (!token && req.nextUrl.pathname.startsWith("/about")) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  try {
    if (token) jwt.verify(token, process.env.JWT_SECRET!);
    return NextResponse.next();
  } catch {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
}

export const config = { matcher: ["/about/:path*"] };