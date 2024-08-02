import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const queryParams = request.nextUrl.searchParams
    const key = queryParams.get('key')
    if (!key) {
        return Response.json('Missing \"key\" parameter.', { status: 400 })
    }

    const headers = new Headers()
    headers.append('Set-Cookie', 'key=' + key + '; Max-Age=300')

    return NextResponse.redirect(new URL('/', request.url), { headers })
}