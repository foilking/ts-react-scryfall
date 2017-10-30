import { combineReducers } from 'redux';
import { MemberEntity, MemberErrors, Card, SearchTerms, Set } from '../model';
import { membersReducer } from './members';
import { memberReducer } from './member';
import { memberErrorsReducer } from './memberErrors';
import { cardsReducer } from './cards';
import { cardReducer } from './card';

export interface State {
  members: MemberEntity[];
  member: MemberEntity;
  memberErrors: MemberErrors;
  cards: Card[];
  card: Card;
  sets: Set[];
};

export const state = combineReducers<State>({
  members: membersReducer,
  member: memberReducer,
  memberErrors: memberErrorsReducer,
  cards: cardsReducer,
  card: cardReducer
});