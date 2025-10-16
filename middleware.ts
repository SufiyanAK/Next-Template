import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Get the auth token from cookies or localStorage (we'll check cookies here since it's server-side)
    const token = request.cookies.get('RPAAuthToken')?.value ||
        request.headers.get('authorization')?.replace('Bearer ', '');

    console.log('Middleware - Path:', pathname);
    console.log('Middleware - Token exists:', !!token);

    // Define public and protected routes
    const publicRoutes = ['/login'];
    const protectedRoutes = ['/dashboard', '/home', '/projects'];

    // Check if current path is a protected route
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
    const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

    // If user is not authenticated
    if (!token) {
        // If trying to access protected route, redirect to login
        if (isProtectedRoute) {
            console.log('Middleware - Redirecting to login (no token)');
            return NextResponse.redirect(new URL('/login', request.url));
        }
        // Allow access to public routes
        return NextResponse.next();
    }

    // If user is authenticated
    if (token) {
        // If trying to access login page, redirect to home
        if (isPublicRoute) {
            console.log('Middleware - Redirecting to home (already authenticated)');
            return NextResponse.redirect(new URL('/home', request.url));
        }
        // Allow access to protected routes
        return NextResponse.next();
    }

    // Default: allow the request to continue
    return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder files
         */
        '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
    ],
};