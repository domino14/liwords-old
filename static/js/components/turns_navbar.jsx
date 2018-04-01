import React from 'react';
import PropTypes from 'prop-types';

const TurnsNavbar = props => (
  <div className="btn-toolbar" role="toolbar">
    <div className="btn-group" role="group">
      <button type="button" className="btn btn-default" onClick={props.fastBackward}>
        <span className="glyphicon glyphicon-fast-backward" />
      </button>
      <button type="button" className="btn btn-default" onClick={props.stepBackward}>
        <span className="glyphicon glyphicon-step-backward" />
      </button>
    </div>
    <div className="btn-group" role="group">
      <button type="button" className="btn btn-default" onClick={props.analyze}>
        <span className="glyphicon glyphicon-education" />
      </button>
    </div>
    <div className="btn-group" role="group">
      <button type="button" className="btn btn-default" onClick={props.stepForward}>
        <span className="glyphicon glyphicon-step-forward" />
      </button>
      <button type="button" className="btn btn-default" onClick={props.fastForward}>
        <span className="glyphicon glyphicon-fast-forward" />
      </button>
    </div>
  </div>
);

TurnsNavbar.propTypes = {
  stepForward: PropTypes.func.isRequired,
  stepBackward: PropTypes.func.isRequired,
  fastForward: PropTypes.func.isRequired,
  fastBackward: PropTypes.func.isRequired,
  analyze: PropTypes.func.isRequired,
};

export default TurnsNavbar;
