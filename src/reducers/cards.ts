import { actionTypes } from '../common/constants/actionTypes';
import { Card, SearchTerms } from '../model';

export const cardsReducer = (state: Card[] = [], action) => {
    switch (action.type) {
        case actionTypes.FETCH_FILTERED_CARDS_COMPLETED:
            return handleFetchFilteredCardsCompleted(state, action.payload);
    }
    return state;
}

const handleFetchFilteredCardsCompleted = (state: Card[], payload: Card[]) => {
    return payload;
}