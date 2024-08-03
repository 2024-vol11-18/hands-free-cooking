"use client";

import useSWR from "swr";
import React, { useRef, useState } from "react";
import { useParams } from 'next/navigation';
import RecipeList from "@/app/components/RecipeList";
import RecipeHowto from "@/app/components/RecipeHowto";
import RecipeMaterials from "@/app/components/RecipeMaterials";

// データ取得用のフェッチャー関数
const fetcher = async (url: string) => {
    const res = await fetch(url)
    return res.json()
  }

export default function Recipe() {
    // SWRフックを使って、指定されたレシピIDからデータを取得
    const { data, error } = useSWR(`/api/recipe/${useParams().id}`, fetcher);

    if (error) return <p>データの取得に失敗しました</p>;
    if (!data) return <p>データを読み込み中...</p>;

    return (
        <div>
            <h1>{data.title}</h1>
            <p>{data.description}</p>
            <p>{data.time}</p>
            <p>{data.cost}</p>
            <p>{data.comment}</p>
            <RecipeMaterials materials = {data.materials}></RecipeMaterials>
            {data.howto.map((howto: { order: number; text: string }, index: number) => (<p className="text-lg mx-8 my-4" key={index}>{index + 1}. {howto.text}</p>))}

            <div className="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
                <img className="w-full h-auto rounded-t-xl" src="https://images.unsplash.com/photo-1680868543815-b8666dba60f7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=320&q=80" alt="Card Image"/>
                <div className="p-4 md:p-5">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                    Card title
                    </h3>
                    <p className="mt-1 text-gray-500 dark:text-neutral-400">
                    Some quick example text to build on the card title and make up the bulk of the card's content.
                    </p>
                    <a className="mt-2 py-2 px-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none" href="#">
                    Go somewhere
                    </a>
                </div>
                </div>
        </div>
    );

}
