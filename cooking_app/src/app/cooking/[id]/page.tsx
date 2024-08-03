"use client";

import { useEffect, useRef, useState } from 'react';
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import Timer from '@/app/components/Timer';
import RecipeHowto from '@/app/components/RecipeHowto';
import RecipeMaterials from '@/app/components/RecipeMaterials';
import { MessagePostRequestType, RecipeGetResponseType } from '../../api/apiType';
import { useParams } from 'next/navigation';


const postText = async (url: string, { arg }: { arg: MessagePostRequestType }) => {
    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
    const orderRef = useRef(1)
    const [isRestart, setIsRestart] = useState(false);
    const [seconds, setSeconds] = useState(0)
    const [isRunning, setIsRunning] = useState(false)
    const intervalRef = useRef<NodeJS.Timeout>();
    const timeRef = useRef(0);
    const isSpeechRef = useRef(false)
    const cntRef = useRef(0)
    const dataRef = useRef<RecipeGetResponseType>()
    const { trigger, isMutating } = useSWRMutation("/api/message", postText)
    const { data, error, isLoading } = useSWR(`/api/recipe/${useParams().id}`, fetcher)


    //音声読み上げる処理
    const handleReadText = (text: string) => {
        const uttr = new SpeechSynthesisUtterance(text)
        speechSynthesis.speak(uttr)
    }

    //レシピステップ系の処理
    const handlePreviousStep = () => {
        if (orderRef.current > 1) {
            orderRef.current--
            setOrder(orderRef.current)
        }
    }

    let howtoSize: number = 0

    if(dataRef.current) {
        howtoSize = dataRef.current.howto.length
    }

    const handleNextStep = () => {
        if(!dataRef.current) throw new Error("data not found.")
        if (orderRef.current < dataRef.current.howto.length) {
            orderRef.current++
            setOrder(orderRef.current)
        }
    }

    //タイマー系の処理
    const handleStart = async () => {
        clearInterval(intervalRef.current)
        setIsRunning(true);
        intervalRef.current = setInterval(() => {
            setSeconds(preSeconds => preSeconds - 1);
        }, 1000);
    }
    const handleStop = () => {
        clearInterval(intervalRef.current)
        setIsRunning(false)
    }
    const handleRestart = async (minutes: number) => {
        clearInterval(intervalRef.current)
        setSeconds(minutes * 60)
        setIsRunning(true);
        intervalRef.current = setInterval(() => {
            setSeconds(preSeconds => preSeconds - 1);
        }, 1000);
    }

    //音声認識処理
    const recognize = async () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition()
        recognition.lang = 'ja'
        recognition.continuous = true
    
        recognition.onerror = function () {
            cntRef.current = 0
            if (!isSpeechRef.current) asyncRecog()
        }
        recognition.onsoundend = function () {
            cntRef.current = 0
            asyncRecog()
        }
    
        recognition.onresult = async (event) => {
            if(!dataRef.current) throw new Error("data not found.")
            const recogText = event.results[cntRef.current][0].transcript;
            console.log("認識された文字: " + recogText)
    
            if (event.results[cntRef.current].isFinal && (event.results[cntRef.current][0].confidence > 0.8)) {
                const res = await trigger({ text: recogText })
                cntRef.current = 0

                switch (res["command"]) {
                    case "materials":
                        //材料を読み上げる処理
                        console.log("materials")
                        handleReadText("材料を読み上げます")
                        for (let j = 0; j < dataRef.current.materials.length; j++) {
                            console.log(dataRef.current.materials[j].item)
                            handleReadText(dataRef.current.materials[j].item)
                            handleReadText(dataRef.current.materials[j].serving)
                        }
                        break;
                    case "next_step":
                        console.log("next_step")
                        //次の工程に進んでその工程を読み上げる処理
                        if (orderRef.current < dataRef.current.howto.length) {
                            handleReadText("次の工程に進んで工程を読み上げます")
                            handleNextStep()
                            handleReadText(dataRef.current.howto[orderRef.current-1].text)
                        }
                        break;
                    case "previous_step":
                        console.log("previous_step")
                        //前の工程に戻ってその工程を読み上げる処理
                        if (orderRef.current > 1) {
                            handleReadText("前の工程に戻って工程を読み上げます")
                            handlePreviousStep()
                            handleReadText(dataRef.current.howto[orderRef.current-1].text)
                        }
                        break;
                    case "read_again":
                        console.log("read_again")
                        //現在の工程をもう一度読み上げる処理
                        handleReadText("現在の工程を読み上げます")
                        handleReadText(dataRef.current.howto[orderRef.current-1].text)
                        break;
                    case "timer_stop":
                        console.log("timer_stop")
                        //タイマーをストップする
                        handleStop()
                        handleReadText("タイマーを停止します")
                        break;
                    case "timer_restart":
                        handleStart()
                        handleReadText("タイマーを再開します")
                        break;
                    case "no_action":
                        console.log("no_action")
                        //ノーアクション
                        break;
                    default:
                        console.log("set_time")
                        //タイマーの時間をセットする
                        const setMinutes = Number(res["command"].match(/[0-9]/g))
                        timeRef.current = setMinutes
                        setIsRestart(true)
                        handleReadText("タイマー" + setMinutes + "分セットします")
                        break;
                }
                asyncRecog()
            } else {
                cntRef.current++
                isSpeechRef.current = true;
            }
        }
        isSpeechRef.current = false;
        recognition.start();
    }

    const asyncRestart = async () => {
        if (isRestart) {
            await handleRestart(timeRef.current)
            setIsRestart(false)
        }
    }

    const asyncRecog = async () => {
        await recognize()
    }

    useEffect(() => {
        asyncRestart()
    }, [isRestart])

    useEffect(() => {
        asyncRecog()
    }, [])

    if ((seconds === 0) && isRunning) {
        //タイマー終了
        handleStop()
        handleReadText("タイマー終了しました")
    }
    if (isLoading) {
        return <div>isLoading...</div>
    } else {
        dataRef.current = data
    }
    if (error) return <div>Error</div>
    return (
        <div className="grid grid-col cooking-height grid-rows-[1fr_1fr_auto] bg-cornsilk">
            <div className="grid-1 flex justify-center border-b border-xanthous">
                <RecipeHowto howtoSize={howtoSize} order={order} text={data.howto[order-1].text} handlePreviousStep={handlePreviousStep} handleNextStep={handleNextStep}/>
            </div>
            <div className="grid-2 flex items-center justify-center border-b border-xanthous">
                <RecipeMaterials materials={data?.materials} />
            </div>
            <div className="grid-3 p-4">
                <Timer handleStart={handleStart}
                    handleStop={handleStop}
                    handleRestart={handleRestart}
                    seconds={seconds % 60}
                    minutes={Math.floor(seconds / 60)}
                    hours={Math.floor(seconds / 3600)}
                    isRunning={isRunning}
                />

            </div>
        </div>
    )
}