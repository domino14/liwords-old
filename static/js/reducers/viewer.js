import * as types from '../constants/action_types';

const initialState = {
  comments: [],
};

const viewer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOAD_COMMENTS:
      return {
        ...state,
        comments: action.comments,
      };
    default:
      return state;
  }
};

export default viewer;
