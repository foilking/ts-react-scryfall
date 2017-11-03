import * as React from 'react';
import { Footer } from './components';

export const App: React.StatelessComponent<{}> = (props) => {
  return (
      <div id="body">
        {props.children}
        <Footer />
    </div>
  );
}