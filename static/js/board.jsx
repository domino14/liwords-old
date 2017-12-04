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
      color: '#F58BE0',
    },
    '=': {
      color: '#D12727',
    },
    '\'': {
      color: '#90B6FA',
    },
    '"': {
      color: '#7D6AEF',
    },
  },
};

const BoardSpace = (props) => {
  const strokeProperties = BonusTypesEnum.properties[props.bonusType];
  const transform = `translate(${props.x},${props.y})`;
  let strokeColor;
  if (strokeProperties) {
    strokeColor = strokeProperties.color;
  } else {
    strokeColor = null;
  }

  return (
    <g transform={transform}>
      <rect
        width={props.width}
        height={props.height}
        strokeWidth="0.5px"
        stroke={strokeColor}
        fill={strokeColor}
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


class Board extends React.Component {
  // Use SVG to render.

  renderSpaces() {
    const squareWidth = this.props.boardWidth / this.props.gridWidth;
    const squareHeight = this.props.boardHeight / this.props.gridHeight;

    const spaces = [];
    for (let y = 0; y < this.props.gridHeight; y += 1) {
      for (let x = 0; x < this.props.gridWidth; x += 1) {
        const sq = this.props.gridLayout[y][x];
        console.log('The space at', x, y, 'is a', sq);
        spaces.push(<BoardSpace
          bonusType={sq}
          width={squareWidth}
          height={squareHeight}
          x={x * squareWidth}
          y={y * squareHeight}
        />);
      }
    }
    return spaces;
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

  showBonusLabels: PropTypes.bool,

  boardWidth: PropTypes.number.isRequired,
  boardHeight: PropTypes.number.isRequired,

};

export default Board;
