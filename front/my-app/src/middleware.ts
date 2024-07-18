import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const secret = process.env.JWT_SECRET || "your_jwt_secret"; // Asegúrate de configurar tu secreto de JWT

export function middleware(request: NextRequest) {
    const token = request.cookies.get('userToken')?.value;

    if (!token) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    try {
        const decodedToken = jwt.verify(token, secret);
        
        // @ts-ignore
        if (decodedToken.role !== 'admin') {
            return NextResponse.redirect(new URL("/", request.url));
        }

        return NextResponse.next();
    } catch (error) {
        console.error("Token verification failed:", error);
        return NextResponse.redirect(new URL("/", request.url));
    }
}

export const config = {
    matcher: ['/dashboard']
};
