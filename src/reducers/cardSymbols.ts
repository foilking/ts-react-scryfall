import { actionTypes } from '../common/constants/actionTypes';
import { CardSymbol } from '../model';

export const cardSymbolsReducer = (state: CardSymbol[] = [], action) => {
    switch (action.type) {
        case actionTypes.FETCH_CARD_SYMBOLS_COMPLETED:
            return handleFetchCardSymbolsCompleted(state, action.payload);
    }
    return state;
}

const handleFetchCardSymbolsCompleted = (state: CardSymbol[], payload: CardSymbol[]) => {
    return payload;
}