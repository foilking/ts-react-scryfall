import _filter from 'lodash/filter';
import _orderBy from 'lodash/orderBy';
import _uniqBy from 'lodash/uniqBy';
import _capitalize from 'lodash/capitalize';
import { Card, CardsResponse, CardResponse, SearchTerms, Set, SetsResponse, CardSymbol } from '../../model';
import * as QueryString from 'query-string';
import {deserialize} from 'json-typescript-mapper';

const baseURL = 'https://api.scryfall.com';

interface SetSearchTerms {
    name: string;
    block: string;
}

const fetchFilteredCardsAsync = (params: SearchTerms): Promise<CardsResponse> => {
    // TODO: When the SearchTerms object gets more complicated, this will need to be replaced
    const queryString = QueryString.stringify(params);
    const cardsURL = `${baseURL}/cards/search?${queryString}`; //+include%3Aextras
    return fetch(cardsURL)
        .then((response) => (response.json()))
        .then(mapToCards);
};

const fetchCardByMultiverseIdAsync = (id: string): Promise<Card> => {
    const cardUrl = `${baseURL}/cards/multiverse/${id}`;

    return fetch(cardUrl)
        .then((response) => (response.json()))
        .then(mapToCard);
}

const fetchCardByCodeAndCollectorNumberAsync = (code: string, collector_number: string): Promise<Card> => {
    const cardUrl = `${baseURL}/cards/${code}/${collector_number}`;
    
    return fetch(cardUrl)
        .then((response) => (response.json()))
        .then(mapToCard);
}

const mapToCards = (response): CardsResponse => {
    const cards = response.data;
    const totalCards = response.total_cards;
    const hasMore = response.has_more;
    if (cards) {
        const mappedCards = cards.map(mapToCard);
        return {
            cards: mappedCards,
            has_more: response.has_more,
            total_cards: response.total_cards
        } as CardsResponse;
    }
    console.log(`${_capitalize(response.object)}: ${response.details}`);
    return null as CardsResponse;
};

const mapToCard = (card): Card => {
    if (card.object === "card") {
        return {
            object: card.object,
            id: card.id,
            multiverse_id: card.multiverse_id,
            multiverse_ids: card.multiverse_ids,
            mtgo_id: card.mtgo_id,
            name: card.name,
            uri: card.uri,
            scryfall_uri: card.scryfall_uri,
            layout: card.layout,
            highres_image: card.highres_image,
            image_uri: card.image_uri,
            image_uris: card.image_uris,
            cmc: card.cmc,
            type_line: card.type_line,
            oracle_text: card.oracle_text,
            mana_cost: card.mana_cost,
            loyalty: card.loyalty,
            colors: card.colors,
            color_indicator: card.color_indicator,
            color_identity: card.color_identity,
            legalities: card.legalities,
            reserved: card.reserved,
            reprint: card.reprint,
            set: card.set,
            set_name: card.set_name,
            set_uri: card.set_uri,
            set_search_uri: card.set_search_uri,
            scryfall_set_uri: card.scryfall_set_uri,
            prints_search_uri: card.prints_search_uri,
            collector_number: card.collector_number,
            digital: card.digital,
            rarity: _capitalize(card.rarity),
            artist: card.artist,
            frame: card.frame,
            full_art: card.full_art,
            border_color: card.border_color,
            timeshifted: card.timeshifted,
            colorshifted: card.colorshifted,
            futureshifted: card.futureshifted,
            usd: card.usd,
            tix: card.tix,
            eur: card.eur,
            related_uris: card.related_uris,
            purchase_uris: card.purchase_uris,
            power: card.power,
            toughness: card.toughness,
            flavor_text: card.flavor_text,
            edhrec_rank: card.edhrec_rank,
            card_faces: card.card_faces
        };
    }
    console.log(`${_capitalize(card.object)}: ${card.details}`);
    return null as Card;
};

const fetchCardSymbology = (): Promise<CardSymbol[]> => {
    const symbolUrl = `${baseURL}/symbology`;

    return fetch(symbolUrl)
        .then((response) => (response.json()))
        .then(mapToSymbols);
};

const mapToSymbols = (response): CardSymbol[] => {
    const symbols = response.data;
    if (symbols) {
        const mappedSymbols = symbols.map(mapToSymbol);
        return mappedSymbols;
    }
    console.log(`${_capitalize(response.object)}: ${response.details}`);
    return [];
};

const mapToSymbol = (symbol): CardSymbol => {
    return {
        object: symbol.object,
        symbol: symbol.symbol,
        loose_variant: symbol.loose_variant,
        english: symbol.english,
        transposable: symbol.transposable,
        represents_mana: symbol.represents_mana,
        appears_in_mana_costs: symbol.appears_in_mana_costs,
        cmc: symbol.cmc,
        funny: symbol.funny,
        colors: symbol.colors
    };
}

const fetchSetsAsync = (): Promise<Set[]> => {
    const setsURL = `${baseURL}/sets`;
    return fetch(setsURL)
        .then((response) => (response.json()))
        .then(mapResponseToSets);
}

const mapResponseToSets = (response: SetsResponse): Set[] => {
    const sets = response.sets;

    return sets.map(mapToSet);
}

const mapToSet = (set): Set => {
    return {
        code: set.code,
        name: set.name,
        type: set.type,
        border: set.border,
        mkm_id: set.mkm_id,
        releaseDate: set.releaseDate,
        magicCardsInfoCode: set.magicCardsInfoCode,
        gathererCode: set.gathererCode,
        block: set.block
    }
};

export const scryfall = {
    fetchFilteredCardsAsync,
    fetchCardByMultiverseIdAsync,
    fetchCardByCodeAndCollectorNumberAsync,
    fetchCardSymbology
};