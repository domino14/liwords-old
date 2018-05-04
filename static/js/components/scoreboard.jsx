import React from 'react';
import PropTypes from 'prop-types';

import Rack from './rack';


const PlayerScore = (props) => {
  let playerDisplay = <small>{props.displayName}</small>;

  if (props.highlight) {
    playerDisplay = <span className="label label-warning">{props.displayName}</span>;
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
          displayName={props.players[0] ? props.players[0].nick : ''}
          score={props.players[0] ? props.scores[props.players[0].nick] : 0}
          highlight={props.players[0] ? props.players[0].nick === props.currentUser : false}
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
          displayName={props.players[1] ? props.players[1].nick : ''}
          score={props.players[1] ? props.scores[props.players[1].nick] : 0}
          highlight={props.players[1] ? props.players[1].nick === props.currentUser : false}
        />
      </div>
    </div>
  </div>
);

ScoreBoard.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    real_name: PropTypes.string,
    p_number: PropTypes.string,
    nick: PropTypes.string,
  })).isRequired,
  scores: PropTypes.objectOf(PropTypes.number).isRequired,
  currentUser: PropTypes.string.isRequired,
  currentRack: PropTypes.string.isRequired,
};

export default ScoreBoard;
