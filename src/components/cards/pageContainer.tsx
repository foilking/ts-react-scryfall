import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../reducers';
import { SearchTerms, SearchOrder } from '../../model';
import { fetchFilteredCardsAction } from '../../common/actions';
import { CardsPage } from './page';

const mapStateToProps = (state: State, ownProps: any) => {     
    return {
        cardsResult: state.cardsResult,
        location: ownProps.location,
        searchTerms: ownProps.q !== null ? 
            {
                q: ownProps.location.query.q
            } as SearchTerms : state.searchTerms,
    }
};

const mapDispatchToProps = (dispatch) => ({
    fetchFilteredCards: (params: SearchTerms) => dispatch(fetchFilteredCardsAction(params))
});

export const CardsPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(CardsPage);