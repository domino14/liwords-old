import React from 'react';
import PropTypes from 'prop-types';

import BoardSpace from './board_space';
import Tile from './tile';

// Turn the rune into a point value.
// Note: This should be part of its own Alphabet or Bag or similar
// class. This is for a quick MVP.
function runeToValues(rune) {
  const vals = {
    A: 1,
    B: 3,
    C: 3,
    D: 2,
    E: 1,
    F: 4,
    G: 2,
    H: 4,
    I: 1,
    J: 8,
    K: 5,
    L: 1,
    M: 3,
    N: 1,
    O: 1,
    P: 3,
    Q: 10,
    R: 1,
    S: 1,
    T: 1,
    U: 1,
    V: 4,
    W: 4,
    X: 8,
    Y: 4,
    Z: 10,
  };
  if (vals[rune]) {
    return vals[rune];
  }
  return 0;
}

class Board extends React.Component {
  // Use SVG to render.

  renderSpaces() {
    const squareWidth = this.props.boardWidth / this.props.gridWidth;
    const squareHeight = this.props.boardHeight / this.props.gridHeight;

    const spaces = [];
    for (let y = 0; y < this.props.gridHeight; y += 1) {
      for (let x = 0; x < this.props.gridWidth; x += 1) {
        const sq = this.props.gridLayout[y][x];
        spaces.push(<BoardSpace
          bonusType={sq}
          width={squareWidth}
          height={squareHeight}
          x={x * squareWidth}
          y={y * squareHeight}
          key={`sq_${x}_${y}`}
        />);
      }
    }
    return spaces;
  }

  renderTiles() {
    const squareWidth = this.props.boardWidth / this.props.gridWidth;
    const squareHeight = this.props.boardHeight / this.props.gridHeight;

    const tiles = [];

    for (let y = 0; y < this.props.gridHeight; y += 1) {
      for (let x = 0; x < this.props.gridWidth; x += 1) {
        const rune = this.props.tilesLayout[y][x];
        if (rune !== ' ') {
          tiles.push(<Tile
            rune={rune}
            value={runeToValues(rune)}
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
