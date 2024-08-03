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
        <div>
            <h1 className="">{data.title}</h1>
            <p>{data.description}</p>
            <p>{data.time}</p>
            <p>{data.cost}</p>
            <p>{data.comment}</p>
            <div className="flex flex-col h-full w-full p-4">
                <RecipePage materials={data.materials} howto={data.howto}/>
            </div>

            <a
             href={`/cooking/${pathParam}`}
             className="py-3 px-4 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:outline-none focus:bg-gray-200 disabled:opacity-50 disabled:pointer-events-none dark:bg-white/10 dark:text-white dark:hover:bg-white/20 dark:hover:text-white dark:focus:bg-white/20 dark:focus:text-white"
            >
                <button type="button">
                    Cooking Start!
                </button>
            </a>
        </div>
    );

}
