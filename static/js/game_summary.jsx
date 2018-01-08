/* eslint-disable jsx-a11y/click-events-have-key-events,
jsx-a11y/interactive-supports-focus */
import React from 'react';
import PropTypes from 'prop-types';


const ClickableTurn = props => (
  props.turn ? (
    <span
      onClick={props.onTurnClick(props.turnIdx)}
      role="link"
      style={{
        cursor: 'pointer',
        // f8fe64
        backgroundColor: props.hasNote ? '#f864fe' : 'transparent',
      }}
    >
      {props.turn}
    </span>)
    : null
);

ClickableTurn.propTypes = {
  onTurnClick: PropTypes.func.isRequired,
  turnIdx: PropTypes.number.isRequired,
  turn: PropTypes.string.isRequired,
  hasNote: PropTypes.bool.isRequired,
};

const TurnRow = props => (
  <tr>
    <td>
      <ClickableTurn
        onTurnClick={props.onTurnClick}
        turnIdx={props.turnIdxLeft}
        turn={props.turnLeft}
        hasNote={props.hasNoteLeft}
      />
    </td>
    <td>
      <ClickableTurn
        onTurnClick={props.onTurnClick}
        turnIdx={props.turnIdxRight}
        turn={props.turnRight}
        hasNote={props.hasNoteRight}
      />
    </td>
  </tr>
);

TurnRow.propTypes = {
  onTurnClick: PropTypes.func.isRequired,
  turnIdxLeft: PropTypes.number.isRequired,
  turnIdxRight: PropTypes.number.isRequired,
  turnLeft: PropTypes.string.isRequired,
  turnRight: PropTypes.string.isRequired,
  hasNoteLeft: PropTypes.bool.isRequired,
  hasNoteRight: PropTypes.bool.isRequired,
};

function transformTurn(turn) {
  if (!turn) {
    return '';
  }
  const challenged = turn.challengedOff ? '[Challenged Off]' : '';
  return `${turn.pos} ${turn.summary} ${challenged} ${turn.score}/${turn.cumul}`;
}

const TurnsTable = (props) => {
  const player1 = props.player1 ? props.player1.nick : '';
  const player2 = props.player2 ? props.player2.nick : '';

  if (!props.turns[player1]) {
    return null;
  }

  const numP1Turns = props.turns[player1].length;
  const numP2Turns = props.turns[player2] ? props.turns[player2].length : 0;

  const mostTurns = Math.max(numP1Turns, numP2Turns);

  let playerTurns = props.turns[player1];
  if (playerTurns.length !== mostTurns) {
    playerTurns = props.turns[player2];
  }

  return playerTurns.map((turn, i) => {
    const p1Turn = props.turns[player1][i];
    const p2Turn = props.turns[player2] ? props.turns[player2][i] : null;
    return (
      <TurnRow
        key={`rowturn${i + 0}`}
        onTurnClick={props.onTurnClick}
        turnIdxLeft={p1Turn ? p1Turn.turnIdx + 1 : -1}
        turnIdxRight={p2Turn ? p2Turn.turnIdx + 1 : -1}
        turnLeft={p1Turn ? transformTurn(p1Turn) : ''}
        turnRight={p2Turn ? transformTurn(p2Turn) : ''}
        hasNoteLeft={p1Turn ? p1Turn.note !== '' : false}
        hasNoteRight={p2Turn ? p2Turn.note !== '' : false}
      />
    );
  });
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
        <th>{props.player1 ? props.player1.nick : ''}</th>
        <th>{props.player2 ? props.player2.nick : ''}</th>
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

