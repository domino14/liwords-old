import React from 'react';
import PropTypes from 'prop-types';

const fontFamily = 'Arial,Geneva,Helvetica,Helv,sans-serif';
const tileStyle = {
  color: '#4417b7',
  outline: '#492889',
  textColor: '#ffffff',
  blankTextColor: '#11fefe',
};

// const lastPlayedTileStyle = {
//   color: '#fdb72b',
//   outline: '#a57719',
//   textColor: '#000000',
//   blankTextColor: '#fe1111',
// };
//
const lastPlayedTileStyle = {
  color: '#175cb7',
  outline: '#492889',
  textColor: '#ffffff',
  blankTextColor: '#11fefe',
};

class Tile extends React.Component {
  constructor(props) {
    super(props);
    this.tileStyle = tileStyle;
    if (props.lastPlayed) {
      this.tileStyle = lastPlayedTileStyle;
    }
  }

  renderPointValue() {
    if (!this.props.value) {
      return null;
    }
    return (
      <text
        x={8 * (this.props.width / 10)}
        y={8 * (this.props.width / 10)}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily={fontFamily}
        fontSize="60%"
        stroke={this.tileStyle.textColor}
        strokeWidth="0.05px"
        fill={this.tileStyle.textColor}
      >{this.props.value}
      </text>
    );
  }

  renderTileLetter() {
    let letterColor = this.tileStyle.textColor;
    let { rune } = this.props;
    if (rune.toUpperCase() !== rune) {
      letterColor = this.tileStyle.blankTextColor;
      rune = rune.toUpperCase();
    }
    return (
      <text
        x={(this.props.width / 2) - (this.props.width / 30)}
        y={(this.props.height / 2) - (this.props.width / 30)}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily={fontFamily}
        fontWeight="500"
        fontSize="130%"
        stroke={letterColor}
        fill={letterColor}
      >{rune}
      </text>
    );
  }

  render() {
    const scaleFactor = 0.95;
    const realX = this.props.x + (((1 - scaleFactor) * this.props.width) / 2);
    const realY = this.props.y + (((1 - scaleFactor) * this.props.height) / 2);
    const transform = `translate(${realX}, ${realY})`;

    return (
      <g transform={transform}>
        <rect
          width={scaleFactor * this.props.width}
          height={scaleFactor * this.props.height}
          strokeWidth="0.5px"
          stroke={this.tileStyle.outline}
          fill={this.tileStyle.color}
          rx={3}
          ry={3}
        />
        {this.renderTileLetter()}
        {this.renderPointValue()}
      </g>);
  }
}

Tile.defaultProps = {
  lastPlayed: false,
};

Tile.propTypes = {
  rune: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  // Later, tile types, etc.
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  lastPlayed: PropTypes.bool,
};

export default Tile;
