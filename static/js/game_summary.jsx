import React from 'react';
import PropTypes from 'prop-types';


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
      <a href={`#${props.turns[player2][i].turnIdx}`}>
        {secondColumn}
      </a>) : null;
    const row = (
      <tr key={`rowturn${i}`}>
        <td>
          <a href={`#${props.turns[player1][i].turnIdx}`}>
            {transformTurn(props.turns[player1][i])}
          </a>
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
};

export default GameSummary;

