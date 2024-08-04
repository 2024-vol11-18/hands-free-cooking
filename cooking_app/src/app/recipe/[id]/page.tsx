"use client";

import useSWR from "swr";
import React, { useRef, useState } from "react";
import { useParams } from 'next/navigation';
import RecipeList from "@/app/components/RecipeList";
import RecipeHowto from "@/app/components/RecipeHowto";
import RecipeMaterials from "@/app/components/RecipeMaterials";
import RecipePage from "@/app/components/RecipePage";
import { RecipeGetResponseType } from "../../api/apiType";

// データ取得用のフェッチャー関数
const fetcher = async (url: string) => {
    const res = await fetch(url)
    return res.json()
  }

export default function Recipe() {
    // SWRフックを使って、指定されたレシピIDからデータを取得
    const { data , error }:{data: RecipeGetResponseType, error: any} = useSWR(`/api/recipe/${useParams().id}`, fetcher);
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
        <div className="flex flex-col justify-center items-start bg-white mx-auto my-4 p-3 w-5/6 h-hull rounded-lg">
            <div className="flex flex-col h-full w-full p-4">
                <RecipePage data={data} />
            </div>
            

            <a
             href={`/cooking/${pathParam}`}
             className="mx-auto"
            >
                <button type="button" className="py-3 px-4 inline-flex items-center gap-x-2 text-md font-bold rounded-lg border border-gray-200 bg-princetonorange text-babypowder shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
                    作る！
                </button>
            </a>
        </div>
    );

}
