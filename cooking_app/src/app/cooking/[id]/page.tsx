"use client";
import { useState } from 'react';
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import Timer from '@/app/components/Timer';
import RecipeHowto from '@/app/components/RecipeHowto';
import RecipeMaterials from '@/app/components/RecipeMaterials';
import { MessagePostRequestType } from '../../api/apiType';
import { usePathname } from 'next/navigation';


const postText = async (url: string, { arg }: { arg: MessagePostRequestType}) => {
    const res = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(arg)
    })
    return res.json()
}

const fetcher = async (url: string) => {
    const res = await fetch(url)
    return res.json()
}

type processType = "materials" | 
                    "next_step" |
                    "previous_step" |
                    "read_agin" |
                    "timer_open" | 
                    "timer_start" |
                    "timer_stop" |
                    "timer_restart" |
                    "timer_close" |
                    "no_action" 

                    type Step = {
    order: number;
    text: string;
}

const howtoSample: Step[] = [
    {
        order: 1,
        text: "レシピステップ1",
    },
    {
        order: 2,
        text: "レシピステップ2",
    },
    {
        order: 3,
        text: "レシピステップ3",
    },
    {
        order: 4,
        text: "レシピステップ4",
    },
]


export default function Cooking() {
    const [order, setOrder] = useState(1);
    const [text, setText] = useState(howtoSample[0].text);
    const [ expirySeonds, setExpirySeconds ] = useState(60)
    const time = new Date()
    time.setSeconds(time.getSeconds() + expirySeonds)
    
    

    const {trigger, isMutating } = useSWRMutation("/api/message", postText)
    const {data, error, isLoading} = useSWR(`/api${usePathname()}`, fetcher)
    const handleReadText = (text: string) => {
        //音声読み上げる処理
    }
  
    //音声認識処理
    const recognition = new SpeechRecognition();
    let cnt = 0;
    recognition.onresult = async (event) => {
      const text = event.results[cnt][0].transcript;
      const res = await trigger({ text: text })
      switch (res["process"]) {
        case "materials":
            //材料を読み上げる処理
            handleReadText(data.materials)
            break;
        case "next_step":
            //次の工程に進んでその工程を読み上げる処理
            handleReadText(data.materials)
            break;
        case "previous_step":
            //前の工程に戻ってその工程を読み上げる処理
            if (order > 1) {
                handleReadText(data.howto[order-2])
            }
            break;
        case "read_agin":
            //現在の工程をもう一度読み上げる処理
            handleReadText(data.howto[order -1])
            break;
        case "timer_open":
            //タイマーを起動
            
            break;
        case "timer_start":
            //タイマーをスタートする
            break;
        case "timer_stop":
            //タイマーをストップする
            break;
        case "timer_restart":
            //タイマーをリスタートする
            break;
        case "timer_close":
            //タイマーを閉じてレシピに戻る
            break;
        case "no_action":
            //ノーアクション
            break;
        default:
             //タイマーの時間をセットする
             break;
      }
      cnt++;
    }
    
    recognition.start();

    //レシピステップ系の処理
    const howtoSize: number = howtoSample.length

    const previousStep = () => {
        if (order > 1) {
            setOrder(order => order -1)
            setText(howtoSample[order - 1].text)
            
        }
    }

    const nextStep = () => {
        if (order < howtoSize) {
            setText(howtoSample[order].text)
            setOrder(order => order + 1)
        }
    }

    return (
        <div className="grid grid-col h-screen grid-rows-[1fr_1fr_auto]">
            <div className="grid-1 flex items-center justify-center">
                <RecipeHowto order={order} text={text} handlePreviousStep={handlePreviousStep} handleNextStep={handleNextStep}/>
            </div>
            <div className="grid-2 flex items-center justify-center">
                <RecipeMaterials materials={data.materials}/>
            </div>
            <div className="grid-3 p-4">
                <Timer expiryTimestamp={time} />
            </div>
        </div>
    )
}