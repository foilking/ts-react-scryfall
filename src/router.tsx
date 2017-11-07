import * as React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './store';
import { AppContainer } from './appContainer';
import { CardsPageContainer, CardPageContainer, AdvanceSearchPageContainer, About, Reference, SetsPageContainer } from './components';

export const AppRouter: React.StatelessComponent<{}> = () => {
  return (
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={AppContainer} >
          <Route path="/cards" component={CardsPageContainer} />
          <Route path="/card/:code/:number" component={CardPageContainer} />
          <Route path="/advanced" component={AdvanceSearchPageContainer} />
          <Route path="/about" component={About} />
          <Route path="/reference" component={Reference} />
          <Route path="/sets" component={SetsPageContainer} />
        </Route>
      </Router>
    </Provider>
  );
}