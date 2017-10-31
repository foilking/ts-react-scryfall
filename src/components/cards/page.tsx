import * as React from 'react';
import { Card, SearchTerms } from '../../model';
import { Header } from '../../components';
import { CardFullLayout } from '../../common/components/card';
import { SearchControls } from './searchControls';

interface Props {
    cards: Card[];
    fetchFilteredCards: (searchTerms: SearchTerms) => void;
    searchTerms: SearchTerms;
}

interface State {
    searchTerms: SearchTerms;
    cards: Card[];
}

interface PrintingProps {
    sets: string[];
}

export class CardsPage extends React.Component<Props, State>{
    constructor(props) {
        super(props);

        var searchTerms = {
            q: "bear"
        } as SearchTerms;

        this.state = {
            searchTerms: this.props.searchTerms || searchTerms,
            cards: []
        };
        this.fetchFilteredCards = this.fetchFilteredCards.bind(this);
    }

    public componentDidMount() {
        document.title = this.state.searchTerms ? this.state.searchTerms.q : "Search";
        this.props.fetchFilteredCards(this.state.searchTerms);
    }

    private fetchFilteredCards() {
        document.title = this.state.searchTerms ? this.state.searchTerms.q : "Search";
        this.props.fetchFilteredCards(this.state.searchTerms);
    }

    public render() {
        const {searchTerms} = this.state;
        const { fetchFilteredCards } = this.props;
        return (
            <div className="cardsPage">
                <Header keyword={searchTerms.q} fetchFilteredCards={fetchFilteredCards}/>
                <div id="main" className="main">
                    <SearchControls results={5} />
                    {/* <SearchControlsMobile /> */}
                    {this.props.cards.map(function(item, key) {
                        return (
                            <CardFullLayout card={item} key={key} />
                        )
                    })}
                    <SearchControls results={5} />
                    {/* <SearchControlsMobile /> */}
                </div>
            </div>
        )
    }
};


const onKeyUp = (props: Props, keyCode: number, value: string) => {
    if (keyCode === 13) {
        document.title = value;
        props.fetchFilteredCards({
            q: value
        } as SearchTerms);
    }
};