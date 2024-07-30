import { NextRequest, NextResponse } from 'next/server';
import { RecipeGetResponseType } from '../../apiType';

export async function GET(request: NextRequest, { params }: { params: { id: string } }): Promise<NextResponse> {
    //mock
    const mock_res: RecipeGetResponseType = {
      "id": 1040023642,
      "title": "冬瓜と豚ばら肉の煮物",
      "time": "約30分",
      "cost": "300円前後",
      "comment": "しっかり味が染みご飯にあいます♪",
      "materials": [
        {
          "item": "厚切り豚ばら肉",
          "serving": "100g",
          "howto": [
            {
              "order": 1,
              "text": "冬瓜は皮を剥き、種を取り、ひと口大に切る。豚ばら肉は4㎝長さに切る。"
            }
          ]
        }
      ]
    }

    return NextResponse.json(mock_res)
}