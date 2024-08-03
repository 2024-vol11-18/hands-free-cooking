"use client";

import useSWR from "swr";
import React, { useRef, useState } from "react";
import { useParams } from 'next/navigation';
import RecipeList from "@/app/components/RecipeList";
import RecipeHowto from "@/app/components/RecipeHowto";
import RecipeMaterials from "@/app/components/RecipeMaterials";
import RecipePage from "@/app/components/RecipePage";

// データ取得用のフェッチャー関数
const fetcher = async (url: string) => {
    const res = await fetch(url)
    return res.json()
  }

export default function Recipe() {
    // SWRフックを使って、指定されたレシピIDからデータを取得
    const { data, error } = useSWR(`/api/recipe/${useParams().id}`, fetcher);
    const pathParam = useParams().id

    if (error) return <p>データの取得に失敗しました</p>;
    if (!data) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-cornsilk">
                <div className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent rounded-full text-selectiveyellow" role="status" aria-label="loading">
                    <span className="sr-only">Loading...</span>
                </div>
                <p className="mt-2 text-xanthous">Loading...</p>
            </div>
        )
    }

    return (
        <div className="flex flex-col justify-center items-start bg-white mx-auto my-4 p-3 w-5/6 rounded-lg">
            <div className="mx-auto">
                <ul className="p-3 max-w-xs flex flex-col divide-y divide-gray-200">
                    <li className="inline-flex items-center gap-x-2 py-3 px-4 text-md font-medium text-gray-800">
                        {data.title}
                    </li>
                    <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium text-gray-800">
                        時間: {data.time}
                    </li>
                    <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium text-gray-800">
                        費用: {data.cost}
                    </li>
                    <li className="inline-flex items-center gap-x-2 py-3 px-4 text-sm font-medium text-gray-800">
                        {data.comment}
                    </li>
                </ul>
            </div>
            <RecipeMaterials materials={data.materials}></RecipeMaterials>
            <div className="flex flex-col h-full w-full p-4">
                <RecipePage materials={data.materials} howto={data.howto}/>
            </div>
            

            <a
             href={`/cooking/${pathParam}`}
             className="py-3 px-4 mx-auto inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:hover:text-white dark:focus:bg-white/20 dark:focus:text-white"
            >
                <button type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-md font-bold rounded-lg border border-gray-200 bg-princetonorange text-babypowder shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                    作る！
                </button>
            </a>
        </div>
    );

}
