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
    recipe_url: string = "https://recipe.rakuten.co.jp/recipe/"

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
        const ids = Array.from(ids_).slice(0, 6)
        
        const settled_res = await Promise.allSettled(ids.map((id)=>{
            return fetch(this.recipe_url + id)
            .then((res)=>{
                return res.text()
            })
            .then((text)=>{
                const dom = new JSDOM(text,{virtualConsole})

                const title_ = dom.window.document.querySelector(".page_title__text")
                if(title_ === null){throw new Error("title not found")}
                const title = title_.textContent
                if(title === null){throw new Error("title not found")}

                const time_ = dom.window.document.querySelector(".recipe_info__time")
                if(time_ === null){throw new Error("time not found")}
                let time = time_.textContent
                if(time === null){throw new Error("time not found")}
                time = deleteSpaceAndNewLine(time)

                const cost_ = dom.window.document.querySelector(".recipe_info__cost")
                if(cost_ === null){throw new Error("cost not found")}
                let cost = cost_.textContent
                if(cost === null){throw new Error("cost not found")}
                cost = deleteSpaceAndNewLine(cost)


                const comment_ = dom.window.document.querySelector(".recipe_info_user__comment")
                if(comment_ === null){throw new Error("comment not found")}
                const comment = comment_.textContent
                if(comment === null){throw new Error("comment not found")}

                return {
                    id: parseInt(id),
                    title: title,
                    time: time,
                    cost: cost,
                    comment: comment
                }
            })
        }))
        const recipes: (RecipesType | null)[] = settled_res.map((res)=>{
            if(res.status === "rejected"){return null }
            return res.value
        })
        
        return { recipes: recipes.filter((recipe)=>recipe !== null) }
    }
}

function deleteSpaceAndNewLine(str: string): string{
    return str.replace(/\s+/g, "").replace(/\n/g, "")
}