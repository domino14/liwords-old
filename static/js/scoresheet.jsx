import React from 'react';
import PropTypes from 'prop-types';

import GameSummary from './game_summary';
// const vowelOrder = 'AEIOU';
// const consonantOrder = 'BCDFGHJKLMNPQRSTVWXYZ';
const letterOrder = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ?';

const TurnsNavbar = props => (
  <div className="btn-toolbar" role="toolbar">
    <div className="btn-group" role="group">
      <button type="button" className="btn btn-default" onClick={props.fastBackward}>
        <span className="glyphicon glyphicon-fast-backward" />
      </button>
      <button type="button" className="btn btn-default" onClick={props.stepBackward}>
        <span className="glyphicon glyphicon-step-backward" />
      </button>
    </div>
    <div className="btn-group" role="group">
      <button type="button" className="btn btn-default" onClick={props.stepForward}>
        <span className="glyphicon glyphicon-step-forward" />
      </button>
      <button type="button" className="btn btn-default" onClick={props.fastForward}>
        <span className="glyphicon glyphicon-fast-forward" />
      </button>
    </div>
  </div>
);

TurnsNavbar.propTypes = {
  stepForward: PropTypes.func.isRequired,
  stepBackward: PropTypes.func.isRequired,
  fastForward: PropTypes.func.isRequired,
  fastBackward: PropTypes.func.isRequired,
};

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

const Pool = (props) => {
  const letters = poolGenerator(letterOrder, props.pool);

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
};

function poolMinusRack(pool, rack) {
  const poolCopy = Object.assign({}, pool);
  for (let i = 0; i < rack.length; i += 1) {
    poolCopy[rack[i]] -= 1;
  }
  return poolCopy;
}

const Scoresheet = props => (
  <div>
    <TurnsNavbar
      stepForward={props.stepForward}
      stepBackward={props.stepBackward}
      fastForward={props.fastForward}
      fastBackward={props.fastBackward}
    />
    <div
      style={{ height: 400, overflowY: 'scroll' }}
      ref={(domNode) => {
        if (domNode === null) {
          return;
        }
        domNode.scrollTop = domNode.scrollHeight; // eslint-disable-line no-param-reassign
      }}
    >
      <GameSummary
        player1={props.player1}
        player2={props.player2}
        turns={props.turns}
        onTurnClick={props.onTurnClick}
        comments={props.comments}
      />
    </div>
    <Pool
      pool={poolMinusRack(props.pool, props.currentRack)}
    />
  </div>);

Scoresheet.propTypes = {
  pool: PropTypes.object.isRequired,
  turns: PropTypes.object.isRequired,
  currentRack: PropTypes.string.isRequired,
  player1: PropTypes.shape({
    real_name: PropTypes.string,
    p_number: PropTypes.string,
    nick: PropTypes.string,
  }).isRequired,
  player2: PropTypes.shape({
    real_name: PropTypes.string,
    p_number: PropTypes.string,
    nick: PropTypes.string,
  }).isRequired,
  stepForward: PropTypes.func.isRequired,
  stepBackward: PropTypes.func.isRequired,
  fastForward: PropTypes.func.isRequired,
  fastBackward: PropTypes.func.isRequired,
  onTurnClick: PropTypes.func.isRequired,

  comments: PropTypes.arrayOf(PropTypes.shape({
    uuid: PropTypes.string,
    comment: PropTypes.string,
    turn_num: PropTypes.number,
    username: PropTypes.string,
    created: PropTypes.string,
  })).isRequired,
};

export default Scoresheet;

