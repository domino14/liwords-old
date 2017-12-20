import React from 'react';
import PropTypes from 'prop-types';

import { CrosswordGameTileValues, runeToValues } from './tile_values';
import BoardSpace from './board_space';
import Tile from './tile';


class Board extends React.Component {
  // Use SVG to render.

  renderSpaces() {
    const squareWidth = this.props.boardWidth / this.props.gridWidth;
    const squareHeight = this.props.boardHeight / this.props.gridHeight;

    const spaces = [];
    for (let y = 0; y < this.props.gridHeight; y += 1) {
      for (let x = 0; x < this.props.gridWidth; x += 1) {
        const sq = this.props.gridLayout[y][x];
        const startingSquare = x === 7 && y === 7;
        spaces.push(<BoardSpace
          bonusType={sq}
          width={squareWidth}
          height={squareHeight}
          x={x * squareWidth}
          y={y * squareHeight}
          key={`sq_${x}_${y}`}
          showBonusLabel={this.props.showBonusLabels && !startingSquare}
          startingSquare={startingSquare}
        />);
      }
    }
    return spaces;
  }

  renderTiles() {
    const squareWidth = this.props.boardWidth / this.props.gridWidth;
    const squareHeight = this.props.boardHeight / this.props.gridHeight;

    const tiles = [];
    if (!this.props.tilesLayout || this.props.tilesLayout.length === 0) {
      return tiles;
    }

    for (let y = 0; y < this.props.gridHeight; y += 1) {
      for (let x = 0; x < this.props.gridWidth; x += 1) {
        const rune = this.props.tilesLayout[y][x];
        if (rune !== ' ') {
          tiles.push(<Tile
            rune={rune}
            value={runeToValues(rune, CrosswordGameTileValues)}
            width={squareWidth}
            height={squareHeight}
            x={x * squareWidth}
            y={y * squareHeight}
            key={`tile_${x}_${y}`}
          />);
        }
      }
    }
    return tiles;
  }

  render() {
    return (
      <svg
        width={this.props.boardWidth}
        height={this.props.boardHeight}
      >
        <g>
          {/* apply transform here to the g */}
          {this.renderSpaces()}
          {this.renderTiles()}
        </g>
      </svg>
    );
  }
}

Board.defaultProps = {
  showBonusLabels: false,
};

Board.propTypes = {
  gridWidth: PropTypes.number.isRequired,
  gridHeight: PropTypes.number.isRequired,
  gridLayout: PropTypes.arrayOf(PropTypes.string).isRequired,
  tilesLayout: PropTypes.arrayOf(PropTypes.string).isRequired,

  showBonusLabels: PropTypes.bool,

  boardWidth: PropTypes.number.isRequired,
  boardHeight: PropTypes.number.isRequired,

};

export default Board;
