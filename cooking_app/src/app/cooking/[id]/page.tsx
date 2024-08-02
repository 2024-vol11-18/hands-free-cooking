"use client";
import { useEffect, useRef, useState } from 'react';
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import Timer from '@/app/components/Timer';
import RecipeHowto from '@/app/components/RecipeHowto';
import RecipeMaterials from '@/app/components/RecipeMaterials';
import { MessagePostRequestType } from '../../api/apiType';
import { useParams } from 'next/navigation';


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
    const [text, setText] = useState("");
    const [isRestart, setIsRestart] = useState(false);
    const [seconds, setSeconds] = useState(0)
    const intervalRef = useRef<NodeJS.Timeout>();
    const timeRef = useRef(0);
    const isSpeechRef = useRef(false)
    const cntRef = useRef(0)
    const [isRunning, setIsRunning] = useState(false)

   //音声認識処理
   const recognize = async() => {
       const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition
       const recognition = new SpeechRecognition()
       recognition.lang = 'ja'
       recognition.continuous = true

       recognition.onerror = function() {
           cntRef.current = 0
           if(!isSpeechRef.current) recognize()
       }
       recognition.onsoundend = function() {
            cntRef.current = 0
            recognize()
       }

       recognition.onresult = async (event) => {
               const recogText = event.results[cntRef.current][0].transcript;
               console.log("認識された文字: "+recogText)

               if (event.results[cntRef.current].isFinal && (event.results[cntRef.current][0].confidence > 0.8)) {
                   const res = await trigger({ text: recogText })

                   switch (res["command"]) {
                       case "materials":
                           //材料を読み上げる処理
                           console.log("materials")
                           for (let j=0; j < data.materials.length; j++) {
                               handleReadText(data.materials[j].item)
                               handleReadText(data.materials[j].serving)
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
                       case "timer_stop":
                           console.log("timer_stop")
                           //タイマーをストップする
                           handleStop()
                           break;
                       case "timer_restart":
                           //タイマーをリスタートする
                           handleStart()
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
                           break;
                   }
                   cntRef.current = 0
                   recognize()
               } else {
                    cntRef.current++
                   isSpeechRef.current = true;
               }
       }
       isSpeechRef.current = false;
       recognition.start();
   }
    useEffect(() => {
        const f = async() => {
            if (isRestart) {
                await handleRestart(timeRef.current)
                setIsRestart(false)
            }
        }
        f()
    }, [isRestart])

    useEffect(() => {
        const f = async() => {
            await recognize()
        }
        f()
    }, [])

    const {trigger, isMutating } = useSWRMutation("/api/message", postText)
    const {data, error, isLoading} = useSWR(`/api/recipe/${useParams().id}`, fetcher)
    if (error) return <div>Error</div>
    if (isLoading) return <div>isLoading...</div>


    //音声読み上げる処理
    const handleReadText = (text: string) => {
        const uttr = new SpeechSynthesisUtterance(text)
        speechSynthesis.speak(uttr)
    }

    //レシピステップ系の処理
    const howtoSize: number = data.howto.length

    const handlePreviousStep = () => {
        if (order > 1) {
            setOrder((order) => order-1)
            setText(data.howto[order-1].text)
        }
    }

    const handleNextStep = () => {
        if (order < howtoSize) {
            setOrder((order) => order+1)
            setText(data.howto[order-1].text)
        }
    }

    //タイマー系の処理
    const handleStart = async () => {
        clearInterval(intervalRef.current)
        setIsRunning(true);
        intervalRef.current = setInterval(() => {
            setSeconds(preSeconds => preSeconds-1);
        }, 1000);
    }
    const handleStop = () => {
        clearInterval(intervalRef.current)
        setIsRunning(false)
    }
    const handleRestart = async(minutes: number) => {
        clearInterval(intervalRef.current)
        setSeconds(minutes*60)
        setIsRunning(true);
        intervalRef.current = setInterval(() => {
            setSeconds(preSeconds => preSeconds-1);
        }, 1000);
    }

    if ((seconds === 0)&&isRunning) handleStop()
    return (
        <div className="grid grid-col cooking-height grid-rows-[1fr_1fr_auto]">
            <div className="grid-1 flex justify-center border-b border-gray-300">
                <RecipeHowto order={order} text={text?text: data.howto[0].text} handlePreviousStep={handlePreviousStep} handleNextStep={handleNextStep}/>
            </div>
            <div className="grid-2 flex items-center justify-center border-b border-gray-300">
                <RecipeMaterials materials={data?.materials}/>
            </div>
            <div className="grid-3 p-4">
                <Timer handleStart={handleStart}
                handleStop={handleStop}
                handleRestart={handleRestart}
                seconds={seconds%60}
                minutes={Math.floor(seconds/60)}
                hours={Math.floor(seconds/3600)}
                isRunning={isRunning}
                 />

            </div>
        </div>
    )
}