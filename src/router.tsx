import * as React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './store';
import { App } from './app';
import { CardsPageContainer, CardPageContainer, AdvanceSearchPageContainer, About } from './components';

export const AppRouter: React.StatelessComponent<{}> = () => {
  return (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App} >
          <IndexRoute component={CardsPageContainer} />
          <Route path="/cards" component={CardsPageContainer} />
          <Route path="/card/:code/:number" component={CardPageContainer} />
          <Route path="/advanced" component={AdvanceSearchPageContainer} />
          <Route path="/about" component={About} />
        </Route>
      </Router>
    </Provider>
  );
}