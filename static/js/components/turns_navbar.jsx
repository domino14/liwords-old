import React from 'react';
import PropTypes from 'prop-types';

const TurnsNavbar = props => (
  <div className="btn-toolbar" role="toolbar">
    <div className="btn-group" role="group">
      <button
        type="button"
        className="btn btn-default"
        onClick={props.seek(0)}
        disabled={props.turnIdx === 0}
      >
        <span className="glyphicon glyphicon-fast-backward" />
      </button>
      <button
        type="button"
        className="btn btn-default"
        onClick={props.seek(props.turnIdx - 1)}
        disabled={props.turnIdx === 0}
      >
        <span className="glyphicon glyphicon-step-backward" />
      </button>
    </div>
    <div className="btn-group" role="group">
      <button
        type="button"
        className="btn btn-default"
        onClick={props.analyze}
      >
        <span className="glyphicon glyphicon-education" />
      </button>
    </div>
    <div className="btn-group" role="group">
      <button
        type="button"
        className="btn btn-default"
        onClick={props.seek(props.turnIdx + 1)}
        disabled={props.turnIdx === props.maxTurnIdx}
      >
        <span className="glyphicon glyphicon-step-forward" />
      </button>
      <button
        type="button"
        className="btn btn-default"
        onClick={props.seek(props.maxTurnIdx)}
        disabled={props.turnIdx === props.maxTurnIdx}
      >
        <span className="glyphicon glyphicon-fast-forward" />
      </button>
    </div>
  </div>
);

TurnsNavbar.propTypes = {
  seek: PropTypes.func.isRequired,
  analyze: PropTypes.func.isRequired,
  turnIdx: PropTypes.number.isRequired,
  maxTurnIdx: PropTypes.number.isRequired,
};

export default TurnsNavbar;
