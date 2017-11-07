import * as React from 'react';
import { browserHistory } from 'react-router';
import { Header, Footer } from './components';
import { fetchFilteredCardsAction } from './common/actions';
import { SearchTerms, SearchOrder } from './model';

interface Props {
  children: any,
  searchTerms: SearchTerms,
  fetchFilteredCards: (searchTerms: SearchTerms) => void;
  updateSearchTerms: (searchTerms: SearchTerms) => void;
}
interface State {
  searchTerms: SearchTerms
}

export class App extends React.Component<Props, State>{
  constructor(props) {
    super(props);
    const searchTerms = {
        q: "",
        order: SearchOrder.Name,
        page: 1
    } as SearchTerms;

    this.state = {
      searchTerms: this.props.searchTerms || searchTerms
    };
      
    if (location.pathname === "/cards") {
      document.title = this.state.searchTerms.q || "Search";
      this.props.fetchFilteredCards(this.state.searchTerms);
      this.props.updateSearchTerms(this.state.searchTerms);
    }

    this.fetchFilteredCards = this.fetchFilteredCards.bind(this);
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

  public render() { 
    const {children} = this.props;
    const { searchTerms } = this.state;
    return (
        <div id="body">
          <Header searchTerms={searchTerms} fetchFilteredCards={this.fetchFilteredCards} location={location}/>
          {React.cloneElement(this.props.children, { fetchFilteredCards: this.fetchFilteredCards })}
          <Footer />
      </div>
    );
  }
};