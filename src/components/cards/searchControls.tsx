import * as React from 'react';
import { SearchTerms, SearchOrder } from '../../model';

enum SearchOrderFormat {
    Name = "Name",
    Set= "Set/Number",
    Tix= "Price: Tix",
    Usd= "Price: USD",
    Eur = "Price: EUR",
    CMC = "CMC",
    Pow = "Power",
    Tou = "Toughness",
    Rarity = "Rarity",
    Color = "Color/ID",
    EDHRec = "EDHREC Rank"
}

interface SortProps {
    searchTerms: SearchTerms;
    resultCount: number;
    hasMore: boolean;
    fetchFilteredCards: (searchTerms: SearchTerms) => void;
}

interface SortState {
}

export class SearchControls extends React.Component<SortProps, SortState> {
    constructor(props) {  
        super(props);
        this.orderChange = this.orderChange.bind(this);
        this.updatePage = this.updatePage.bind(this);
    }

    private orderChange (order: SearchOrder) {        
        const newSearchTerms = {...this.props.searchTerms, order};
        this.props.fetchFilteredCards(newSearchTerms);
    }

    private updatePage (page: number) {
        const newSearchTerms = {...this.props.searchTerms, page};
        this.props.fetchFilteredCards(newSearchTerms);
    }

    public render() {
        const { resultCount, fetchFilteredCards, searchTerms, hasMore } = this.props;
        let cardsShown = '';
        if (hasMore) {
            cardsShown = `${(searchTerms.page - 1) * 175 + 1} - ${searchTerms.page * 175} of ${resultCount.toLocaleString()}`;
        } else {
            cardsShown = resultCount.toString();
        }
        return (
            <div className="search-controls">
                <div className="inner-flex">

                    <div className="search-controls-options" data-component="search-controls-form">
                        {cardsShown} cards
                        <label htmlFor="as">as</label>
                        <select name="as" id="as" className="button-select mq-short" defaultValue="full">
                            <option value="">Images</option>
                            <option value="checklist">Pricelist</option>
                            <option value="full">Full</option>
                        </select>

                        <a className="button-conjoined-left button-icon-left js-search-as mq-wide" href="/search?q=">Images</a>        
                        <a className="button-conjoined-middle button-icon-left js-search-as mq-wide" href="/search?as=checklist&amp;q=">Pricelist</a>        
                        <a className="button-conjoined-right button-icon-left js-search-as mq-wide checked" href="/search?as=full&amp;q=">
                            <svg aria-hidden="true" focusable="false" className="" width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"><path d="M15 0c-8.284 0-15 6.716-15 15s6.716 15 15 15 15-6.716 15-15-6.716-15-15-15zm0 28c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13zm-3-8.906l-4.562-5.094-1.438 1.375 6 6.625 12-12.562-1.406-1.438-10.594 11.094z"></path></svg>
                            Full
                        </a>
                        <label htmlFor="order">sorted by</label>
                        <select name="order" id="order" className="button-select js-search-option" data-other-param="as" data-other-param-value="full" onChange={event => this.orderChange(event.currentTarget.value as SearchOrder)} value={searchTerms.order}>
                            {Object.keys(SearchOrder).filter(key => isNaN(Number(SearchOrder[key]))).map((key, keyIndex) => {
                                return (
                                    <option value={SearchOrder[key]} key={key}>{SearchOrderFormat[key]}</option>
                                );
                            })}
                        </select>
                    </div>

                    <div className="search-controls-pagination">
                        <span aria-hidden="true" className={`${searchTerms.page > 1 ? "button-primary" : "button-disabled"} button-icon-center`} onClick={event => this.updatePage(1)}>
                            <svg aria-hidden="true" focusable="false" className="" width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"><path d="M18 4.438l-1.375-1.438-12.625 12 12.563 12 1.437-1.406-11.094-10.594 11.094-10.562zm12 0l-1.375-1.438-12.625 12 12.563 12 1.437-1.406-11.094-10.594 11.094-10.562zM2 3h-1.66v24h1.66z"></path></svg>                    
                            <span className="vh">First Page</span>
                        </span>        
                        <span aria-hidden="true" className={`${searchTerms.page > 1 ? "button-primary" : "button-disabled"} button-icon-left`} onClick={event => this.updatePage(searchTerms.page - 1)}>
                            <svg aria-hidden="true" focusable="false" className="" width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"><path d="M20.625 3l-12.625 12 12.563 12 1.437-1.406-11.094-10.594 11.094-10.562z"></path></svg>
                            Previous
                        </span>
                        <span aria-hidden="true" className={`${hasMore ? "button-primary" : "button-disabled"}`} onClick={event => this.updatePage(searchTerms.page + 1)}>
                            Next 20
                            <svg aria-hidden="true" focusable="false" className="" width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"><path d="M9.375 3l12.625 12-12.562 12-1.438-1.406 11.094-10.594-11.094-10.562z"></path></svg>
                        </span>        
                        <span aria-hidden="true" className={`${hasMore ? "button-primary" : "button-disabled"} button-icon-center`} data-track="{&quot;category&quot;:&quot;Search Controls&quot;,&quot;action&quot;:&quot;Paginate&quot;,&quot;label&quot;:&quot;Last&quot;}">
                            <svg aria-hidden="true" focusable="false" className="" width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg"><path d="M12 4.438l1.375-1.438 12.625 12-12.563 12-1.437-1.406 11.094-10.594-11.094-10.562zm-12 0l1.375-1.438 12.625 12-12.563 12-1.437-1.406 11.094-10.594-11.094-10.562zM28 3h1.66v24h-1.66z"></path></svg>
                            <span className="vh">Last Page</span>
                        </span>
                    </div>

                </div>
            </div>
        );
    }
}