import React from 'react';
import PropTypes from 'prop-types';

import BoardCoordLabels from './coord_labels';
import BoardSpaces from './spaces';
import Tiles from './tiles';


const Board = (props) => {
  const labelRatio = 1 / 2;

  const rowLabelWidth = props.boardWidth / ((props.gridWidth / labelRatio) + 1);
  const colLabelHeight = props.boardHeight / ((props.gridHeight / labelRatio) + 1);

  const boardSquareWidth = rowLabelWidth / labelRatio;
  const boardSquareHeight = colLabelHeight / labelRatio;

  return (
    <svg
      width={props.boardWidth}
      height={props.boardHeight}
    >
      <g>
        {/* apply transform here to the g */}
        <BoardCoordLabels
          gridWidth={props.gridWidth}
          gridHeight={props.gridHeight}

          rowLabelWidth={rowLabelWidth}
          colLabelHeight={colLabelHeight}
          boardSquareWidth={boardSquareWidth}
          boardSquareHeight={boardSquareHeight}
        />
        <BoardSpaces
          gridWidth={props.gridWidth}
          gridHeight={props.gridHeight}

          rowLabelWidth={rowLabelWidth}
          colLabelHeight={colLabelHeight}
          boardSquareWidth={boardSquareWidth}
          boardSquareHeight={boardSquareHeight}

          gridLayout={props.gridLayout}
          showBonusLabels={props.showBonusLabels}
        />
        <Tiles
          gridWidth={props.gridWidth}
          gridHeight={props.gridHeight}

          rowLabelWidth={rowLabelWidth}
          colLabelHeight={colLabelHeight}
          boardSquareWidth={boardSquareWidth}
          boardSquareHeight={boardSquareHeight}

          tilesLayout={props.tilesLayout}
          lastPlayedLetters={props.lastPlayedLetters}
        />
      </g>
    </svg>);
};

Board.defaultProps = {
  showBonusLabels: false,
};

Board.propTypes = {
  gridWidth: PropTypes.number.isRequired,
  gridHeight: PropTypes.number.isRequired,
  gridLayout: PropTypes.arrayOf(PropTypes.string).isRequired,
  tilesLayout: PropTypes.arrayOf(PropTypes.string).isRequired,
  lastPlayedLetters: PropTypes.object.isRequired,
  showBonusLabels: PropTypes.bool,

  boardWidth: PropTypes.number.isRequired,
  boardHeight: PropTypes.number.isRequired,

};

export default Board;
