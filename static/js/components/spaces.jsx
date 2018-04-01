import React from 'react';
import PropTypes from 'prop-types';

import BoardSpace from './space';


const BoardSpaces = (props) => {
  const spaces = [];
  for (let y = 0; y < props.gridHeight; y += 1) {
    for (let x = 0; x < props.gridWidth; x += 1) {
      const sq = props.gridLayout[y][x];
      const startingSquare = x === 7 && y === 7;
      spaces.push(<BoardSpace
        bonusType={sq}
        width={props.boardSquareWidth}
        height={props.boardSquareHeight}
        x={(x * props.boardSquareWidth) + props.rowLabelWidth}
        y={(y * props.boardSquareHeight) + props.colLabelHeight}
        key={`sq_${x}_${y}`}
        showBonusLabel={props.showBonusLabels && !startingSquare}
        startingSquare={startingSquare}
      />);
    }
  }
  return spaces;
};

BoardSpaces.propTypes = {
  gridWidth: PropTypes.number.isRequired,
  gridHeight: PropTypes.number.isRequired,

  rowLabelWidth: PropTypes.number.isRequired,
  colLabelHeight: PropTypes.number.isRequired,
  boardSquareWidth: PropTypes.number.isRequired,
  boardSquareHeight: PropTypes.number.isRequired,

  gridLayout: PropTypes.arrayOf(PropTypes.string).isRequired,
  showBonusLabels: PropTypes.bool.isRequired,
};

export default BoardSpaces;
