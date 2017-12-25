import React from 'react';
import PropTypes from 'prop-types';

const CoordLabel = (props) => {
  const transform = `translate(${props.x},${props.y})`;
  return (
    <g transform={transform}>
      <rect
        width={props.rectWidth}
        height={props.rectHeight}
        strokeWidth="0.5px"
        stroke="#333333"
        fill="#ffd805"
      />
      <text
        x={props.rectWidth / 2}
        y={props.rectHeight / 2}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="Arial,Geneva,Helvetica,Helv,sans-serif"
        fontSize="60%"
        stroke="#333333"
        fill="#333333"
        strokeWidth="0.5px"
      >{props.label}
      </text>
    </g>
  );
};

CoordLabel.propTypes = {
  rectHeight: PropTypes.number.isRequired,
  rectWidth: PropTypes.number.isRequired,
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
};

export default CoordLabel;
