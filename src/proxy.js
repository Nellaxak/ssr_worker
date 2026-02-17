// middleware.ts (or proxy.ts in Next.js 16+)
// Example of modifying headers for an internal API rewrite
import { NextRequest, NextResponse } from 'next/server';

async function CalcData(params) {
  //console.log('CalcData', await params)
  //const count = await CountPage.getCount();
  let currentDate = new Date()
  currentDate.setDate(currentDate.getDate());
  const page = params

  //if (Number(page) > 0) {
  const newPage = Number(currentDate.getDate()) + Number(page)
  currentDate.setDate(newPage);//+1
  //}
  let tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate());
  //console.log('page**', page)
  //if (Number(page) > 0) {
  const newPage1 = Number(tomorrow.getDate()) + Number(page)// + 1//+1 offset
  //console.log('if', tomorrow.getDate())
  tomorrow.setDate(newPage1);//+1
  //}
  //console.log('myDate', new Intl.DateTimeFormat('ru-RU', optionsDate).format(currentDate))
  let startDate = currentDate.getFullYear() + '-' +
    (currentDate.getMonth() + 1) + '-' +
    currentDate.getDate();
  let endDate = tomorrow.getFullYear() + '-' +
    (tomorrow.getMonth() + 1) + '-' +
    tomorrow.getDate();
  //console.log('return data', startDate, endDate)
  /*return new Promise((resolve) => {
      resolve([startDate, endDate])
  })*/
  return [startDate, endDate]
}

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
