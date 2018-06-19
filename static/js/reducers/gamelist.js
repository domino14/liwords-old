import * as types from '../constants/action_types';

const initialState = {
  uploadedGCGLink: null, // The current GCG link displayed after uploading.
  gamesOnDisplay: [],
  totalGames: 0,
  gameListOffset: 0,
};

const gamelist = (state = initialState, action) => {
  switch (action.type) {
    case types.UPLOADED_GCG_LINK:
      return {
        ...state,
        uploadedGCGLink: action.link,
      };
    case types.GAME_LIST:
      return {
        ...state,
        gamesOnDisplay: action.payload.gamesOnDisplay,
        totalGames: action.payload.totalGames,
      };
    case types.GAME_LIST_OFFSET:
      return {
        ...state,
        gameListOffset: action.newOffset,
      };
    default:
      return state;
  }
};

export default gamelist;
