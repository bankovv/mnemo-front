import { DeckResponse } from "./deck-response.dto";

export interface DecksPageResponse {
    content: DeckResponse[],
    pageNumber: number,
    pageSize: number
}