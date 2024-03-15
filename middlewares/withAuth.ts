import { decrypt } from "@/server/auth";
import { Role } from "@/types/admin/sidebar";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

export default function (
  middleware: NextMiddleware,
  requireAuth: string[] = []
) {
  return async (req: NextRequest, res: NextResponse, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;
    const redirects = () => {
      const url = new URL("/auth/signin", req.url);
      url.searchParams.set("callbackUrl", encodeURI(req.url));
      return NextResponse.redirect(url);
    };

    if (requireAuth.some((path) => pathname.startsWith(path))) {
      const session = req.cookies.get("session")?.value;
      const decryptedSession = await decrypt(session as string);
      if (
        pathname.includes("/vrp-launchpad") &&
        decryptedSession?.user.role !== Role.mediator
      ) {
        const url = new URL("/dashboard", req.url);
        return NextResponse.redirect(url);
      }
      if (!session) {
        redirects();
      }
    }
    return middleware(req, next);
  };
}
