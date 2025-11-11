import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const redirectURL = request.nextUrl.clone();

  redirectURL.pathname = "/login";
  (await cookies()).delete(process.env.NEXT_PUBLIC_TOKEN_NAME);

  return NextResponse.redirect(redirectURL);
}
