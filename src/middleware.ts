import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAuthPage = req.nextUrl.pathname.startsWith('/create-blog');

  if (isAuthPage && !token) {
    // Redirect to home page if user is not authenticated
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  return NextResponse.next();
}

// Specify which paths to run the middleware on
export const config = {
  matcher: ['/create-blog'],
};
