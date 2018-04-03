import React from 'react';
import PropTypes from 'prop-types';

import { CrosswordGameTileValues, runeToValues } from '../constants/tile_values';
import Tile from './tile';


const Tiles = (props) => {
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
          width={props.boardSquareWidth}
          height={props.boardSquareHeight}
          x={(x * props.boardSquareWidth) + props.rowLabelWidth}
          y={(y * props.boardSquareHeight) + props.colLabelHeight}
          lastPlayed={lastPlayed}
          key={`tile_${x}_${y}`}
        />);
      }
    }
  }
  return tiles;
};

Tiles.propTypes = {
  gridWidth: PropTypes.number.isRequired,
  gridHeight: PropTypes.number.isRequired,

  rowLabelWidth: PropTypes.number.isRequired,
  colLabelHeight: PropTypes.number.isRequired,
  boardSquareWidth: PropTypes.number.isRequired,
  boardSquareHeight: PropTypes.number.isRequired,

  tilesLayout: PropTypes.arrayOf(PropTypes.string).isRequired,
  lastPlayedLetters: PropTypes.object.isRequired,
};

export default Tiles;
