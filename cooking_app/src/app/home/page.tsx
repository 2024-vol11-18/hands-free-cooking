"use client";

import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import RecipeList from "../components/RecipeList";
import React, { useRef, useState } from "react";

export default function Home() {
    const [recipeData, setRecipeData] = useState([])
    const [searchText, setSearchText] = useState("")


    const fetcher = async (url: string) => {
      const res = await fetch(url)
      return res.json()
    }

    const { trigger, isMutating } = useSWRMutation(`/api/search/${searchText}`, fetcher)

    const handleSearchSubmit = async () => {
      const res = await trigger()
      setRecipeData(res["recipes"])
    }
    if (isMutating) {
        return (
          <div className="flex flex-col justify-center items-center min-h-screen">
            <div className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">
              <span className="sr-only">Loading...</span>
            </div>
            <p className="mt-2 text-cyan-500 dark:text-cyan-300">Loading...</p>
          </div>
        )
      }

    const handleChangeSearchText = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchText(event.target.value)
    }


    return (
    <div>
      <div className="max-w-sm space-y-3 m-8">
        <div>
          <form>
          <label htmlFor="hs-leading-button-add-on-with-icon" className="sr-only">Label</label>
          <div className="flex rounded-lg shadow-sm">
            <button onClick={handleSearchSubmit} type="button" className="w-[2.875rem] h-[2.875rem] shrink-0 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-s-md border border-transparent bg-princetonorange text-white hover:bg-orange-500 focus:outline-none focus:bg-orange-500 disabled:opacity-50 disabled:pointer-events-none">
              <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </button>
            <input onChange={(event) => handleChangeSearchText(event)} value={searchText} type="text" id="hs-leading-button-add-on-with-icon" name="hs-leading-button-add-on-with-icon" placeholder="検索したいキーワードを入力"
            className="py-3 px-4 block w-full border outline-none border-gray-200 shadow-sm rounded-e-lg text-sm focus:z-10 focus:border-orangewheel focus:ring-orangewheel disabled:opacity-50 disabled:pointer-events-none"/>
          </div>
          </form>
        </div>
      </div>

      <RecipeList  recipe_data={recipeData}/>
    </div>
    )
}