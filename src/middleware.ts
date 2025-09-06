import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

// Role definitions for middleware
enum Role {
  ADMIN = 'ADMIN',
  INSTRUCTOR = 'INSTRUCTOR',
  STUDENT = 'STUDENT'
}

// Define role-based route protection
const roleProtectedRoutes = {
  '/admin': [Role.ADMIN],
  '/admin/*': [Role.ADMIN],
  '/creator': [Role.ADMIN, Role.INSTRUCTOR],
  '/instructor': [Role.ADMIN, Role.INSTRUCTOR],
}

// Get user role from email (demo implementation)
function getUserRole(email: string): Role {
  if (email.includes('admin') || email === 'admin@ethed.com') {
    return Role.ADMIN;
  } else if (email.includes('instructor') || email === 'instructor@ethed.com') {
    return Role.INSTRUCTOR;
  }
  return Role.STUDENT;
}

// Check if user has access to route based on role
function hasRouteAccess(pathname: string, userRole: Role): boolean {
  for (const [route, allowedRoles] of Object.entries(roleProtectedRoutes)) {
    const routePattern = route.replace('/*', '');
    if (pathname.startsWith(routePattern)) {
      return allowedRoles.includes(userRole);
    }
  }
  return true; // Allow access if route is not in protected routes
}

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  const { pathname } = req.nextUrl

  // Allow requests for next-auth session & provider fetching
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next()
  }

  // Allow public routes
  const publicRoutes = ['/', '/courses', '/about', '/auth', '/api']
  const isPublicRoute = publicRoutes.some(route => pathname === route || pathname.startsWith(route))
  
  if (isPublicRoute && !pathname.startsWith('/api/')) {
    return NextResponse.next()
  }

  // Define protected routes that require authentication
  const protectedRoutes = ['/profile', '/creator', '/progress', '/rewards', '/admin', '/instructor', '/learn']
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  // If accessing a protected route without authentication, redirect to sign-in
  if (isProtectedRoute && !token) {
    const url = req.nextUrl.clone()
    url.pathname = '/auth'
    return NextResponse.redirect(url)
  }

  // Role-based access control
  if (token && token.email) {
    const userRole = getUserRole(token.email as string)
    
    // Check role-based access
    if (!hasRouteAccess(pathname, userRole)) {
      const url = req.nextUrl.clone()
      
      // Redirect based on user role
      switch (userRole) {
        case Role.ADMIN:
          url.pathname = '/admin/dashboard'
          break
        case Role.INSTRUCTOR:
          url.pathname = '/instructor'
          break
        case Role.STUDENT:
          url.pathname = '/courses'
          break
        default:
          url.pathname = '/auth'
      }
      
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api routes
     */
    '/((?!_next/static|_next/image|favicon.ico|api).*)',
  ],
}
