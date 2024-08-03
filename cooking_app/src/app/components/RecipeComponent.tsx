"use client";

import React from "react";
import { RecipesType } from "../api/apiType";

export default function RecipeComponent({ recipe }: {recipe: RecipesType}) {
    return (
        <>
            <div className="m-8 flex flex-col bg-white border shadow-sm rounded-xl">
                <div className="p-4 md:p-10">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                    {recipe.title}
                    </h3>
                    <p className="mt-2 text-gray-500 dark:text-neutral-400">
                    {recipe.time}
                    </p>
                    <p className="mt-2 text-gray-500 dark:text-neutral-400">
                    {recipe.cost}
                    </p>
                    <p className="mt-2 text-gray-500 dark:text-neutral-400">
                    {recipe.comment}
                    </p>
                    <a className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-orange-600 decoration-2 hover:text-orange-700 hover:underline focus:underline focus:outline-none focus:text-orange-700 disabled:opacity-50 disabled:pointer-events-none" href={`/recipe/${recipe.id}`}>
                    Show recipe details
                    <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m9 18 6-6-6-6"></path>
                    </svg>
                    </a>
                </div>
            </div>
        </>
    )
}