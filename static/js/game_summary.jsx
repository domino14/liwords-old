/* eslint-disable jsx-a11y/click-events-have-key-events,
jsx-a11y/interactive-supports-focus */
import React from 'react';
import PropTypes from 'prop-types';


const ClickableTurn = props => (
  <span
    onClick={props.onTurnClick(props.turnIdx)}
    role="link"
    style={{ cursor: 'pointer' }}
  >
    {props.turn}
  </span>
);

ClickableTurn.propTypes = {
  onTurnClick: PropTypes.func.isRequired,
  turnIdx: PropTypes.number.isRequired,
  turn: PropTypes.string.isRequired,
};

const TurnsTable = (props) => {
  const tableRows = [];
  const player1 = props.player1.nick;
  const player2 = props.player2.nick;

  if (!props.turns[player1]) {
    return null;
  }

  function transformTurn(turn) {
    const challenged = turn.challengedOff ? '[Challenged Off]' : '';
    return `${turn.pos} ${turn.summary} ${challenged} ${turn.score}/${turn.cumul}`;
  }

  for (let i = 0; i < props.turns[player1].length; i += 1) {
    const secondColumn = props.turns[player2] && props.turns[player2][i] ?
      transformTurn(props.turns[player2][i]) : '';
    const secondLink = secondColumn ? (
      <ClickableTurn
        onTurnClick={props.onTurnClick}
        turnIdx={props.turns[player2][i].turnIdx + 1}
        turn={secondColumn}
      />) : null;
    const row = (
      <tr key={`rowturn${i}`}>
        <td>
          <ClickableTurn
            onTurnClick={props.onTurnClick}
            turnIdx={props.turns[player1][i].turnIdx + 1}
            turn={transformTurn(props.turns[player1][i])}
          />
        </td>
        {/* Only render second column if it exists */}
        <td>
          {secondLink}
        </td>
      </tr>
    );
    tableRows.push(row);
  }
  return tableRows;
};

TurnsTable.propTypes = {
  turns: PropTypes.object.isRequired,
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
};

const GameSummary = props => (
  <table className="table">
    <thead>
      <tr>
        <th>{props.player1.nick}</th>
        <th>{props.player2.nick}</th>
      </tr>
    </thead>
    <tbody>
      <TurnsTable
        player1={props.player1}
        player2={props.player2}
        turns={props.turns}
        onTurnClick={props.onTurnClick}
      />
    </tbody>
  </table>
);


GameSummary.propTypes = {
  turns: PropTypes.object.isRequired,
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
};

export default GameSummary;

