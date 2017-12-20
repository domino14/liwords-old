import React from 'react';
import PropTypes from 'prop-types';

const vowelOrder = 'AEIOU';
const consonantOrder = 'BCDFGHJKLMNPQRSTVWXYZ';

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
  const vowels = poolGenerator(vowelOrder, props.pool);
  const consonants = poolGenerator(consonantOrder, props.pool);
  const blanks = poolGenerator('?', props.pool);

  return (
    <div className="row">
      <div className="col-lg-5">
        {vowels.join(' ')}
      </div>
      <div className="col-lg-6">
        {consonants.join(' ')}
      </div>
      <div className="col-lg-1">
        {blanks.join(' ')}
      </div>
    </div>);
};

Pool.propTypes = {
  // pool is an object with the tile counts {A: 3, B: 1, C: 0, etc}
  pool: PropTypes.object.isRequired,
};


class Scoresheet extends React.Component {
  render() {
    return (
      <div>
        <TurnsNavbar
          stepForward={this.props.stepForward}
          stepBackward={this.props.stepBackward}
          fastForward={this.props.fastForward}
          fastBackward={this.props.fastBackward}
        />
        <Pool
          pool={this.props.pool}
        />
      </div>);
  }
}

Scoresheet.propTypes = {
  pool: PropTypes.object.isRequired,
  gameRepr: PropTypes.shape({
    players: PropTypes.array,
    turns: PropTypes.array,
  }).isRequired,
  stepForward: PropTypes.func.isRequired,
  stepBackward: PropTypes.func.isRequired,
  fastForward: PropTypes.func.isRequired,
  fastBackward: PropTypes.func.isRequired,
};

export default Scoresheet;

