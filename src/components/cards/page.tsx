import * as React from 'react';
import { browserHistory } from 'react-router';
import { CardsResponse, SearchTerms, SearchOrder } from '../../model';
import { Header } from '../../components';
import { CardDisplay } from '../../common/components/card';
import { CardFormat } from '../../common/constants/cardFormats';
import { SearchControls } from './searchControls';

interface Props {
    cardsResult: CardsResponse;
    searchTerms: SearchTerms;
    fetchFilteredCards: (searchTerms: SearchTerms) => void;
    location: Location;
    updateSearchTerms: (searchTerms: SearchTerms) => void;
}

interface State {
    searchTerms: SearchTerms;
    cardFormat: CardFormat;
}

export class CardsPage extends React.Component<Props, State>{
    constructor(props) {
        super(props);       

        var searchTerms = {
            q: "",
            order: SearchOrder.Name,
            page: 1
        } as SearchTerms;

        this.state = {
            searchTerms: this.props.searchTerms || searchTerms,
            cardFormat: CardFormat.Full
        };

        document.title = this.state.searchTerms.q || "Search";
        this.props.fetchFilteredCards(this.state.searchTerms);
        this.props.updateSearchTerms(this.state.searchTerms);

        this.fetchFilteredCards = this.fetchFilteredCards.bind(this);
        this.changeListDisplay = this.changeListDisplay.bind(this);
    }

    private fetchFilteredCards(searchTerms: SearchTerms) {
        const newState = {...this.state, searchTerms};    
        const location = Object.assign({}, browserHistory.getCurrentLocation());

        Object.assign(location.query, searchTerms);
        browserHistory.push(location);
        this.setState(newState);
        this.props.fetchFilteredCards(searchTerms);
        this.props.updateSearchTerms(searchTerms);
    }

    private changeListDisplay(cardFormat: CardFormat) {
        const newState = {...this.state, cardFormat};
        this.setState(newState);
    }

    public render() {
        const { searchTerms, cardFormat } = this.state;
        const { cardsResult } = this.props;
        
        return (
            <div className="cardsPage">
                <Header searchTerms={searchTerms} fetchFilteredCards={this.fetchFilteredCards} location={location}/>
                <div id="main" className="main">
                    <SearchControls searchTerms={searchTerms} cardFormat={cardFormat} resultCount={cardsResult ? cardsResult.total_cards : 0} hasMore={cardsResult ? cardsResult.has_more : false} fetchFilteredCards={this.fetchFilteredCards} changeListDisplay={this.changeListDisplay} />
                    {/* <SearchControlsMobile /> */}
                    {cardsResult &&
                        <CardDisplay cards={cardsResult.cards} cardFormat={cardFormat}/>
                    }
                    {!cardsResult && 
                        <div className="search-empty">
                            <div className="inner-flex">
                            <svg aria-hidden="true" focusable="false" className="search-empty-status" width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"><path d="M5 0v20l10 10 10-10v-20h-20zm18 19.172l-8 8-8-8v-17.172h16v17.172zm-3-11.172h-10v2h10v-2z"></path></svg>

                            <h1>No cards found</h1>
                            <p>
                                Your search didn’t find any cards.
                                Adjust your terms or try one of the links below:
                            </p>
                            <p>
                                <a className="button-primary js-back-link" href="/">Go Back</a>
                                <a className="button-primary" href="/reference">Syntax Guide</a>
                                <a className="button-primary" href="/advanced">Advanced Search</a>
                            </p>
                            </div>
                        </div>
                    }
                    {cardsResult && cardsResult.total_cards > 9 &&
                        <SearchControls searchTerms={searchTerms} cardFormat={cardFormat} resultCount={cardsResult ? cardsResult.total_cards : 0} hasMore={cardsResult ? cardsResult.has_more : false} fetchFilteredCards={this.fetchFilteredCards} changeListDisplay={this.changeListDisplay} />
                    }
                </div>
            </div>
        )
    }
};