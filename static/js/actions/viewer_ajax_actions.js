import * as types from '../constants/action_types';

import CrosswordsFetch from '../utils/api_utils';

export const uploadGCG = formData => (dispatch, getState) => {
  const cfetch = new CrosswordsFetch(getState().session.jwt, dispatch);

  cfetch.uploadwrap(formData)
    .then((result) => {
      const link = `${window.location.protocol}//${window.location.host}${result}`;
      dispatch({
        type: types.UPLOADED_GCG_LINK,
        link,
      });
    });
  // TODO catch error
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
