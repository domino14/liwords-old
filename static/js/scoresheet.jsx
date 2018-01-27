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
        player1={props.player1}
        player2={props.player2}
        turns={props.turns}
        onTurnClick={props.onTurnClick}
        comments={props.comments}
      />
    </div>
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

