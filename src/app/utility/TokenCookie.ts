import { CreateToken } from "@/app/utility/JWTHelper";
// import { cookies } from "next/headers";

export async function TokenCookie(email: string) {
  let token = await CreateToken(email);
  return { "Set-Cookie": `token=${token}; Max-Age=7200; Secure; HttpOnly; Path=/; SameSite=Strict` };
}
