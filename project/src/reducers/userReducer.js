import {
  GET_DOMAINS,
  GET_LOGS,
  GET_CHANNELS,
  SUCCESS,
} from '../actions/constants';

const defautState = {
  email: '',
  id: null,
  domains: [],
  logs: [],
  channels: [],
};

export default (userState = defautState, action) => {
  const { type, response } = action;
  switch (type) {
    case GET_CHANNELS + SUCCESS:
      return { ...userState, channels: response };
    case GET_DOMAINS + SUCCESS:
      return { ...userState, domains: response };
    case GET_LOGS + SUCCESS:
      return { ...userState, logs: response[0].logs };
    default:
      return userState;
  }
};
