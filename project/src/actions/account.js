import axios from 'axios';
import { push } from 'react-router-redux';

import {
  START, SUCCESS, FAIL,
  COMPONENT_PAGE_CLEAN_MESSAGE,
  COMPONENT_PAGE_MESSAGE_ERROR,
  COMPONENT_PAGE_MESSAGE_SUCCESS,
  CHANGE_PASSWORD,
} from './constants';

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

export function changePassword(data) {
  const apiUrl = 'account/changePassword';

  return (dispatch, getState) => {
    dispatch({
      type: CHANGE_PASSWORD + START,
      payload: {
        data,
      },
    });

    const config = {
      headers: {
        Authorization: `Bearer ${getState().auth.token}`,
      },
    };

    return (axios.post(`${mainApi}${apiUrl}`, data, config)
      .then((response) => {
        dispatch({
          type: CHANGE_PASSWORD + SUCCESS,
          payload: { data },
          response: response.data[0],
        });
        dispatch(handleMessage('Ваш пароль успешно изменен'));
        // setTimeout(() => { dispatch(push('/auth/login')); }, 1000);
      })
      .catch(error => {
        dispatch({
          type: CHANGE_PASSWORD + FAIL,
          payload: { data, error },
        });
        const errorMessage = error.response.data[0].message;
        dispatch(handleError(errorMessage));
      }));
  };
}
