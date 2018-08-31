import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authReducer from './authReducer';
import forgotPassword from './forgotPassword';
import validationReducer from './validationReducer';
import userReducer from './userReducer';

export default combineReducers({
  router: routerReducer,
  auth: authReducer,
  forgot: forgotPassword,
  page: validationReducer,
  user: userReducer,
});
