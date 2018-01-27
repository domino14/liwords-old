import React from 'react';
import PropTypes from 'prop-types';

const ErrorView = (props) => {
  if (!props.errorMsg) {
    return null;
  }
  return (
    <div className="alert alert-danger alert-dismissible" role="alert">
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
      ><span aria-hidden="true">&times;</span>
      </button>
      <strong>Error:</strong> {props.errorMsg}
    </div>
  );
};

ErrorView.propTypes = {
  errorMsg: PropTypes.string.isRequired,
};

export default ErrorView;