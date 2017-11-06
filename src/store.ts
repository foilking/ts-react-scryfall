import { Store, createStore, compose, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { rootReducer, State } from './reducers';

let devtools: any = window['devToolsExtension'] ? window['devToolsExtension']() : (f:any)=>f;
let middleware = applyMiddleware(reduxThunk);
export const store: any = middleware(devtools(createStore))(rootReducer);