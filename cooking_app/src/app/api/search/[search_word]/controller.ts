import "server-only"
import { ISearchClient, RakutenRecipeScraipingSearchClient } from './clients'

export function getService(): ISearchClient {
    return new RakutenRecipeScraipingSearchClient()
}