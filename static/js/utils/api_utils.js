/**
 * @fileOverview The RPC API for the Crossword game.
 */

import _ from 'underscore';
import * as types from '../constants/action_types';

const FetchErrors = {
  CouldNotRefreshToken: 'Could not refresh token.',
  CouldNotObtainToken: 'Could not obtain token.',
};

const MAX_RETRY_DELAY = 10;

function sleep(ms) {
  // eslint-disable-next-line compat/compat
  return new Promise(resolve => setTimeout(resolve, ms));
}

function uniqueId() {
  return Math.random().toString(36).substring(2)
    + (new Date()).getTime().toString(36);
}

function getQueryString(params) {
  const esc = encodeURIComponent;
  return Object.keys(params || {})
    .map(k => `${esc(k)}=${esc(params[k])}`)
    .join('&');
}

class CrosswordsFetch {
  constructor(authToken, dispatch) {
    this.authToken = authToken || '';
    this.dispatch = dispatch;
    this.fetchInit = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      }),
      credentials: 'same-origin',
    };
  }

  setAuthToken(token) {
    this.authToken = token;
    this.fetchInit.headers.set('Authorization', `Bearer ${token}`);
  }

  /**
   * Generate a JSON RPC data packet.
   */
  fetchdata(method, params) {
    return _.extend(this.fetchInit, {
      body: JSON.stringify({
        id: uniqueId(),
        jsonrpc: '2.0',
        method,
        params,
      }),
    });
  }

  /**
   * This is used for the RPC API, which is the main gameplay API (mainly,
   * submit a turn, challenge, pass, etc)
   * @param  {string} method RPC Method name
   * @param  {Object} params RPC Params
   * @return {Promise}
   */
  async rpcwrap(method, params) {
    // eslint-disable-next-line compat/compat
    const response = await fetch('/crosswords/rpc/', this.fetchdata(method, params));
    const data = await response.json();
    if (response.ok) {
      // Use the `result` key - since this is JSONRPC
      return data.result;
    }
    // Otherwise, there's an error.
    throw new Error(data.error.message);
  }

  /**
   * This is used for the REST API, which is the main resource API (submit
   * comments, preferences, create new boards, etc.)
   * @param {string} path
   * @param {string} method The HTTP method
   * @param {Object} params The params of the request.
   * @param {string} optContentType An optional content type
   * @param {function} optResponseParser An optional parser for the response,
   *   defaults to response.json()
   * @param {number?} optRetryDelay
   * @return {Promise}
   */
  async restwrap(path, method, params, optContentType, optResponseParser, optRetryDelay) {
    const headers = new Headers({
      Authorization: `Bearer ${this.authToken}`,
    });
    if (optContentType) {
      headers.set('Content-Type', optContentType);
    }
    let qs = '';
    let body;
    if (method === 'GET' || method === 'DELETE') {
      qs = `?${getQueryString(params)}`;
    } else if (optContentType === 'application/json') {
      body = JSON.stringify(params);
    } else {
      body = params;
    }
    // eslint-disable-next-line compat/compat
    const response = await fetch(`${path}${qs}`, {
      method,
      headers,
      body,
      credentials: 'same-origin',
    });
    if (response.ok) {
      return optResponseParser ? optResponseParser(response) : response.json();
    }
    const errResp = await response.text();
    let jsonedError;
    try {
      // XXX: This is a HACK. I should be able to try-catch on response.json()
      // however that does NOT work and I can't figure out why. Neither
      // can IRC. So we do this instead so I don't tear my hair out.
      jsonedError = JSON.parse(errResp);

      // Throw an error with the JSON error message (from our well-formed API).
      throw new Error(jsonedError.error);
    } catch (err) {
      if (response.status === 401) {
        await this.restwrap('/jwt/', 'GET')
          // XXX Note this doesn't set the username back in the main app,
          // but we should already have the username from the first fetch.
          // If it changes, that would be such a weird edge case anyway.
          .then((result) => {
            this.setAuthToken(result.token);
            if (this.dispatch) {
              this.dispatch({
                type: types.LOGIN_TOKEN,
                token: result.token,
              });
            }
          })
          .catch(() => {
            throw new Error(FetchErrors.CouldNotRefreshToken);
          });
        // retry request.
        await sleep((1.9 ** optRetryDelay) * 100);
        return this.restwrap(
          path, method, params, optContentType, optResponseParser,
          Math.min(optRetryDelay ? optRetryDelay + 1 : 1, MAX_RETRY_DELAY),
        );
      }
      // Otherwise, throw an error.
      throw new Error(response.statusText);
    }
  }

  /**
   * This function is used for file uploads, and does not use the RPC interface.
   * @param  {FormData} formData
   * @return {Object}
   */
  async uploadwrap(formData) {
    return this.restwrap(
      '/crosswords/gcg_upload', 'POST', formData,
      // Only for this case (gcg upload) we return the game link in the
      // Location header. So we don't even need the json.
      null, // Don't use a content-type for gcg upload.
      response => response.headers.get('Location'),
    );
  }
}

function parseJWT(jwt) {
  const payload = jwt.split('.')[1];
  const base64 = payload.replace('-', '+').replace('_', '/');
  return JSON.parse(window.atob(base64));
}

export default CrosswordsFetch;
export { FetchErrors, parseJWT };

