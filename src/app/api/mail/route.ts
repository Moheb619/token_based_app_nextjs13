import { NextRequest, NextResponse } from "next/server";
import { TokenCookie } from "@/app/utility/TokenCookie";
import { cookies } from "next/headers";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest, res: NextResponse) {
  const responsecookies = req.cookies.get("token")?.value;
  const reqBody = await req.json();

  let ToEmail = reqBody["email"];

  const transporter = nodemailer.createTransport({
    host: "mail.teamrabbil.com",
    port: 25,
    secure: false,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "info@teamrabbil.com",
      pass: "~sR4[bhaC[Qs",
    },
    tls: { rejectUnauthorized: false },
  });

  let myEmail = {
    from: "Token Verification <info@teamrabbil.com>",
    to: ToEmail,
    subject: "Verification mail",
    text: `Your verification token is ${responsecookies}`,
  };

  try {
    let result = await transporter.sendMail(myEmail);

    return NextResponse.json({ Message: result });
  } catch (e: any) {
    return NextResponse.json({ Message: "Fail" });
  }
}
