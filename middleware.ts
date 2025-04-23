import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  
  // Public paths that don't require authentication
  const publicPaths = ['/', '/login', '/registro', '/planos', '/suporte'];
  const isPublicPath = publicPaths.some(path => 
    request.nextUrl.pathname === path || 
    request.nextUrl.pathname.startsWith(path + '/')
  );
  
  // Check if the path is public
  if (isPublicPath) {
    return NextResponse.next();
  }
  
  // Redirect to login if not authenticated
  if (!token) {
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', request.nextUrl.pathname);
    return NextResponse.redirect(url);
  }
  
  // Admin routes protection
  if (
    request.nextUrl.pathname.startsWith('/admin') && 
    token.role !== 'admin'
  ) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}