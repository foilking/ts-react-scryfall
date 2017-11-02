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
        console.log("Set State First");
        
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
                    <SearchControls searchTerms={searchTerms} resultCount={cardsResult ? cardsResult.total_cards : 0} hasMore={cardsResult ? cardsResult.has_more : false} fetchFilteredCards={this.fetchFilteredCards} />
                    {/* <SearchControlsMobile /> */}
                </div>
            </div>
        )
    }
};