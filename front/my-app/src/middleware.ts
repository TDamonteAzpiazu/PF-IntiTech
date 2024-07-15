import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const user = request.cookies.get('userToken');
    
    if (!user){
      return NextResponse.redirect(new URL("/", request.url))
    }
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard',
            '/profile',
            '/cart',
            '/orders'
  ]
};
