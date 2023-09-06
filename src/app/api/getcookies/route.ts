import { VerifyToken } from "@/app/utility/JWTHelper";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cookiesValue: any = req.cookies.get("token");
    const data = await VerifyToken(cookiesValue.value);
    return new NextResponse(
      JSON.stringify({
        email: data.email,
      }),
      {
        status: 200,
      }
    );
  } catch (error: any) {
    return new NextResponse(
      JSON.stringify({
        status: "error",
        message: error,
      }),
      { status: 500 }
    );
  }
}
