// middleware.ts (or proxy.ts in Next.js 16+)
// Example of modifying headers for an internal API rewrite
import { NextRequest, NextResponse } from 'next/server';

export function proxy(request, response) {

  //console.log('request.headers', request.headers)
  //const newHeaders = new Headers(request.headers);
  //newHeaders.set('x-forwarded-for', '91.236.230.83'); // Set a fake/internal IP
  //host,referer
  /*newHeaders.set('host', '91.236.230.83:443');
  newHeaders.set('referer', 'http://localhost:3000/categories?viewtype=main&page=0&scroll=start');
  newHeaders.set('x-forwarded-host', '91.236.230.83');
  newHeaders.set('x-forwarded-port', '443');
  newHeaders.set('accept-language', 'q=0.9,en-US;q=0.8,en;q=0.7')

  // Rewrite the request to an internal API route or external service
  return NextResponse.rewrite(new URL('/categories?viewtype=main&page=0&scroll=start', request.url), {
    request: {
      headers: newHeaders,
    },
  });*/
  //NextResponse.next();
}

// Configuration to specify which paths the middleware should apply to
export const config = {
  matcher: ['/:path*', '/dashboard/:path*', '/about/:path*'], // Applies to /dashboard and /about pages
};
