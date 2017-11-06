import * as React from 'react';
import { connect } from 'react-redux';
import { State } from '../../reducers';
import { SearchTerms, SearchOrder } from '../../model';
import { fetchFilteredCardsAction } from '../../common/actions';
import { AdvanceSearchPage } from './page';

const mapStateToProps = (state: State, ownProps: any) => ({
    location: ownProps.location
});

const mapDispatchToProps = (dispatch) => ({
    fetchFilteredCards: (params: SearchTerms) => dispatch(fetchFilteredCardsAction(params)),
});

export const AdvanceSearchPageContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
)(AdvanceSearchPage);