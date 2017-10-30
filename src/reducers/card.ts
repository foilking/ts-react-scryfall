import { actionTypes } from '../common/constants/actionTypes';
import { Card } from '../model';

export const cardReducer = (state: Card = null, action) => {
    switch (action.type) {
        case actionTypes.FETCH_CARD_COMPLETED:
            return handleFetchCardCompleted(state, action.payload);
    }
    return state;
}

const handleFetchCardCompleted = (state: Card, payload: Card) => {
    return payload;
}