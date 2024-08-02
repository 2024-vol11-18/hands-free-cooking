import "server-only"
import { IGetClient, RakutenRecipeScrapingGetClient } from './clients'

export function getService(): IGetClient {
    return new RakutenRecipeScrapingGetClient()
}