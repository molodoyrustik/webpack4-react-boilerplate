import {
  SUBMIT_LOGIN_DATA,
  SUBMIT_SIGNUP_DATA,
  SUBMIT_FORGOT_DATA,
  SUBMIT_FORGOT_PASSWORD_DATA,
  SUBMIT_RESET_DATA,
  TEST_TOKEN,
  GET_DOMAINS,
  LOGOUT,
  SUCCESS,
  FAIL,
} from '../actions/constants';

const defautState = {
  authenticated: false,
  token: null,
};

export default (authState = defautState, action) => {
  const { type, response } = action;

  switch (type) {
    case SUBMIT_LOGIN_DATA + SUCCESS:
      return {
        ...authState,
        authenticated: response.login,
        token: response.token,
      };
    case SUBMIT_LOGIN_DATA + FAIL:
      return {
        ...authState,
      };
    case SUBMIT_SIGNUP_DATA + SUCCESS:
      return {
        ...authState,
        authenticated: response.signup,
        token: response.token,
      };
    case SUBMIT_SIGNUP_DATA + FAIL:
      return {
        ...authState,
      };
    case SUBMIT_FORGOT_DATA + SUCCESS:
      return { ...authState };
    case SUBMIT_FORGOT_PASSWORD_DATA + SUCCESS:
      return { ...authState };
    case SUBMIT_RESET_DATA + SUCCESS:
      return { ...authState };
    case LOGOUT + SUCCESS:
      return { ...authState, authenticated: false, token: '' };
    case TEST_TOKEN + SUCCESS:
      return { ...authState, authenticated: response.validate, token: action.payload.token };
    case GET_DOMAINS + SUCCESS:
      return { ...authState, domains: [...response] };
    default:
      return authState;
  }
};
