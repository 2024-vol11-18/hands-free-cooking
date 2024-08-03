export type RecipesType = {
    id: number,
    title: string,
    time: string,
    cost: string,
    comment: string
}

export type SearchGetResponseType = {
    recipes: Array<RecipesType>
}

export type RecipeGetResponseType = {
    id: number,
    title: string,
    time: string,
    cost: string,
    comment: string,
    materials: Array<{
        item: string,
        serving: string,
    }>
    howto: Array<{
        order: number,
        text: string
    }>
    
}

export type MessagePostRequestType = {
    text: string,
}