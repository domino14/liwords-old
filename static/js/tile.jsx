import React from 'react';
import PropTypes from 'prop-types';

const fontFamily = 'Arial,Geneva,Helvetica,Helv,sans-serif';
const tileStyle = {
  color: '#4417b7',
  outline: '#492889',
  textColor: '#ffffff',
  blankTextColor: '#11fefe',
};

class Tile extends React.Component {
  renderPointValue() {
    if (!this.props.value) {
      return null;
    }
    return (
      <text
        x={8.25 * (this.props.width / 10)}
        y={8.25 * (this.props.width / 10)}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily={fontFamily}
        fontSize="60%"
        stroke={tileStyle.textColor}
        strokeWidth="0.05px"
        fill={tileStyle.textColor}
      >{this.props.value}
      </text>
    );
  }

  renderTileLetter() {
    let letterColor = tileStyle.textColor;
    let rune = this.props.rune;
    if (rune.toUpperCase() !== rune) {
      letterColor = tileStyle.blankTextColor;
      rune = rune.toUpperCase();
    }
    return (
      <text
        x={this.props.width / 2}
        y={this.props.height / 2}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily={fontFamily}
        fontWeight="500"
        fontSize="150%"
        stroke={letterColor}
        fill={letterColor}
      >{rune}
      </text>
    );
  }

  render() {
    const transform = `translate(${this.props.x},${this.props.y})`;

    return (
      <g transform={transform}>
        <rect
          width={0.97 * this.props.width}
          height={0.97 * this.props.height}
          strokeWidth="0.5px"
          stroke={tileStyle.outline}
          fill={tileStyle.color}
          rx={3}
          ry={3}
        />
        {this.renderTileLetter()}
        {this.renderPointValue()}
      </g>);
  }
}


Tile.propTypes = {
  rune: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  // Later, tile types, etc.
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default Tile;
