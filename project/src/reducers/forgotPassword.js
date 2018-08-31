import {
  SUBMIT_FORGOT_DATA,
  SUBMIT_FORGOT_PASSWORD_DATA,
  SUBMIT_RESET_DATA,
  LOGOUT,
  SUCCESS,
  START,
} from '../actions/constants';

const defautState = {
  forgot: false,
  tokenModel: {
    forgotEmailToken: '',
  },
};

export default (forgotPasswordState = defautState, action) => {
  const { type, response, payload } = action;

  switch (type) {
    case SUBMIT_FORGOT_DATA + SUCCESS:
      return { ...forgotPasswordState, forgot: response.forgot };
    case SUBMIT_FORGOT_PASSWORD_DATA + START:
      return {
        ...forgotPasswordState,
        forgot: true,
      };
    case SUBMIT_FORGOT_PASSWORD_DATA + SUCCESS:
      return {
        ...forgotPasswordState,
        forgot: response.checkForgotToken,
        tokenModel: { ...payload.data },
      };
    case SUBMIT_RESET_DATA + SUCCESS:
      return {
        ...forgotPasswordState,
        forgot: response.reset,
      };
    case LOGOUT + SUCCESS:
      return { ...forgotPasswordState };
    default:
      return forgotPasswordState;
  }
};
