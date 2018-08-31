import axios from 'axios';
import { push } from 'react-router-redux';
import Cookies from 'js-cookie';

import {
  SUBMIT_LOGIN_DATA,
  SUBMIT_SIGNUP_DATA,
  SUBMIT_FORGOT_DATA,
  SUBMIT_FORGOT_PASSWORD_DATA,
  SUBMIT_RESET_DATA,
  TEST_TOKEN,
  LOGOUT,
  START, SUCCESS, FAIL,
  COMPONENT_PAGE_CLEAN_MESSAGE,
  COMPONENT_PAGE_MESSAGE_ERROR,
  COMPONENT_PAGE_MESSAGE_SUCCESS,
} from './constants';

import { getDomains } from './domain';
import { getChannels } from './channel';

let mainApi = 'http://localhost:3001/api/v1/';

if (process.env.NODE_ENV === 'production') {
  mainApi = 'https://app.ashlie.io/api/v1/';
} else if (process.env.NODE_ENV === 'development') {
  mainApi = 'http://localhost:3001/api/v1/';
}

export function handleError(message) {
  return (dispatch) => {
    dispatch({ type: COMPONENT_PAGE_MESSAGE_ERROR, message });
  };
}
export function cleanMessage() {
  return (dispatch) => {
    dispatch({ type: COMPONENT_PAGE_CLEAN_MESSAGE });
  };
}
export function handleMessage(message) {
  return (dispatch) => {
    dispatch({ type: COMPONENT_PAGE_MESSAGE_SUCCESS, message });
  };
}

export function signup(data, type) {
  const apiUrl = 'auth/signup';

  return (dispatch) => {
    dispatch({
      type: SUBMIT_SIGNUP_DATA + START,
      payload: { data },
    });

    return (axios.post(`${mainApi}${apiUrl}`, data)
      .then((response) => {
        const { token } = response.data[0];

        Cookies.set('token', `${token}`);
        dispatch({
          type: SUBMIT_SIGNUP_DATA + SUCCESS,
          payload: { data },
          response: response.data[0],
        });
        dispatch(getDomains());
        dispatch(getChannels());
        dispatch(push('/dashboard/domains'));
      })
      .catch(error => {
        dispatch({
          type: SUBMIT_SIGNUP_DATA + FAIL,
          payload: { data, error },
        });
        dispatch(handleError(error.response.data[0].message));
      })
    );
  };
}

export function login(data, type) {
  const apiUrl = 'auth/login';

  return (dispatch) => {
    dispatch({
      type: SUBMIT_LOGIN_DATA + START,
      payload: {
        data,
      },
    });

    return (axios.post(`${mainApi}${apiUrl}`, data)
      .then((response) => {
        const { token } = response.data[0];
        Cookies.set('token', `${token}`);

        dispatch({
          type: SUBMIT_LOGIN_DATA + SUCCESS,
          payload: { data },
          response: response.data[0],
        });
        dispatch(getDomains());
        dispatch(getChannels());
        dispatch(push('/dashboard/domains'));
      })
      .catch(error => {
        dispatch({
          type: SUBMIT_LOGIN_DATA + FAIL,
          payload: { data, error },
        });
        dispatch(handleError(error.response.data[0].message));
      }));
  };
}

export function forgot(data) {
  const apiUrl = 'auth/forgot';

  return (dispatch) => {
    dispatch({
      type: SUBMIT_FORGOT_DATA + START,
      payload: {
        data,
      },
    });

    return (axios.post(`${mainApi}${apiUrl}`, data)
      .then((response) => {
        dispatch({
          type: SUBMIT_FORGOT_DATA + SUCCESS,
          payload: { data },
          response: response.data[0],
        });
        dispatch(handleMessage('Вам на почту отправлено письмо, проверьте почту'));
      })
      .catch(error => {
        dispatch({
          type: SUBMIT_FORGOT_DATA + FAIL,
          payload: { data, error },
        });
      }));
  };
}

export function checkForgotToken(data) {
  const apiUrl = 'auth/forgot';

  return (dispatch) => {
    dispatch({
      type: SUBMIT_FORGOT_PASSWORD_DATA + START,
      payload: {
        data,
      },
    });

    return (axios.get(`${mainApi}${apiUrl}/${data.forgotEmailToken}`)
      .then((response) => {
        dispatch({
          type: SUBMIT_FORGOT_PASSWORD_DATA + SUCCESS,
          payload: { data },
          response: response.data[0],
        });
        if (response.data[0].checkForgotToken) {
          dispatch(push('/auth/reset'));
        }
      })
      .catch(error => {
        dispatch({
          type: SUBMIT_FORGOT_DATA + FAIL,
          payload: { data, error },
        });
      }));
  };
}

export function reset(data) {
  const apiUrl = 'auth/reset';

  return (dispatch, getState) => {
    dispatch({
      type: SUBMIT_RESET_DATA + START,
      payload: {
        data,
      },
    });

    return (axios.post(`${mainApi}${apiUrl}`, data)
      .then((response) => {
        dispatch({
          type: SUBMIT_RESET_DATA + SUCCESS,
          payload: { data },
          response: response.data[0],
        });
        dispatch(handleMessage('Ваш пароль успешно изменен'));
        setTimeout(() => { dispatch(push('/auth/login')); }, 1000);
      })
      .catch(error => {
        dispatch({
          type: SUBMIT_RESET_DATA + FAIL,
          payload: { data, error },
        });
      }));
  };
}

export function logout() {
  return (dispatch) => {
    Cookies.remove('token');

    dispatch({
      type: LOGOUT + SUCCESS,
      payload: {},
    });

    return dispatch(push('/auth/login'));
  };
}


export function testToken(cookieToken) {
  return (dispatch, getState) => {
    const token = cookieToken || '';
    dispatch({
      type: TEST_TOKEN + START,
      payload: { token },
    });

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    return (
      axios.post(`${mainApi}auth/validate`, {}, config)
        .then((response) => {
          dispatch({
            type: TEST_TOKEN + SUCCESS,
            payload: { token },
            response: response.data[0],
          });

          dispatch(getDomains());
          dispatch(getChannels());
        })
        .catch(error => {
          dispatch({
            type: TEST_TOKEN + FAIL,
            payload: { token },
            error,
          });
        })
    );
  };
}
