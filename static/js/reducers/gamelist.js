import * as types from '../constants/action_types';

const initialState = {
  uploadedGCGLink: null, // The current GCG link displayed after uploading.
  gamesOnDisplay: [],
  numPossibleGamesOnDisplay: 0,
  gameListOffset: 0,
};

const gamelist = (state = initialState, action) => {
  switch (action.type) {
    case types.UPLOADED_GCG_LINK:
      return {
        ...state,
        uploadedGCGLink: action.link,
      };
    default:
      return state;
  }
};

export default gamelist;
