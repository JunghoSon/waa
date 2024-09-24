import { NextRequest, NextResponse } from "next/server";
// import {setCo}

export async function middleware(request: NextRequest) {
  const access_token = request.nextUrl.searchParams.get("access_token");

  if (access_token) {
    const res = NextResponse.next();
    res.cookies.set("access_token", access_token);
    return res;
  }
}

export const config = {
  matcher: ["/chat"],
};
