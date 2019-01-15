import ActionTypes from '../action-types';

/**
 * infoResponsesReducer
 */
const infoResponsesReducer = (state = {}, action) => {
  switch (action.type) {
    case ActionTypes.REQUEST_INFO_RESPONSE:
      return Object.assign({}, state, {
        [action.infoId]: {
          isFetching: true
        }
      });
    case ActionTypes.RECEIVE_INFO_RESPONSE:
      return Object.assign({}, state, {
        [action.infoId]: {
          json: action.infoJson,
          isFetching: false
        }
      });
    case ActionTypes.RECEIVE_INFO_RESPONSE_FAILURE:
      return Object.assign({}, state, {
        [action.infoId]: {
          error: action.error,
          isFetching: false
        }
      });
    case ActionTypes.REMOVE_INFO_RESPONSE:
      return Object.keys(state).reduce((object, key) => {
        if (key !== action.infoId) {
          object[key] = state[key]; // eslint-disable-line no-param-reassign
        }
        return object;
      }, {});
    default:
      return state;
  }
};

export default infoResponsesReducer;
