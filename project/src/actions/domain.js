import axios from 'axios';
import { push } from 'react-router-redux';

import {
  ADD_DOMAIN,
  GET_DOMAINS,
  EDIT_DOMAIN,
  DELETE_DOMAIN,
  GET_LOGS,
  START, SUCCESS, FAIL,
} from './constants';

import { handleMessage } from './index.js';

let mainApi = 'http://localhost:3001/api/v1/';

if (process.env.NODE_ENV === 'production') {
  mainApi = 'https://app.ashlie.io/api/v1/';
} else if (process.env.NODE_ENV === 'development') {
  mainApi = 'http://localhost:3001/api/v1/';
}

export function getDomains(data = {}) {
  const apiUrl = 'domains/';

  return (dispatch, getState) => {
    dispatch({
      type: GET_DOMAINS + START,
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
          type: GET_DOMAINS + SUCCESS,
          payload: { data },
          response: response.data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_DOMAINS + FAIL,
          payload: { data, error },
        });
      })
    );
  };
}

export function addDomain(data) {
  const apiUrl = 'domains/';

  return (dispatch, getState) => {
    dispatch({
      type: ADD_DOMAIN + START,
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
          type: ADD_DOMAIN + SUCCESS,
          payload: { data },
          response: response.data[0],
        });

        dispatch(getDomains());
        dispatch(push('/dashboard/domains'));
      })
      .catch(error => {
        dispatch({
          type: ADD_DOMAIN + FAIL,
          payload: { data, error },
        });
      })
    );
  };
}

export function editDomain(data) {
  const apiUrl = 'domains/';

  return (dispatch, getState) => {
    dispatch({
      type: EDIT_DOMAIN + START,
      payload: { data },
    });

    const config = {
      headers: {
        Authorization: `Bearer ${getState().auth.token}`,
      },
    };

    return (axios.put(`${mainApi}${apiUrl}`, data, config)
      .then((response) => {
        dispatch({
          type: EDIT_DOMAIN + SUCCESS,
          payload: { data },
          response: response.data[0],
        });

        dispatch(push('/dashboard/domains'));
      })
      .catch(error => {
        dispatch({
          type: EDIT_DOMAIN + FAIL,
          payload: { data, error },
        });
      })
    );
  };
}

export function deleteDomain(data) {
  const apiUrl = 'domains/';

  return (dispatch, getState) => {
    dispatch({
      type: DELETE_DOMAIN + START,
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
          type: DELETE_DOMAIN + SUCCESS,
          payload: { data },
          response: response.data[0],
        });

        dispatch(handleMessage('Домен успешно удален'));
        dispatch(getDomains());
      })
      .catch(error => {
        dispatch({
          type: DELETE_DOMAIN + FAIL,
          payload: { data, error },
        });
      })
    );
  };
}

export function getLogs(domainId) {
  const apiUrl = 'domains/';

  return (dispatch, getState) => {
    dispatch({
      type: GET_LOGS + START,
      payload: { domainId },
    });

    const config = {
      headers: {
        Authorization: `Bearer ${getState().auth.token}`,
      },
    };

    return (axios.get(`${mainApi}${apiUrl}${domainId}/logs`, config)
      .then((response) => {
        dispatch({
          type: GET_LOGS + SUCCESS,
          payload: { domainId },
          response: response.data,
        });
      })
      .catch(error => {
        dispatch({
          type: GET_LOGS + FAIL,
          payload: { domainId, error },
        });
      })
    );
  };
}
