import React from 'react';
import PropTypes from 'prop-types';

const Notes = props => (
  <div className="panel panel-default">
    <div className="panel-body">
      {props.gcgNote}
    </div>
  </div>
);

Notes.propTypes = {
  turnIdx: PropTypes.number.isRequired,
  gcgNote: PropTypes.string.isRequired,
};

export default Notes;
