import createIntlMiddleware from "next-intl/middleware";
import { type NextRequest } from "next/server";

import { pathnames, locales, localePrefix } from "./config";
import { updateSession } from "./lib/supabase/middleware";

const intlMiddleware = createIntlMiddleware({
  defaultLocale: "en",
  locales,
  pathnames,
  localePrefix,
});

export default async function middleware(req: NextRequest) {
  const response = intlMiddleware(req);

  const { supabase } = await updateSession(req);

  await supabase.auth.getSession();

  return response;
}

// export default async function middleware(request: NextRequest) {
//   const pathname = request.nextUrl.pathname;

//   // // `/_next/` and `/api/` are ignored by the watcher, but we need to ignore files in `public` manually.
//   // // If you have one
//   // if (
//   //   [
//   //     '/manifest.json',
//   //     '/favicon.ico',
//   //     // Your other files in `public`
//   //   ].includes(pathname)
//   // )
//   //   return

//   // Check if there is any supported locale in the pathname
//   const pathnameIsMissingLocale = locales.every(
//     (locale) =>
//       !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
//   );

//   // Redirect if there is no locale
//   if (pathnameIsMissingLocale) {
//     const locale = await getLocale();
//     const { supabase, response } = await updateSession(request);

//     // Refresh session if expired - required for Server Components
//     // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
//     await supabase.auth.getSession();
//     // Create the new URL
//     const newUrl = new URL(
//       `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`,
//       request.url,
//     );

//     // Create a new NextResponse with the updated information
//     const updatedResponse = new NextResponse(response.body, {
//       status: 302,
//       headers: {
//         ...response.headers,
//         Location: newUrl.toString(),
//       },
//     });

//     return updatedResponse;
//   }
// }

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    "/",

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    "/(vi|en)/:path*",

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
