import * as React from 'react';
import { CardsResponse, SearchTerms, SearchOrder } from '../../model';
import { Header } from '../../components';
import { CardFullLayout } from '../../common/components/card';
import { SearchControls } from './searchControls';

interface Props {
    cardsResult: CardsResponse;
    fetchFilteredCards: (searchTerms: SearchTerms) => void;
    location: Location;
}

interface State {
    searchTerms: SearchTerms;
}

export class CardsPage extends React.Component<Props, State>{
    constructor(props) {
        super(props);
        var searchTerms = {
            q: "reaper",
            order: SearchOrder.Name,
            page: 1
        } as SearchTerms;

        this.state = {
            searchTerms: searchTerms
        };
        this.fetchFilteredCards = this.fetchFilteredCards.bind(this);
    }

    public componentDidMount() {
        document.title = this.state.searchTerms.q || "Search";
        this.props.fetchFilteredCards(this.state.searchTerms);
    }

    private fetchFilteredCards(searchTerms: SearchTerms) {        
        this.setState({
            searchTerms: searchTerms
        });
        this.props.fetchFilteredCards(searchTerms);
    }

    public render() {
        const { searchTerms } = this.state;
        const { cardsResult } = this.props;
        
        return (
            <div className="cardsPage">
                <Header searchTerms={searchTerms} fetchFilteredCards={this.fetchFilteredCards} location={location}/>
                <div id="main" className="main">
                    <SearchControls searchTerms={searchTerms} resultCount={cardsResult ? cardsResult.total_cards : 0} hasMore={cardsResult ? cardsResult.has_more : false} fetchFilteredCards={this.fetchFilteredCards} />
                    {/* <SearchControlsMobile /> */}
                    {cardsResult && cardsResult.cards.map(function(item, key) {
                        return (
                            <CardFullLayout card={item} key={key} />
                        )
                    })}
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
                                <a className="button-primary" href="/docs/reference">Syntax Guide</a>
                                <a className="button-primary" href="/advanced">Advanced Search</a>
                            </p>
                            </div>
                        </div>
                    }
                    <SearchControls searchTerms={searchTerms} resultCount={cardsResult ? cardsResult.total_cards : 0} hasMore={cardsResult ? cardsResult.has_more : false} fetchFilteredCards={this.fetchFilteredCards} />
                    {/* <SearchControlsMobile /> */}
                </div>
            </div>
        )
    }
};