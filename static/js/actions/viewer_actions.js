import * as types from '../constants/action_types';

import CrosswordsFetch from '../utils/api_utils';

export const uploadGCG = formData => (dispatch) => {
  const cfetch = new CrosswordsFetch();

  cfetch.uploadwrap(formData)
    .then((result) => {
      const link = `${window.location.protocol}//${window.location.host}${result}`;
      dispatch({
        type: types.UPLOAD_GCG_RESULT,
        link,
      });
    });
  // TODO catch error
};

// types.UPLOAD_GCG

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
