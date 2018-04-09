import * as types from '../constants/action_types';

export const loadGame = payload => ({
  type: types.GAME_LOAD,
  payload,
});

export const gameForward = () => ({
  type: types.GAME_FORWARD,
});

export const gameBackward = () => ({
  type: types.GAME_BACKWARD,
});

export const gameFastForward = () => ({
  type: types.GAME_FAST_FORWARD,
});

export const gameFastBackward = () => ({
  type: types.GAME_FAST_BACKWARD,
});
