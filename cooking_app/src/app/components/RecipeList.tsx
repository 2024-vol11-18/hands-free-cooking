import React from "react";
import RecipeComponent from "../components/RecipeComponent";
import { RecipesType } from "../api/apiType";

export default function RecipeList({ recipe_data }: { recipe_data: Array<RecipesType>}) {
    if (recipe_data.length !== 0) {
        return (
            <div>
                { recipe_data.map((recipe, index) => <RecipeComponent recipe={recipe} key={index}/>) }
            </div>
        )
    } else {
        return (
            <div className="m-8 flex flex-col bg-white border shadow-sm rounded-xl">
                <div className="p-4 md:p-10">
                  <p>検索してみましょう!</p>
                </div>
            </div>
        )
    }
}