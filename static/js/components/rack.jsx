import React from 'react';
import PropTypes from 'prop-types';

import { CrosswordGameTileValues, runeToValues } from '../constants/tile_values';
import Tile from './tile';


class Rack extends React.Component {
  renderTiles() {
    const squareWidth = 30;
    const squareHeight = 30;

    const tiles = [];
    if (!this.props.letters || this.props.letters.length === 0) {
      return tiles;
    }

    for (let n = 0; n < this.props.letters.length; n += 1) {
      const rune = this.props.letters[n];
      tiles.push(<Tile
        rune={rune}
        value={runeToValues(rune, CrosswordGameTileValues)}
        width={squareWidth}
        height={squareHeight}
        x={n * squareWidth}
        y={0}
        key={`tile_${n}`}
      />);
    }
    return tiles;
  }

  render() {
    return (
      <svg
        width={30 * 7}
        height={30}
      >
        <g>
          {this.renderTiles()}
        </g>
      </svg>
    );
  }
}

Rack.propTypes = {
  letters: PropTypes.string.isRequired,
};

export default Rack;
