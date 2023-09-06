import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith("/registration")) {
    const token = req.cookies.get("token")?.value;
    if (token) {
      const url = new URL(`/dashboard`, req.url);
      return NextResponse.redirect(url);
    }
  } else {
    const token = req.cookies.get("token")?.value;
    if (!token) {
      const url = new URL(`/registration`, req.url);
      return NextResponse.redirect(url);
    }
  }
}

export const config = {
  matcher: ["/registration", "/dashboard"],
};
