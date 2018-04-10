import * as types from '../constants/action_types';

export const loadGame = payload => ({
  type: types.GAME_LOAD,
  payload,
});

export const gameViewerForward = () => ({
  type: types.GAME_FORWARD,
});

export const gameViewerBackward = () => ({
  type: types.GAME_BACKWARD,
});

export const gameViewerFastForward = () => ({
  type: types.GAME_FAST_FORWARD,
});

export const gameViewerFastBackward = () => ({
  type: types.GAME_FAST_BACKWARD,
});

export const gameViewerSeek = turnIdx => ({
  type: types.GAME_VIEWER_SEEK,
  turnIdx,
});
