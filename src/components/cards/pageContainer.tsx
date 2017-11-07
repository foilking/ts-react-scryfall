import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../reducers';
import { SearchTerms, SearchOrder } from '../../model';
import { fetchFilteredCardsAction, updateSearchTermsAction } from '../../common/actions';
import { CardsPage } from './page';

const mapStateToProps = (state: State, ownProps: any) => {   
    return {
        cardsResult: state.cardsResult,
        location: ownProps.location,
        searchTerms: state.searchTerms,
        fetchFilteredCards: ownProps.fetchFilteredCards
    }
};

const mapDispatchToProps = (dispatch) => ({
});

export const CardsPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(CardsPage);