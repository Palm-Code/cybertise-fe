import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "./service/server/auth";
import withAuth from "./middlewares/withAuth";

export async function mainMiddleware(request: NextRequest) {
  await updateSession(request);
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  return NextResponse.next();
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
