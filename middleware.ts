import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export { auth as middlewareAuth } from "./Lib/auth";

export const middleware = (request: NextRequest) => {
  const headers = new Headers(request.headers);
  headers.set("x-current-path", request.nextUrl.pathname);
  return NextResponse.next({ headers });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};