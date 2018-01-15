import React from 'react';
import PropTypes from 'prop-types';

const letterOrder = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ?';

/**
 * Generate a list of letters that are in the pool.
 * @param  {string} possibleLetters A string with the letters to look for
 * @param  {Object} pool A dictionary with pool counts.
 * @return {Array.<string>}
 */
function poolGenerator(possibleLetters, pool) {
  const poolArr = [];
  for (let i = 0; i < possibleLetters.length; i += 1) {
    const letter = possibleLetters[i];
    if (pool[letter]) {
      for (let n = 0; n < pool[letter]; n += 1) {
        poolArr.push(letter);
      }
    }
  }
  return poolArr;
}

function poolMinusRack(pool, rack) {
  const poolCopy = Object.assign({}, pool);
  for (let i = 0; i < rack.length; i += 1) {
    poolCopy[rack[i]] -= 1;
  }
  return poolCopy;
}

const Pool = (props) => {
  const pool = poolMinusRack(props.pool, props.currentRack);
  const letters = poolGenerator(letterOrder, pool);

  return (
    <div>
      <div className="row">
        <div className="col-lg-12">
          {letters.length} unseen tiles:
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <span style={{ fontFamily: 'monospace' }}>
            <big>{letters.join(' ')}</big>
          </span>
        </div>
      </div>
    </div>);
};

Pool.propTypes = {
  // pool is an object with the tile counts {A: 3, B: 1, C: 0, etc}
  pool: PropTypes.object.isRequired,
  currentRack: PropTypes.string.isRequired,
};

export default Pool;

