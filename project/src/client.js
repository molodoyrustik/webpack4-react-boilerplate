import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';

import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';

import routes from './routes';

class Client extends Component {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          {renderRoutes(routes)}
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default Client;
