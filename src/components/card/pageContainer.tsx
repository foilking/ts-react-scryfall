import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../reducers';
import { SearchTerms } from '../../model';
import { fetchCardByCodeAndCollectorNumberAsyncAction } from './actions/fetchCard';
import { fetchFilteredCardsAction } from './actions/fetchFilteredCards';
import { CardPage } from './page';

const mapStateToProps = (state: State, ownProps: any) => ({
    setCode: ownProps.params.code,
    collectorNumber: ownProps.params.number,
    location: ownProps.location,
    card: state.card,
});

const mapDispatchToProps = (dispatch) => ({
    fetchCardByCodeAndCollectorNumber: (setCode: string, collectorNumber: string) => dispatch(fetchCardByCodeAndCollectorNumberAsyncAction(setCode, collectorNumber)),
    fetchFilteredCards: (params: SearchTerms) => dispatch(fetchFilteredCardsAction(params))
});

export const CardPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CardPage);