import React from 'react';
import PropTypes from 'prop-types';

const Notes = props => (
  <div>
    <span className="text-muted">{props.addlDescription}</span>
    <div className="panel panel-default">
      <div className="panel-body">
        {props.gcgNote}
      </div>
    </div>
  </div>
);


Notes.propTypes = {
  turnIdx: PropTypes.number.isRequired,
  gcgNote: PropTypes.string.isRequired,
  addlDescription: PropTypes.string.isRequired,
};

export default Notes;
