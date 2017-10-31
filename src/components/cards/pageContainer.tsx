import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../reducers';
import { SearchTerms } from '../../model';
import { fetchFilteredCardsAction } from './actions/fetchFilteredCards';
import { CardsPage } from './page';

const mapStateToProps = (state: State) => ({
    cards: state.cards
});

const mapDispatchToProps = (dispatch) => ({
    fetchFilteredCards: (params: SearchTerms) => dispatch(fetchFilteredCardsAction(params)),
});

export const CardsPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(CardsPage);