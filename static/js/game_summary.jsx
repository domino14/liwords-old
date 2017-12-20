import React from 'react';
import PropTypes from 'prop-types';

import { MoveTypesEnum } from './moves';

/**
 * Process a turn item and add it to a row at the proper index.
 * @param  {Object} turnItem
 * @param  {Array.<string>} row
 * @param  {number} rowIndex
 * @return {number} Advance index within the row.
 */
function processItem(turnItem, row, rowIndex) {
  let el = null;
  let advance = true;
  switch (turnItem.type) {
    case MoveTypesEnum.SCORING_PLAY:
      el = `${turnItem.pos} ${turnItem.play} +${turnItem.score} ${turnItem.cumul}`;
      break;

    case MoveTypesEnum.PASS:
      el = `Pass +0 ${turnItem.cumul}`;
      break;

    case MoveTypesEnum.CHALLENGE_OFF:
      el = `[Challenged off] -${turnItem.lost_score} ${turnItem.cumul}`;
      advance = false;
      break;

    case MoveTypesEnum.EXCHANGE:
      el = `Exchange ${turnItem.exchanged} +0 ${turnItem.cumul}`;
      break;

    case MoveTypesEnum.ENDGAME_POINTS:
      el = `2 × (${turnItem.rack}) +${turnItem.score} ${turnItem.cumul}`;
      break;

    default:
      window.console.error('Found unhandled move type:', turnItem);
  }

  if (row[rowIndex]) {
    row[rowIndex] += `\n${el}`;
  } else {
    row[rowIndex] = el;
  }

  return advance;
}


class GameSummary extends React.Component {
  renderTurns() {
    const tableRows = [];
    let currentRow = [];
    let currentRowIndex = 0;

    for (let i = 0; i <= this.props.currentTurn; i += 1) {
      const item = this.props.gameRepr.turns[i];
      if (!item) {
        break;
      }
      const advIndex = processItem(item, currentRow, currentRowIndex);
      if (advIndex) {
        if (currentRowIndex === 1) {
          currentRowIndex = 0;
          const row = (
            <tr key={`rowturn${i}`}>
              <td>{currentRow[0]}</td>
              <td>{currentRow[1]}</td>
            </tr>
          );
          tableRows.push(row);
          currentRow = [];
        } else {
          currentRowIndex = 1;
        }
      }
    }
    console.log('table rows', tableRows);
    return tableRows;
  }

  render() {
    return (
      <table className="table">
        <thead>
          <tr>
            <th>{this.props.gameRepr.players[0].nick}</th>
            <th>{this.props.gameRepr.players[1].nick}</th>
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
  gameRepr: PropTypes.shape({
    players: PropTypes.array,
    turns: PropTypes.array,
  }).isRequired,
  currentTurn: PropTypes.number.isRequired,
};

export default GameSummary;

