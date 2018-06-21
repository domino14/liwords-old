import * as types from '../constants/action_types';

import CrosswordsFetch from '../utils/api_utils';

export const GAME_LIST_LIMIT = 15;

function handleFetchError(dispatch, error) {
  dispatch({
    type: types.FETCH_ERROR,
    message: error.message,
  });
}

export const uploadGCG = formData => (dispatch, getState) => {
  const cfetch = new CrosswordsFetch(getState().session.jwt, dispatch);

  cfetch.uploadwrap(formData)
    .then((result) => {
      const link = `${window.location.protocol}//${window.location.host}${result}`;
      dispatch({
        type: types.UPLOADED_GCG_LINK,
        link,
      });
    })
    .catch((error) => {
      console.log('handling a fetch error', error);
      handleFetchError(dispatch, error);
    });
};

// Functions below here do not require a JWT; they are mostly GETs and
// the like.
export const requestComments = gameID => (dispatch) => {
  const cfetch = new CrosswordsFetch();
  cfetch.restwrap('/crosswords/api/comments', 'GET', {
    game_id: gameID,
  })
    .then((result) => {
      dispatch({
        type: types.LOAD_COMMENTS,
        comments: result.data,
      });
    });
  // TODO Catch error
  // .catch((error) => )
};

export const fetchGameList = offset => (dispatch) => {
  const cfetch = new CrosswordsFetch();
  cfetch.restwrap('/crosswords/api/games', 'GET', {
    limit: GAME_LIST_LIMIT,
    offset,
  })
    .then((result) => {
      dispatch({
        type: types.GAME_LIST,
        payload: {
          gamesOnDisplay: result.data,
          totalGames: result.total_games,
        },
      });
    });
  // TODO catch error.
};

export const fetchPreviousGames = () => (dispatch, getState) => {
  const newOffset = getState().gamelist.gameListOffset + GAME_LIST_LIMIT;
  fetchGameList(newOffset)(dispatch);
  dispatch({
    type: types.GAME_LIST_OFFSET,
    newOffset,
  });
};

export const fetchNextGames = () => (dispatch, getState) => {
  const newOffset = Math.max(
    getState().gamelist.gameListOffset - GAME_LIST_LIMIT,
    0,
  );
  fetchGameList(newOffset)(dispatch);
  dispatch({
    type: types.GAME_LIST_OFFSET,
    newOffset,
  });
};
