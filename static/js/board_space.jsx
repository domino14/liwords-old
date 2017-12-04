import React from 'react';
import PropTypes from 'prop-types';

const fontFamily = 'Arial,Geneva,Helvetica,Helv,sans-serif';

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
      bonusText: '2WS',
    },
    '=': {
      fillColor: '#D12727',
      strokeColor: '#BB3D3D',
      bonusText: '3WS',
    },
    '\'': {
      fillColor: '#90B6FA',
      strokeColor: '#77A2EF',
      bonusText: '2LS',
    },
    '"': {
      fillColor: '#7D6AEF',
      strokeColor: '#7C6ED3',
      bonusText: '3LS',
    },
    ' ': {
      fillColor: '#eeeeee',
      strokeColor: '#b0b0b0',
      bonusText: '',
    },
  },
};

const BoardSpace = (props) => {
  const transform = `translate(${props.x},${props.y})`;
  const bonusProps = BonusTypesEnum.properties[props.bonusType];
  const { strokeColor, fillColor } = bonusProps;
  let bonusLabel = null;
  if (props.showBonusLabel && bonusProps.bonusText !== '') {
    bonusLabel = (
      <text
        x={props.width / 2}
        y={props.height / 2}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily={fontFamily}
        fontSize="60%"
        stroke="#DADADB"
        fill="#DADADB"
        strokeWidth="0.5px"
      >{bonusProps.bonusText}
      </text>
    );
  }

  return (
    <g transform={transform}>
      <rect
        width={props.width}
        height={props.height}
        strokeWidth="0.5px"
        stroke={strokeColor}
        fill={fillColor}
      />
      {bonusLabel}
    </g>);
};


BoardSpace.defaultProps = {
  bonusType: ' ',
  startingSquare: false,
};

BoardSpace.propTypes = {
  bonusType: PropTypes.string,
  startingSquare: PropTypes.bool,
  showBonusLabel: PropTypes.bool,
  // Later, tile types, etc.
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default BoardSpace;
