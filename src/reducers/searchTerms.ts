import { actionTypes } from '../common/constants/actionTypes';
import { SearchTerms } from '../model';

export const searchTermsReducer = (state: SearchTerms = null, action) => {
    switch (action.type) {
        case actionTypes.FETCH_FILTERED_CARDS_COMPLETED:
            return handleUpdateSearchTerms(state, action.payload);
    }
    return state;
}

const handleUpdateSearchTerms = (state: SearchTerms, payload: SearchTerms) => {
    return payload;
}