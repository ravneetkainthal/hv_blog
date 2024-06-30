import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    // Create a NextResponse object to handle the response
    const response = NextResponse.redirect(new URL('/', req.url)); // Redirect to home page after logout

    // Set cookies to clear the session
    response.cookies.set('next-auth.session-token', '', { expires: new Date(0) });
    response.cookies.set('next-auth.csrf-token', '', { expires: new Date(0) });

    return response;
  } catch (error) {
    console.error('Error logging out:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
