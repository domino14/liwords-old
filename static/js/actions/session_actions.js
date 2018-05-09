import CrosswordsFetch, { parseJWT, FetchErrors } from '../utils/api_utils';
import { LOGIN_TOKEN, SET_USERNAME, FETCH_ERROR } from '../constants/action_types';

const authToken = token => ({
  type: LOGIN_TOKEN,
  token,
});

const setUsername = username => ({
  type: SET_USERNAME,
  username,
});

export const fetchError = error => ({
  type: FETCH_ERROR,
  error,
});

export const login = () => (dispatch) => {
  const cfetch = new CrosswordsFetch();
  cfetch.restwrap('/jwt/', 'GET', {})
    .then((result) => {
      dispatch(authToken(result.token));
      const parsedToken = parseJWT(result.token);
      dispatch(setUsername(parsedToken.usn));
    })
    .catch(() => {
      dispatch(fetchError(new Error(FetchErrors.CouldNotObtainToken)));
    });
};
