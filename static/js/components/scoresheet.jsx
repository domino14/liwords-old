import React from 'react';
import PropTypes from 'prop-types';

import Pool from './pool';
import GameSummary from './game_summary';

const Scoresheet = props => (
  <div>
    <Pool
      pool={props.pool}
      currentRack={props.currentRack}
    />

    <div
      style={{ marginTop: 10, maxHeight: 500, overflowY: 'scroll' }}
      ref={(domNode) => {
        if (domNode === null) {
          return;
        }
        domNode.scrollTop = domNode.scrollHeight; // eslint-disable-line no-param-reassign
      }}
    >
      <GameSummary
        players={props.players}
        turns={props.turns}
        onTurnClick={props.onTurnClick}
        comments={props.comments}
      />
    </div>
  </div>);

Scoresheet.propTypes = {
  pool: PropTypes.objectOf(PropTypes.number).isRequired,
  turns: PropTypes.objectOf(PropTypes.array).isRequired,
  currentRack: PropTypes.string.isRequired,
  players: PropTypes.arrayOf(PropTypes.shape({
    real_name: PropTypes.string,
    p_number: PropTypes.string,
    nick: PropTypes.string,
  }).isRequired).isRequired,

  onTurnClick: PropTypes.func.isRequired,

  comments: PropTypes.arrayOf(PropTypes.shape({
    uuid: PropTypes.string,
    comment: PropTypes.string,
    turn_num: PropTypes.number,
    username: PropTypes.string,
    created: PropTypes.string,
    edited: PropTypes.bool,
  })).isRequired,
};

export default Scoresheet;

