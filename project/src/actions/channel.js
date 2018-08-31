import axios from 'axios';
import { push } from 'react-router-redux';

import {
  START, SUCCESS, FAIL,
  GET_CHANNELS,
  ADD_CHANNEL,
  DELETE_CHANNEL,
} from './constants';
import { handleMessage } from './index.js';

let mainApi = 'http://localhost:3001/api/v1/';

if (process.env.NODE_ENV === 'production') {
  mainApi = 'https://app.ashlie.io/api/v1/';
} else if (process.env.NODE_ENV === 'development') {
  mainApi = 'http://localhost:3001/api/v1/';
}

export function getChannels(data = {}) {
  const apiUrl = 'channels/';

  return (dispatch, getState) => {
    dispatch({
      type: GET_CHANNELS + START,
      payload: { data },
    });

    const config = {
      headers: {
        Authorization: `Bearer ${getState().auth.token}`,
      },
    };

    return (axios.get(`${mainApi}${apiUrl}`, config)
      .then((response) => {
        dispatch({
          type: GET_CHANNELS + SUCCESS,
          payload: { data },
          response: response.data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_CHANNELS + FAIL,
          payload: { data, error },
        });
      })
    );
  };
}

export function deleteChannel(data) {
  const apiUrl = 'channels/';

  return (dispatch, getState) => {
    dispatch({
      type: DELETE_CHANNEL + START,
      payload: { data },
    });

    const config = {
      headers: {
        Authorization: `Bearer ${getState().auth.token}`,
      },
    };

    return (axios.delete(`${mainApi}${apiUrl}/${data.id}`, config)
      .then((response) => {
        dispatch({
          type: DELETE_CHANNEL + SUCCESS,
          payload: { data },
          response: response.data[0],
        });

        dispatch(handleMessage('Канал успешно удален'));
        dispatch(getChannels());
      })
      .catch(error => {
        dispatch({
          type: DELETE_CHANNEL + FAIL,
          payload: { data, error },
        });
      })
    );
  };
}


export function addChannel(data) {
  const apiUrl = 'channels/';

  return (dispatch, getState) => {
    dispatch({
      type: ADD_CHANNEL + START,
      payload: { data },
    });

    const config = {
      headers: {
        Authorization: `Bearer ${getState().auth.token}`,
      },
    };

    return (axios.post(`${mainApi}${apiUrl}`, data, config)
      .then((response) => {
        dispatch({
          type: ADD_CHANNEL + SUCCESS,
          payload: { data },
          response: response.data[0],
        });

        dispatch(handleMessage('Канал успешно добавлен'));
        dispatch(getChannels());
        setTimeout(() => { dispatch(push('/dashboard/channels')); }, 500);
      })
      .catch(error => {
        dispatch({
          type: ADD_CHANNEL + FAIL,
          payload: { data, error },
        });
      })
    );
  };
}
