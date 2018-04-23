import { push } from 'react-router-redux';

import * as types from '../constants/action_types';


export const loadGame = payload => ({
  type: types.GAME_LOAD,
  payload,
});

export const gameViewerSeek = turnIdx => ({
  type: types.GAME_VIEWER_SEEK,
  turnIdx,
});

// export const gameViewerForward = () => (dispatch) => {
//   dispatch(push('/url'));
// };
