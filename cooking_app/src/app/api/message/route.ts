import { NextRequest, NextResponse } from 'next/server';
import { MessagePostRequestType } from '../apiType';

export async function POST(request: NextRequest): Promise<NextResponse> {

    const body: MessagePostRequestType = await request.json()
    //処理

    return NextResponse.json({status: "OK"})
}