import { NextRequest, NextResponse } from "next/server";
import { TokenCookie } from "@/app/utility/TokenCookie";
import { cookies } from "next/headers";
import { prisma } from "@/app/utility/prismadb";

export async function POST(req: NextRequest, res: NextResponse) {
  const JsonBody = await req.json();
  let email = JsonBody["email"];
  let password = JsonBody["password"];

  const user = await prisma.userOfTokenApp.findUnique({
    where: { email: email || undefined },
  });
  if (!user) {
    const res = await prisma.userOfTokenApp.create({
      data: {
        email: email,
        password: password,
        emailVerified: false,
      },
    });
    let Cookie = await TokenCookie(email);
    return NextResponse.json({ status: true, message: "Request completed" }, { status: 200, headers: Cookie });
  } else {
    let Cookie = await TokenCookie(email);
    return NextResponse.json({ status: true, message: "User Already Registered" }, { status: 200, headers: Cookie });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  cookies().delete("token");
  return NextResponse.json({ status: true, message: "Request Completed" });
}
