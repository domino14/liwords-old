import * as types from '../constants/action_types';

const initialState = {
  height: 0,
  width: 0,
  fetchError: null,
};

const environment = (state = initialState, action) => {
  console.log('Environment reducer, state, action', state, action);
  switch (action.type) {
    case types.WINDOW_RESIZE:
      return {
        ...state,
        height: action.height,
        width: action.width,
      };

    case types.FETCH_ERROR:
      return {
        ...state,
        fetchError: action.message,
      };

    default:
      return state;
  }
};

export default environment;
