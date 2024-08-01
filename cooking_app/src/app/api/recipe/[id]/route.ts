import { NextRequest, NextResponse } from 'next/server';
import { getService } from './controller';

export async function GET(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
    const service = getService()

    return NextResponse.json(await service.get(params.id))
}