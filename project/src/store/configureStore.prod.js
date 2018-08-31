import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import logger from '../middlewares/logger';

export default function (initialState = {}, env, routerMiddleware) {
  let store;

  if (env === 'browser') {
    store = createStore(
      rootReducer,
      initialState,
      applyMiddleware(thunk, routerMiddleware, logger),
    );
  } else {
    store = createStore(rootReducer, initialState, applyMiddleware(thunk, logger));
  }

  return store;
}
