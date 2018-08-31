import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Client from './client';

// class Client extends Component {
//   render() {
//     return <h1>Hello world!!!!</h1>;
//   }
// }

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>,
    document.getElementById('root'),
  );
};

render(Client);

if (module.hot) {
  module.hot.accept();
}
