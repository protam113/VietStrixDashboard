import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Lấy cookie từ request
  const isAuthenticatedCookie = request.cookies.get('isAuthenticated')?.value;

  // Kiểm tra nếu isAuthenticated tồn tại và có giá trị "true"
  const isAuthenticated = isAuthenticatedCookie === 'true';
  const isLoginPage = request.nextUrl.pathname === '/login';

  // Nếu đã đăng nhập mà vào trang login, redirect về trang chủ
  if (isAuthenticated && isLoginPage) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Nếu chưa đăng nhập mà vào trang cần bảo vệ, redirect về login
  if (!isAuthenticated && !isLoginPage) {
    return NextResponse.redirect(
      new URL(
        `/login?from=${encodeURIComponent(request.nextUrl.pathname)}`,
        request.url
      )
    );
  }

  // Tiếp tục request bình thường nếu không vi phạm điều kiện nào
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match tất cả request trừ các route:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
