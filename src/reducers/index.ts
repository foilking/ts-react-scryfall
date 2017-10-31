import { combineReducers } from 'redux';
import { MemberEntity, MemberErrors, Card, SearchTerms, Set, CardSymbol } from '../model';
import { membersReducer } from './members';
import { memberReducer } from './member';
import { memberErrorsReducer } from './memberErrors';
import { cardsReducer } from './cards';
import { cardReducer } from './card';
import { cardSymbolsReducer } from './cardSymbols';

export interface State {
  members: MemberEntity[];
  member: MemberEntity;
  memberErrors: MemberErrors;
  cards: Card[];
  card: Card;
  sets: Set[];
  cardSymbols: CardSymbol[];
};

export const state = combineReducers<State>({
  members: membersReducer,
  member: memberReducer,
  memberErrors: memberErrorsReducer,
  cards: cardsReducer,
  card: cardReducer,
  cardSymbols: cardSymbolsReducer
});