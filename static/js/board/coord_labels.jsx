import React from 'react';
import PropTypes from 'prop-types';

import CoordLabel from './coord_label';

const BoardCoordLabels = (props) => {
  const labels = [];
  for (let i = 0; i < props.gridWidth; i += 1) {
    labels.push(<CoordLabel
      rectHeight={props.colLabelHeight}
      rectWidth={props.boardSquareWidth}
      x={(i * props.boardSquareWidth) + props.rowLabelWidth}
      y={0}
      label={String.fromCharCode(i + 'A'.charCodeAt(0))}
      key={`collbl${i}`}
    />);
  }

  for (let i = 0; i < props.gridHeight; i += 1) {
    labels.push(<CoordLabel
      rectHeight={props.boardSquareHeight}
      rectWidth={props.rowLabelWidth}
      x={0}
      y={(i * props.boardSquareHeight) + props.colLabelHeight}
      label={String(i + 1)}
      key={`rowlbl${i}`}
    />);
  }
  return labels;
};

BoardCoordLabels.propTypes = {
  gridWidth: PropTypes.number.isRequired,
  gridHeight: PropTypes.number.isRequired,

  rowLabelWidth: PropTypes.number.isRequired,
  colLabelHeight: PropTypes.number.isRequired,
  boardSquareWidth: PropTypes.number.isRequired,
  boardSquareHeight: PropTypes.number.isRequired,
};

export default BoardCoordLabels;

