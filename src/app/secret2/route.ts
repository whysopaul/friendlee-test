import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const queryParams = request.nextUrl.searchParams
    const key = queryParams.get('key')
    if (!key) {
        return Response.json('Missing \"key\" parameter.', { status: 400 })
    }

    const token = Buffer.from('key=' + key).toString('base64')

    return NextResponse.json(request.nextUrl.origin + '/iframe/' + token)
}