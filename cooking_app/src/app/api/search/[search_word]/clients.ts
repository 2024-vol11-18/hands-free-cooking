import "server-only"
import { SearchGetResponseType } from '../../apiType';

export interface ISearchClient{
    search(query: string): SearchGetResponseType,
}

export class OpenAISearchClient implements ISearchClient{
    search(query: string): SearchGetResponseType {
        throw new Error('Method not implemented.');
    }
}

export class RakutenRecipeScraipingSearchClient implements ISearchClient{
    search(query: string): SearchGetResponseType {
        throw new Error('Method not implemented.');
    }
}