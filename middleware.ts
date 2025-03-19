import { NextRequest, NextResponse } from "next/server";
import withAuthMiddleware from "./middlewares/withAuth";

export async function mainMiddleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export default withAuthMiddleware(mainMiddleware, [
  "/dashboard",
  "/programs",
  "/companies",
  "/vrp-launchpad",
  "/manage-company",
  "/reports",
  "/settings",
  "/services",
  "/payment",
  "/earnings",
]);
