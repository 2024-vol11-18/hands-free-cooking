import { NextRequest, NextResponse } from 'next/server';
import { MessagePostRequestType } from '../apiType';
import { GetOpenAIClient, CreateChatCompletion } from '../createChat';

export async function POST(request: NextRequest): Promise<NextResponse> {

    const isDebug = process.env.DEBUG
    if (isDebug === "false") {
        const body: MessagePostRequestType = await request.json()
        //TODO: OpenAIクライアントをstaticに保持する？tokenの期限が切れた時だけ更新
        const openai = await GetOpenAIClient()
        const prompt = `
        あなたは与えられたテキストが期待している行動を答えるAIです．
        あなたにテキストを送るのは，調理中の人間です．
        行動は次で定義する11個の行動から選びなさい．
        行動は 「キーワード：説明」 で表される．
        materials: 材料を読み上げる,
        next_step: 次の工程を読み上げる,
        previous_step: 前の工程を読み上げる,
        read_again: 現在の工程を再度読み上げる,
        set_time_?_min: タイマーをセットする（？は数値）,
        timer_stop: タイマーをストップする,
        timer_restart: タイマーをリスタートする,
        no_action: 何もしない
        あなたに送られたテキストは「${body.text}」です．
        あなたは行動を示す「キーワード」のみを回答しなさい．
        `

        const response = (await CreateChatCompletion(openai, prompt, {max_tokens : 5})).choices[0].message.content
        if (response == undefined) {
            return NextResponse.json({error: "response is undefined"}, {status: 500})
        }   else    {
            if (!validateResponse(response)) {
                return NextResponse.json({error: "response is invalid"}, {status: 500})
            }
            return NextResponse.json({command: response}, {status: 200})   
        }
    } else {
        //mock
        return NextResponse.json({command: "materials"}, { status: 200 }) 
    }
}

type CheckFunction = (response: string) => boolean

function validateResponse(response: string): boolean {
    const static_keyword_set = new Set(["materials", "next_step", "previous_step", "read_again", "timer_stop", "timer_restart", "no_action"])

    // set_time_?_min (タイマーを？分セットする)の形式かどうかチェック．?(数値)は任意の数値にしている．00001のような値も許容している．
    const check_set_time_min : CheckFunction = (response) => {return response.match(/set_time_[0-9]+_min/) != null}
    // static_keyword_setに含まれるかチェック．
    const check_containe_static_keyword : CheckFunction = (response) => {return static_keyword_set.has(response)}

    return CheckFunctionsPipeline(response, [check_set_time_min, check_containe_static_keyword])

    function CheckFunctionsPipeline(response: string, checks: CheckFunction[]): boolean {
        checks.forEach(check => {if(!check(response)){return false}})
        return true
    } 
}