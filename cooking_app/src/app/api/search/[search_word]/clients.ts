import "server-only"
import { SearchGetResponseType, RecipesType, RecipeGetResponseType } from '../../apiType';
import { getService } from '../../recipe/[id]/controller';
import jsdom, {JSDOM} from 'jsdom';

export interface ISearchClient{
    search(query: string): Promise<SearchGetResponseType>,
}

export class OpenAISearchClient implements ISearchClient{
    async search(query: string): Promise<SearchGetResponseType> {
        throw new Error('Method not implemented.');
    }
}



export class RakutenRecipeScraipingSearchClient implements ISearchClient{
    base_url: string = "https://recipe.rakuten.co.jp/search/"

    async search(query: string): Promise<SearchGetResponseType> {
        const res = await fetch(this.base_url + query)
        const virtualConsole = new jsdom.VirtualConsole();
        virtualConsole.on("error", () => {});
        const dom = new JSDOM(await res.text(),{virtualConsole})

        const recipe_lists = dom.window.document.querySelectorAll(".recipe_ranking__list")
        if(recipe_lists === null){throw new Error("recipe list not found")}
        
        const ids_ = new Set<string>();
        recipe_lists.forEach((recipe)=>{
            recipe.querySelectorAll(".recipe_ranking__item").forEach((item)=>{
                const id_ = item.querySelector("a")
                if(id_ == null){throw new Error("id not found")}
                let id = id_.getAttribute("href")
                if(id == null){throw new Error("id not found")}
                id = id.split("/")[2]
                ids_.add(id)
            })
        })
        const ids = Array.from(ids_)
        const settled_res = await Promise.allSettled(ids.map(async (id)=>{return getService().get(id)}))
        const recipes: (RecipesType | null)[] = await Promise.all(settled_res.map(async (res)=>{
            if(res.status === "rejected"){return null }
            const recipe = res.value
            return {
                id: recipe.id,
                title: recipe.title,
                time: recipe.time,
                cost: recipe.cost,
                comment: recipe.comment
            }
        }))
        
        return { recipes: recipes.filter((recipe)=>recipe !== null) }
    }
}