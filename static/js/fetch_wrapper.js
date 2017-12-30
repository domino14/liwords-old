/**
 * @fileOverview The RPC API for the Wordwalls game.
 */

import _ from 'underscore';

function uniqueId() {
  return Math.random().toString(36).substring(2)
    + (new Date()).getTime().toString(36);
}

class CrosswordsFetch {
  constructor(authToken) {
    this.authToken = authToken;
    this.fetchInit = {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      }),
      credentials: 'omit',
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
   * This function is used for file uploads, and does not use the RPC interface.
   * @param  {FormData} formData
   * @return {Object}
   */
  async uploadwrap(path, formData) {
    // eslint-disable-next-line compat/compat
    const response = await fetch(`/crosswords/${path}/`, {
      method: 'POST',
      headers: new Headers({
        // No content-type header!
        Authorization: `Bearer ${this.authToken}`,
      }),
      credentials: 'omit',
      body: formData,
    });

    if (response.ok) {
      // Only for this case (gcg upload) we return the game link in the
      // Location header. So we don't even need the json.
      // return response.json();
      return response.headers.get('Location');
    }
    const errResp = await response.text();
    let jsonedError;
    try {
      // XXX: This is a HACK. I should be able to try-catch on response.json()
      // however that does NOT work and I can't figure out why. Neither
      // can IRC. So we do this instead so I don't tear my hair out.
      jsonedError = JSON.parse(errResp);
    } catch (err) {
      if (response.status === 401) {
        // XXX Here: Refresh JWT and retry.
        throw new Error('Need to refresh JWT.');
      }
      throw new Error(response.statusText);
    }
    // Throw an error with the JSON error message (from our well-formed API).
    throw new Error(jsonedError.error);
  }
}

export default CrosswordsFetch;

