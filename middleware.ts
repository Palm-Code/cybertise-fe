import { NextRequest, NextResponse } from "next/server";
import withAuth from "./middlewares/withAuth";

export async function mainMiddleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);
  // await updateSession(request);
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export default withAuth(mainMiddleware, [
  "/dashboard",
  "/programs",
  "/companies",
  "/vrp-launchpad",
  "/manage-company",
  "/reports",
  "/settings",
]);
