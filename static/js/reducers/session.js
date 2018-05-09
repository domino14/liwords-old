import * as types from '../constants/action_types';

const initialState = {
  jwt: null,
  username: null,
};

const session = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_USERNAME:
      return {
        ...state,
        username: action.username,
      };
    case types.LOGIN_TOKEN:
      return {
        ...state,
        jwt: action.token,
      };
    default:
      return state;
  }
};

export default session;
