import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {AppRouter} from './router';

const App = () => (
    <AppRouter />            
);

ReactDOM.render(
    <App />,
    document.getElementById('root')
);