import { DeckModel } from "./deck.model";

export interface DecksPageModel {
    decks: DeckModel[],
    pageNumber: number,
    pageSize: number
}