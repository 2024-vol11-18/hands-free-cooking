import { NextRequest, NextResponse } from 'next/server';
import { getService } from './controller';

export async function GET(request: NextRequest, { params }: { params: { search_word: string } }): Promise<NextResponse> {
    const service = getService()

    //  //mock
    //  const mock_res: SearchGetResponseType = {
    //     recipes: [
    //       {
    //         id: 1040023642,
    //         title: "冬瓜と豚ばら肉の煮物",
    //         time: "約30分",
    //         cost: "300円前後",
    //         comment: "しっかり味が染みご飯にあいます♪"
    //       },
    //     ]
    //   }
    // return NextResponse.json(mock_res)
    return NextResponse.json(await service.search(params.search_word))
}