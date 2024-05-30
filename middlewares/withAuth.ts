import { decrypt } from "@/service/server/auth";
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
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;
    const session = req.cookies.get("session")?.value;
    const decryptedSession = session ? await decrypt(session as string) : null;
    const redirects = () => {
      const url = new URL("/auth/signin", req.url);
      url.searchParams.set("callbackUrl", encodeURI(req.url));
      return NextResponse.redirect(url);
    };

    if (requireAuth.some((path) => pathname.startsWith(path))) {
      if (!decryptedSession) {
        return redirects();
      }
      if (pathname.includes("/vrp-launchpad")) {
        const isHacker = decryptedSession?.user.role === Role.hacker;
        if (isHacker) {
          const url = new URL("/dashboard", req.url);
          return NextResponse.redirect(url);
        }
      }
      if (pathname.includes("/companies")) {
        const isMediator = decryptedSession?.user.role === Role.mediator;
        if (!isMediator) {
          const url = new URL("/dashboard", req.url);
          return NextResponse.redirect(url);
        }
      }
      if (pathname.includes("/programs")) {
        const isHacker = decryptedSession?.user.role === Role.hacker;
        if (!isHacker) {
          const url = new URL("/dashboard", req.url);
          return NextResponse.redirect(url);
        }
      }
      if (pathname.includes("/manage-company")) {
        const isCompany = decryptedSession?.user.role === Role.company;
        if (!isCompany) {
          const url = new URL("/dashboard", req.url);
          return NextResponse.redirect(url);
        }
      }
    }
    return middleware(req, next);
  };
}
