import { actionTypes } from '../common/constants/actionTypes';
import { CardsResponse } from '../model';

export const cardsReducer = (state: CardsResponse = null, action) => {
    switch (action.type) {
        case actionTypes.FETCH_FILTERED_CARDS_COMPLETED:
            return handleFetchFilteredCardsCompleted(state, action.payload);
    }
    return state;
}

const handleFetchFilteredCardsCompleted = (state: CardsResponse, payload: CardsResponse) => {
    return payload;
}