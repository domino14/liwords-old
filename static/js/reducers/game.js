import * as types from '../constants/action_types';
import { CrosswordGameDistribution } from '../constants/tile_distributions';
import { MoveTypesEnum } from '../constants/moves';


/* TODO: should be dependent on board dimensions in future.  */
function blankLayout() {
  return new Array(225).fill(' ');
}

function computeMoveIndexState(state, moveIndex) {
  let currentRack = '';

  if (state.turns[moveIndex + 1] &&
      state.turns[moveIndex + 1].type !== MoveTypesEnum.CHALLENGE_OFF &&
      state.turns[moveIndex + 1].type !== MoveTypesEnum.ENDGAME_POINTS) {
    currentRack = state.turns[moveIndex + 1].rack;
  }

  return {
    currentRack,

  };
}

const computeGameLoadState = (state) => {

  return {
    ...computeMoveIndexState(state, 0),

    layout: blankLayout(),
    currentUser: null,
    pool: {
      ...CrosswordGameDistribution,
    },
    turns: {},
    lastPlayerLetters: {},
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
        ...computeGameLoadState(state),
      };
    case types.GAME_FORWARD:
      return {
        ...state,
        ...computeMoveIndexState(state, state.moveIndex + 1),
        moveIndex: state.moveIndex + 1,
      };
    case types.GAME_BACKWARD:
      return {
        // moveIndex - 1, and so on.
      },



    default:
      // Must always define a default.
      return state;
  }
};


export default game;
