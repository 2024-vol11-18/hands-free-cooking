"use client";

import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { redirect } from 'next/navigation';

export default function Home() {
  redirect("/home")
  const fetcher = async (url: string) => {
    const res = await fetch(url)
    return res.json()
  }

  const createMessage = async (url: string, { arg }: {arg: {text: string}}) => {
    const res = await fetch(url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(arg)
    })
    return res.json()
  }

  const { trigger, isMutating } = useSWRMutation('/api/message/', createMessage)
  
  //POSTするタイミングで呼び出し
  const handleTrigger = async () => {
    const res = await trigger({text: "sample text"})
    console.log(res)
  }
}
