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
            <h1>{data.title}</h1>
            <p>{data.description}</p>
            <p>{data.time}</p>
            <p>{data.cost}</p>
            <p>{data.comment}</p>
            <RecipeMaterials materials = {data.materials}></RecipeMaterials>
            {data.howto.map((howto: { order: number; text: string }, index: number) => (<p className="text-lg mx-8 my-4" key={index}>{index + 1}. {howto.text}</p>))}
        </div>
    );

}
