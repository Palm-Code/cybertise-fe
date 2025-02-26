import { NextRequest, NextResponse } from "next/server";
import withAuthMiddleware from "./middlewares/withAuth";
import { getSession } from "./service/server/session";

export async function mainMiddleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);
  const session = await getSession();
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  if (session?.user.language) {
    response.cookies.set("language", session.user.language, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
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
]);
