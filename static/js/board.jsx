import React from 'react';
import PropTypes from 'prop-types';

import { CrosswordGameTileValues, runeToValues } from './tile_values';
import BoardSpace from './board_space';
import Tile from './tile';

const BoardSpaces = (props) => {
  const squareWidth = props.boardWidth / props.gridWidth;
  const squareHeight = props.boardHeight / props.gridHeight;

  const spaces = [];
  for (let y = 0; y < props.gridHeight; y += 1) {
    for (let x = 0; x < props.gridWidth; x += 1) {
      const sq = props.gridLayout[y][x];
      const startingSquare = x === 7 && y === 7;
      spaces.push(<BoardSpace
        bonusType={sq}
        width={squareWidth}
        height={squareHeight}
        x={x * squareWidth}
        y={y * squareHeight}
        key={`sq_${x}_${y}`}
        showBonusLabel={props.showBonusLabels && !startingSquare}
        startingSquare={startingSquare}
      />);
    }
  }
  return spaces;
};

BoardSpaces.propTypes = {
  boardWidth: PropTypes.number.isRequired,
  boardHeight: PropTypes.number.isRequired,
  gridWidth: PropTypes.number.isRequired,
  gridHeight: PropTypes.number.isRequired,
  gridLayout: PropTypes.arrayOf(PropTypes.string).isRequired,
  showBonusLabels: PropTypes.bool.isRequired,
};

const Tiles = (props) => {
  const squareWidth = props.boardWidth / props.gridWidth;
  const squareHeight = props.boardHeight / props.gridHeight;

  const tiles = [];
  if (!props.tilesLayout || props.tilesLayout.length === 0) {
    return tiles;
  }

  for (let y = 0; y < props.gridHeight; y += 1) {
    for (let x = 0; x < props.gridWidth; x += 1) {
      const rune = props.tilesLayout[y][x];
      if (rune !== ' ') {
        const lastPlayed = props.lastPlayedLetters[`R${y}C${x}`] === true;
        tiles.push(<Tile
          rune={rune}
          value={runeToValues(rune, CrosswordGameTileValues)}
          width={squareWidth}
          height={squareHeight}
          x={x * squareWidth}
          y={y * squareHeight}
          lastPlayed={lastPlayed}
          key={`tile_${x}_${y}`}
        />);
      }
    }
  }
  return tiles;
};

Tiles.propTypes = {
  boardWidth: PropTypes.number.isRequired,
  boardHeight: PropTypes.number.isRequired,
  gridWidth: PropTypes.number.isRequired,
  gridHeight: PropTypes.number.isRequired,
  tilesLayout: PropTypes.arrayOf(PropTypes.string).isRequired,
  lastPlayedLetters: PropTypes.object.isRequired,
};

const Board = props => (
  <svg
    width={props.boardWidth}
    height={props.boardHeight}
  >
    <g>
      {/* apply transform here to the g */}
      <BoardSpaces
        boardWidth={props.boardWidth}
        boardHeight={props.boardHeight}
        gridWidth={props.gridWidth}
        gridHeight={props.gridHeight}
        gridLayout={props.gridLayout}
        showBonusLabels={props.showBonusLabels}
      />
      <Tiles
        boardWidth={props.boardWidth}
        boardHeight={props.boardHeight}
        gridWidth={props.gridWidth}
        gridHeight={props.gridHeight}
        tilesLayout={props.tilesLayout}
        lastPlayedLetters={props.lastPlayedLetters}
      />
    </g>
  </svg>
);

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
