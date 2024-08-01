"use client";
import { useEffect, useState } from 'react';
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import Timer from '@/app/components/Timer';
import RecipeHowto from '@/app/components/RecipeHowto';
import RecipeMaterials from '@/app/components/RecipeMaterials';
import { MessagePostRequestType } from '../../api/apiType';
import { useParams } from 'next/navigation';
import { useTimer } from 'react-timer-hook';


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

export default function Cooking() {
    const [order, setOrder] = useState(1);
    const [ expirySeconds, setExpirySeconds ] = useState(60)
    const [text, setText] = useState("");
    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        resume,
        restart,
    } = useTimer({
        expirySeconds,
        onExpire: () => console.warn('onExpired called')
    })
    const {trigger, isMutating } = useSWRMutation("/api/message", postText)
    const {data, error, isLoading} = useSWR(`/api/recipe/${useParams().id}`, fetcher)
    if (error) return <div>Error</div>
    if (isLoading) return <div>isLoading...</div>

  
    //音声認識処理
    const SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
    const recognition = new SpeechRecognition();
    let cnt = 0;
    recognition.onresult = async (event) => {
      const recogText = event.results[cnt][0].transcript;
      const res = await trigger({ text: recogText })
      console.log(res)
      console.log(data.materials)
      switch (test) {
        case "materials":
            //材料を読み上げる処理
            console.log("materials")
            for (let i=0; i < data.materials.length; i++) {
                handleReadText(data.materials[i].item)
                handleReadText(data.materials[i].serving)
            }
            break;
        case "next_step":
            console.log("next_step")
            //次の工程に進んでその工程を読み上げる処理
            handleNextStep()
            handleReadText(text)
            break;
        case "previous_step":
            console.log("previous_step")
            //前の工程に戻ってその工程を読み上げる処理
            if (order > 1) {
                handlePreviousStep()
                handleReadText(text)
            }
            break;
        case "read_agin":
            console.log("read_agin")
            //現在の工程をもう一度読み上げる処理
            handleReadText(text)
            break;
        /*case "timer_open":
            //タイマーを起動
            handleStart()
            break;
        */
        case "timer_start":
            console.log("timer_start")
            //タイマーをスタートする
            handleStart()
            break;
        case "timer_stop":
            console.log("timer_stop")
            //タイマーをストップする
            handleStop()
            break;
        /*
        case "timer_restart":
            //タイマーをリスタートする
            break;
        */
        /*
        case "timer_close":
            //タイマーを閉じてレシピに戻る
            break;
        */
        case "no_action":
            console.log("no_action")
            //ノーアクション
            break;
        default:
            console.log("set_time")
             //タイマーの時間をセットする
             const setMinutes = res["command"].match(/[0-9]/g)
             handleRestart(setMinutes)
             handleRestart(3)
             break;
      }
      cnt++;
    }
    
    //認識しっぱなしにする設定だけど、1分くらいしたら接続切れるから何らかの対策は必要
    recognition.continuous = true;
    recognition.start();

    //音声合成処理
    const handleReadText = (text: string) => {
        //音声読み上げる処理
        const uttr = new SpeechSynthesisUtterance(text)
        speechSynthesis.speak(uttr)
    }

    //レシピステップ系の処理
    const howtoSize: number = data.howto.length

    const handlePreviousStep = () => {
        if (order > 1) {
            setOrder((order) => order-1)
            setText(data.howto[order - 1].text)
        }
    }

    const handleNextStep = () => {
        if (order < howtoSize) {
            setOrder((order) => order+1)
            setText(data.howto[order-1].text)
        }
    }

    //タイマー系の処理
    const handleStart = () => {
        start()
    }

    const handleStop = () => {
        pause()
    }

    const handleRestart = (minutes: number) => {
        const time = new Date();
        time.setSeconds(time.getSeconds() + minutes*60);
        restart(time);
    }

    return (
        <div className="grid grid-col h-screen grid-rows-[1fr_1fr_auto]">
            <div className="grid-1 flex items-center justify-center">
                <RecipeHowto order={order} text={text} handlePreviousStep={handlePreviousStep} handleNextStep={handleNextStep}/>
            </div>
            <div className="grid-2 flex items-center justify-center">
                <RecipeMaterials materials={data?.materials}/>
            </div>
            <div className="grid-3 p-4">
                <Timer handleStart={handleStart}
                handleStop={handleStop}
                handleRestart={handleRestart}
                seconds={seconds}
                minutes={minutes}
                hours={hours}
                isRunning={isRunning}
                 />
            </div>
        </div>
    )
}