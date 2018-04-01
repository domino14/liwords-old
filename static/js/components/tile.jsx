import React from 'react';
import PropTypes from 'prop-types';

const fontFamily = 'Arial,Geneva,Helvetica,Helv,sans-serif';

const TILE_STYLES = {
  aeroBlue: {
    color: '#4417b7',
    outline: '#492889',
    textColor: '#ffffff',
    blankTextColor: '#11fefe',
  },
  aeroBlueJustPlayed: {
    color: '#175cb7',
    outline: '#492889',
    textColor: '#ffffff',
    blankTextColor: '#11fefe',
  },
  aeroOrange: {
    color: '#fdb72b',
    outline: '#a57719',
    textColor: '#000000',
    blankTextColor: '#fe1111',
  },
};

// Get the desired font size and weights as a function of the width.
function tileProps(width) {
  // This formula is not the most scientific. The tiles look optimal at 130%
  // if the tile size is 31.
  const size = (130 / 31) * width;
  let weight = '500';
  if (width < 24) {
    weight = '300';
  }
  const valueSize = (60 / 31) * width;
  return {
    size,
    weight,
    valueSize,
  };
}


const TileLetter = (props) => {
  let letterColor = props.tileStyle.textColor;
  let { rune } = props;
  if (rune.toUpperCase() !== rune) {
    letterColor = props.tileStyle.blankTextColor;
    rune = rune.toUpperCase();
  }

  const font = tileProps(props.width);

  return (
    <text
      x={(props.width / 2) - (props.width / 30)}
      y={(props.height / 2) - (props.width / 30)}
      textAnchor="middle"
      dominantBaseline="central"
      fontFamily={fontFamily}
      fontWeight={font.weight}
      fontSize={`${font.size}%`}
      stroke={letterColor}
      fill={letterColor}
    >{rune}
    </text>
  );
};

TileLetter.propTypes = {
  tileStyle: PropTypes.shape({
    color: PropTypes.string,
    outline: PropTypes.string,
    textColor: PropTypes.string,
    blankTextColor: PropTypes.string,
  }).isRequired,
  rune: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

const PointValue = (props) => {
  if (!props.value) {
    return null;
  }
  const font = tileProps(props.width);
  return (
    <text
      x={8 * (props.width / 10)}
      y={8 * (props.height / 10)}
      textAnchor="middle"
      dominantBaseline="central"
      fontFamily={fontFamily}
      fontSize={`${font.valueSize}%`}
      stroke={props.tileStyle.textColor}
      strokeWidth="0.05px"
      fill={props.tileStyle.textColor}
    >{props.value}
    </text>
  );
};

PointValue.propTypes = {
  tileStyle: PropTypes.shape({
    color: PropTypes.string,
    outline: PropTypes.string,
    textColor: PropTypes.string,
    blankTextColor: PropTypes.string,
  }).isRequired,
  value: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

const Tile = (props) => {
  const scaleFactor = 0.95;
  const realX = props.x + (((1 - scaleFactor) * props.width) / 2);
  const realY = props.y + (((1 - scaleFactor) * props.height) / 2);
  const transform = `translate(${realX}, ${realY})`;

  let tileStyle = TILE_STYLES.aeroBlue;
  if (props.lastPlayed) {
    tileStyle = TILE_STYLES.aeroBlueJustPlayed;
  }

  return (
    <g transform={transform}>
      <rect
        width={scaleFactor * props.width}
        height={scaleFactor * props.height}
        strokeWidth="0.5px"
        stroke={tileStyle.outline}
        fill={tileStyle.color}
        rx={3}
        ry={3}
      />
      <TileLetter
        tileStyle={tileStyle}
        rune={props.rune}
        width={props.width}
        height={props.height}
      />
      <PointValue
        tileStyle={tileStyle}
        value={props.value}
        width={props.width}
        height={props.height}
      />
    </g>);
};

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
export { tileProps };
