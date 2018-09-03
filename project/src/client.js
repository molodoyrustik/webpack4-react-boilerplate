import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Cookies from 'js-cookie';

import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';

import history from './history';
import configureStore from './store';

import DevTools from './components/DevTools';

import routes from './routes';
import { testToken } from './actions';

const store = configureStore(window.REDUX_INITIAL_STATE, 'browser', routerMiddleware(history));

const token = Cookies.get('token');
store.dispatch(testToken(token)).then(() => {
  console.log('test token end');
});

class Client extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          {renderRoutes(routes)}
        </ConnectedRouter>
      </Provider>
    );
  }
}


// for ssr boilerplate
// ReactDOM.hydrate(Client, document.getElementById('react-view'));

if (process.env.NODE_ENV !== 'production') {
  ReactDOM.render(<DevTools store={store} />, document.getElementById('dev-tools'));
}

export default Client;
