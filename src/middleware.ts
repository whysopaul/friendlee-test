import { NextRequest, NextResponse, URLPattern } from "next/server";

export function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/iframe/')) {
        const token = request.nextUrl.pathname.split('/iframe/')[1]
        const decoded = Buffer.from(token, 'base64').toString()
        const params = new URLSearchParams(decoded)
        const key = params.get('key')

        if (key) {
            // Validation logic
            const response = NextResponse.next()
            response.cookies.set('key', key)

            return response
        }
    }

    return NextResponse.rewrite(new URL('/not-found', request.url))
}

export const config = {
    matcher: [
        {
            source: '/',
            missing: [{ type: 'cookie', key: 'key' }]
        },
        { source: '/iframe/:token*' }
    ]
}