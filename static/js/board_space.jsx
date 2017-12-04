import React from 'react';
import PropTypes from 'prop-types';


const BonusTypesEnum = {
  DOUBLE_WORD: '-',
  TRIPLE_WORD: '=',
  QUADRUPLE_WORD: '~',
  DOUBLE_LETTER: '\'',
  TRIPLE_LETTER: '"',
  QUADRUPLE_LETTER: '^',
  STARTING_SQUARE: '*',

  properties: {
    '-': {
      fillColor: '#F58BE0',
      strokeColor: '#FE94B6',
    },
    '=': {
      fillColor: '#D12727',
      strokeColor: '#BB3D3D',
    },
    '\'': {
      fillColor: '#90B6FA',
      strokeColor: '#77A2EF',
    },
    '"': {
      fillColor: '#7D6AEF',
      strokeColor: '#7C6ED3',
    },
    ' ': {
      fillColor: '#eeeeee',
      strokeColor: '#b0b0b0',
    },
  },
};

const BoardSpace = (props) => {
  const transform = `translate(${props.x},${props.y})`;
  // WTF the error below!?
  const { strokeColor, fillColor } = BonusTypesEnum.properties[props.bonusType];

  return (
    <g transform={transform}>
      <rect
        width={props.width}
        height={props.height}
        strokeWidth="0.5px"
        stroke={strokeColor}
        fill={fillColor}
      />
    </g>);
};


BoardSpace.defaultProps = {
  bonusType: ' ',
  startingSquare: false,
};

BoardSpace.propTypes = {
  bonusType: PropTypes.string,
  startingSquare: PropTypes.boolean,
  tileRune: PropTypes.string,
  // Later, tile types, etc.
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default BoardSpace;
