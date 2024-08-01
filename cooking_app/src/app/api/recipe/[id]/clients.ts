import "server-only"
import { RecipeGetResponseType } from '../../apiType';
import jsdom, {JSDOM} from 'jsdom';
export interface IGetClient{
    get(id: string): Promise<RecipeGetResponseType>,
}

export class OpenAIGetClient implements IGetClient{
    get(id: string): Promise<RecipeGetResponseType> {
        throw new Error('Method not implemented.');
    }
}

export class RakutenRecipeScrapingGetClient implements IGetClient{
    base_url: string = "https://recipe.rakuten.co.jp/recipe/"

    async get(id: string): Promise<RecipeGetResponseType> {
        const res = await fetch(this.base_url + id)
        const virtualConsole = new jsdom.VirtualConsole();
        virtualConsole.on("error", () => {});
        const dom = new JSDOM(await res.text(),{virtualConsole})

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

        const materials_ = dom.window.document.querySelectorAll(".recipe_material__list > li")
        if(materials_ === null){throw new Error("materials not found")}

        const materials = new Array<{item: string, serving: string}>()
        materials_.forEach((material)=>{
            console.log(material.className)
            let item = material.querySelector(".recipe_material__item_name > a")
            if(item === null){
                item = material.querySelector(".recipe_material__item_name")
            }
            if(item === null){throw new Error("item not found")}

            const serving = material.querySelector(".recipe_material__item_serving")
            if(serving === null){throw new Error("serving not found")}
            materials.push({
                item: item.textContent == null ? "" : item.textContent,
                serving: serving.textContent == null ? "" : serving.textContent
            })
        })

        const howto_ = dom.window.document.querySelectorAll(".recipe_howto__list > li")
        if(howto_ === null){throw new Error("howto not found")}
        
        const howto = new Array<{order: number, text: string}>()
        howto_.forEach((howto_item)=>{
            const order = howto_item.querySelector(".recipe_howto__order > span")
            if(order === null){throw new Error("howto_item not found")}

            const text = howto_item.querySelector(".recipe_howto__text")
            if(text === null){throw new Error("text not found")}
            howto.push({
                order: order.textContent == null ? -1 : parseInt(order.textContent),
                text: text.textContent == null ? "" : text.textContent,
            })
        })
        return {
            id: parseInt(id),
            title: title,
            time: time,
            cost: cost,
            comment: comment,
            materials: materials,
            howto: howto,
        }
    }
}

function deleteSpaceAndNewLine(str: string): string{
    return str.replace(/\s+/g, "").replace(/\n/g, "")
}