import {
  COMPONENT_PAGE_SETTINGS,
  COMPONENT_PAGE_MESSAGE_ERROR, COMPONENT_PAGE_MESSAGE_SUCCESS,
  COMPONENT_PAGE_CLEAN_MESSAGE,
} from '../actions/constants';

const initialState = {};

export default (state = initialState, action) => {
  switch (action.type) {
    case COMPONENT_PAGE_MESSAGE_ERROR:
      return Object.assign({}, state, { message: action.message, messageType: 'error' });
    case COMPONENT_PAGE_MESSAGE_SUCCESS:
      return Object.assign({}, state, { message: action.message, messageType: 'success' });
    case COMPONENT_PAGE_CLEAN_MESSAGE:
      return Object.assign({}, state, { message: null, messageType: null });
    case COMPONENT_PAGE_SETTINGS:
      return Object.assign({}, state, { title: action.title, callback: action.callback });
    default:
      return state;
  }
};
