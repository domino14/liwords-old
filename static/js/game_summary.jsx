import React from 'react';
import PropTypes from 'prop-types';


class GameSummary extends React.Component {
  renderTurns() {
    const tableRows = [];
    const player1 = this.props.player1.nick;
    const player2 = this.props.player2.nick;

    if (!this.props.turns[player1]) {
      return null;
    }

    function transformTurn(turn) {
      const challenged = turn.challengedOff ? '[Challenged Off]' : '';
      return `${turn.pos} ${turn.summary} ${challenged} ${turn.score}/${turn.cumul}`;
    }

    for (let i = 0; i < this.props.turns[player1].length; i += 1) {
      const row = (
        <tr key={`rowturn${i}`}>
          <td>{transformTurn(this.props.turns[player1][i])}</td>
          {/* Only render second column if it exists */}
          <td>{this.props.turns[player2] && this.props.turns[player2][i] ?
            transformTurn(this.props.turns[player2][i]) : ''}
          </td>
        </tr>
      );
      tableRows.push(row);
    }
    return tableRows;
  }

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>{this.props.player1.nick}</th>
            <th>{this.props.player2.nick}</th>
          </tr>
        </thead>
        <tbody>
          {this.renderTurns()}
        </tbody>
      </table>
    );
  }
}

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

