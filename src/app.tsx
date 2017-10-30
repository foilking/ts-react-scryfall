import * as React from 'react';

export const App: React.StatelessComponent<{}> = (props) => {
  return (
      <div id="body">
        {props.children}
    </div>
  );
}