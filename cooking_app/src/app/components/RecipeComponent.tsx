"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { RecipesType } from "../api/apiType";

export default function RecipeComponent({ recipe }: {recipe: RecipesType}) {
    return (
        <>
            <div className="m-8 flex flex-col bg-white border shadow-sm rounded-xl dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
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
                    <a className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 decoration-2 hover:text-blue-700 hover:underline focus:underline focus:outline-none focus:text-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:text-blue-500 dark:hover:text-blue-600 dark:focus:text-blue-600" href={`/recipe/${recipe.id}`}>
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