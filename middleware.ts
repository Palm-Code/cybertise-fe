import { NextRequest, NextResponse } from "next/server";
import withAuthMiddleware from "./middlewares/withAuth";
import { getSession } from "./service/server/session";
import { fetchGetUserData } from "./core/services/server";

export async function mainMiddleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.url);
  const session = await getSession();
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
  if (session) {
    await fetchGetUserData().then((res) => {
      response.cookies.set("language", res.language, {
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
    });
  }
  // await updateSession(request);
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
]);
