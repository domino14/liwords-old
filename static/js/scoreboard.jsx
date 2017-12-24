import React from 'react';
import PropTypes from 'prop-types';

const ScoreBoard = props => (
  <div>
    <div className="col-xs-4">
      <span><big>{props.player1.nick}</big></span>
      <h3> {props.player1score}</h3>
    </div>
    <div className="col-xs-4">
      {/* A clock or something in the future */}
    </div>
    <div className="col-xs-4">
      <span><big>{props.player2.nick}</big></span>
      <h3> {props.player2score}</h3>
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
};

export default ScoreBoard;
