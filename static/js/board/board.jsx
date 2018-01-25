import React from 'react';
import PropTypes from 'prop-types';

import BoardCoordLabels from './coord_labels';
import BoardSpaces from './spaces';
import Tiles from './tiles';


const Board = (props) => {
  const labelRatio = 1 / 2;
  let numCols;
  // Do some math here to calculate the proper board width / board height.

  // board width should be roughly the width of the holding column.
  // col-lg-5 col-md-6 col-sm-8 col-xs-12 is the class name for the column.
  // Not sure how to get this so we'll have to change this formula if we
  // change those classes.
  //
  // The gutter width is 15px per side so subtract 30.

  if (props.windowWidth >= 1200) {
    numCols = 5;
  } else if (props.windowWidth >= 992) {
    numCols = 6;
  } else if (props.windowWidth >= 768) {
    numCols = 8;
  } else {
    numCols = 12;
  }

  let boardWidth = ((numCols / 12) * props.windowWidth) - 30;
  let boardHeight = boardWidth;

  if (boardWidth > 700) {
    boardWidth = 700;
    boardHeight = 700;
  }


  const rowLabelWidth = boardWidth / ((props.gridWidth / labelRatio) + 1);
  const colLabelHeight = boardHeight / ((props.gridHeight / labelRatio) + 1);

  const boardSquareWidth = rowLabelWidth / labelRatio;
  const boardSquareHeight = colLabelHeight / labelRatio;

  return (
    <svg
      width={boardWidth}
      height={boardHeight}
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

  windowWidth: PropTypes.number.isRequired,

};

export default Board;
