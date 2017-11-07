import { actionTypes } from '../common/constants/actionTypes';
import { Set } from '../model';

export const setsReducer = (state: Set[] = null, action) => {
    switch (action.type) {
        case actionTypes.FETCH_FILTERED_SETS_COMPLETED:
            return handleFetchSetsCompleted(state, action.payload);
    }
    return state;
}

const handleFetchSetsCompleted = (state: Set[], payload: Set[]) => {
    return payload;
}