import { NextRequest, NextResponse } from "next/server";
import { updateSession } from "./server/auth";
import withAuth from "./middlewares/withAuth";

export async function mainMiddleware(request: NextRequest) {
  await updateSession(request);
  const res = NextResponse.next();
  return res;
}

export default withAuth(mainMiddleware, [
  "/dashboard",
  "/programs",
  "/reports",
  "/settings",
]);
