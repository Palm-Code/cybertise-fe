import { decrypt } from "@/service/server/auth";
import { Role } from "@/types/admin/sidebar";
import { cookies } from "next/headers";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

export default function withAuthMiddleware(
  middleware: NextMiddleware,
  requireAuth: string[] = []
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;
    const session = req.cookies.get("session")?.value;
    const decryptedSession = session ? await decrypt(session as string) : null;
    const redirects = () => {
      const { nextUrl } = req;
      const host = req.headers.get("host");
      const protocol = req.headers.get("x-forwarded-proto") || "https";

      // Build the current full URL using the actual host
      const currentUrl = `${protocol}://${host}${nextUrl.pathname}${nextUrl.search}`;

      // Build /auth/signin based on the real host, not req.url
      const signinUrl = new URL("/auth/signin", `${protocol}://${host}`);

      signinUrl.searchParams.set("callbackUrl", encodeURI(currentUrl));

      return NextResponse.redirect(signinUrl);
    };

    if (requireAuth.some((path) => pathname.startsWith(path))) {
      if (!decryptedSession) {
        return redirects();
      }
      if (
        pathname.includes("/vrp-launchpad") ||
        pathname.includes("/payment")
      ) {
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
      if (pathname.includes("/programs") || pathname.includes("/earnings")) {
        const isHacker = decryptedSession?.user.role === Role.hacker;
        if (!isHacker) {
          const url = new URL("/dashboard", req.url);
          return NextResponse.redirect(url);
        }
      }
      if (
        pathname.includes("/manage-company") ||
        pathname.includes("/services")
      ) {
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
