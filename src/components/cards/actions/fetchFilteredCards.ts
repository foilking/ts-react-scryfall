import { actionTypes } from '../../../common/constants/actionTypes';
import { Card, SearchTerms, CardsResponse } from '../../../model';
import { scryfall } from '../../../api/scryfall';

export const fetchFilteredCardsAction = (params: SearchTerms) => (dispatch) => {
    scryfall.fetchFilteredCardsAsync(params)
        .then((cardsResponse) => {
            dispatch(fetchFilteredCardsCompleted(cardsResponse));
        });
};

const fetchFilteredCardsCompleted = (cardsResponse: CardsResponse) => ({
    type: actionTypes.FETCH_FILTERED_CARDS_COMPLETED,
    payload: cardsResponse,
});