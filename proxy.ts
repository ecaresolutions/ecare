import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const handleRequest = createMiddleware(routing);

export default function proxy(request: any) {
  return handleRequest(request);
}

export const config = {
  // Match all pathnames except for the ones starting with:
  // - api (API routes)
  // - _next (Next.js internals)
  // - _vercel (Vercel internals)
  // - static files (e.g. favicon.ico, etc.)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
