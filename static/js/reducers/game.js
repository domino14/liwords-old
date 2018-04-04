import * as types from '../constants/action_types';

const computeHelperState = (state) => {
  // This should be the meat of that board_state.js class, basically.
  console.log('Computing helper state from ', state);
  return {
    foo: 'bar',
  };
};

const initialState = {
  players: [],
  version: null,
  turns: [],
};

const game = (state = initialState, action) => {
  console.log('Game reducer, state, action', state, action);
  switch (action.type) {
    case types.GAME_LOAD:
      console.log('um here, game load called');
      return {
        ...state,
        ...computeHelperState(state),
      };

    default:
      // Must always define a default.
      return state;
  }
};


export default game;
