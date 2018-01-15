import React from 'react';
import PropTypes from 'prop-types';

import Rack from './rack';


const PlayerScore = (props) => {
  let playerDisplay = <small>{props.displayName}</small>;

  if (props.highlight) {
    playerDisplay = <span className="label label-primary">{props.displayName}</span>;
  }

  return (
    <center>
      <h4>
        {playerDisplay}
        <span className="label label-info" style={{ marginLeft: 5 }}>
          {props.score}
        </span>
      </h4>
    </center>
  );
};

PlayerScore.propTypes = {
  displayName: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  highlight: PropTypes.bool.isRequired,
};

const ScoreBoard = props => (
  <div>
    <div className="col-xs-3">
      <div>
        <PlayerScore
          displayName={props.player1 ? props.player1.nick : ''}
          score={props.player1score}
          highlight={props.player1 ? props.player1.nick === props.currentUser : false}
        />
      </div>
    </div>
    <div className="col-xs-6">
      {/* Add a clock or something in the future */}
      <Rack
        letters={props.currentRack}
      />
    </div>
    <div className="col-xs-3">
      <div>
        <PlayerScore
          displayName={props.player2 ? props.player2.nick : ''}
          score={props.player2score}
          highlight={props.player2 ? props.player2.nick === props.currentUser : false}
        />
      </div>
    </div>
  </div>
);

ScoreBoard.propTypes = {
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
  player1score: PropTypes.number.isRequired,
  player2score: PropTypes.number.isRequired,
  currentUser: PropTypes.string.isRequired,
  currentRack: PropTypes.string.isRequired,
};

export default ScoreBoard;
