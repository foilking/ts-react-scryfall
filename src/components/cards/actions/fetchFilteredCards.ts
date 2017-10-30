import { actionTypes } from '../../../common/constants/actionTypes';
import { Card, SearchTerms } from '../../../model';
import { scryfall } from '../../../api/scryfall';

export const fetchFilteredCardsAction = (params: SearchTerms) => (dispatch) => {
    scryfall.fetchFilteredCardsAsync(params)
        .then((cards) => {
            dispatch(fetchFilteredCardsCompleted(cards));
        });
};

const fetchFilteredCardsCompleted = (cards: Card[]) => ({
    type: actionTypes.FETCH_FILTERED_CARDS_COMPLETED,
    payload: cards,
});