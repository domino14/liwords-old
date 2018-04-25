import React from 'react';
import PropTypes from 'prop-types';

const TurnsNavbar = props => (
  <div className="btn-toolbar" role="toolbar">
    <div className="btn-group" role="group">
      <button
        type="button"
        className="btn btn-default"
        onClick={() => props.seek(-1, props.gameId)}
        disabled={props.turnIdx === -1}
      >
        <span className="glyphicon glyphicon-fast-backward" />
      </button>
      <button
        type="button"
        className="btn btn-default"
        onClick={() => props.seek(props.turnIdx - 1, props.gameId)}
        disabled={props.turnIdx === -1}
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
        onClick={() => props.seek(props.turnIdx + 1, props.gameId)}
        disabled={props.turnIdx === props.maxTurnIdx}
      >
        <span className="glyphicon glyphicon-step-forward" />
      </button>
      <button
        type="button"
        className="btn btn-default"
        onClick={() => props.seek(props.maxTurnIdx, props.gameId)}
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
  gameId: PropTypes.string.isRequired,
};

export default TurnsNavbar;
