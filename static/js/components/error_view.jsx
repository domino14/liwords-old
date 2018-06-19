import React from 'react';
import PropTypes from 'prop-types';

import { FetchErrors } from '../utils/api_utils';

const AlertText = (props) => {
  let heading = null;
  if (props.errorHeading) {
    heading = <strong>Error: </strong>;
  }
  return (
    <span>
      {heading}{props.preamble}
      <a href={props.href} className="alert-link">{props.linkText}</a>
      {props.postamble}
    </span>
  );
};

AlertText.defaultProps = {
  errorHeading: false,
};

AlertText.propTypes = {
  errorHeading: PropTypes.bool,
  preamble: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
  linkText: PropTypes.string.isRequired,
  postamble: PropTypes.string.isRequired,
};

function loc() {
  return `${window.location.pathname}${window.location.hash}`;
}

const ErrorView = (props) => {
  if (!props.errorType) {
    return null;
  }
  let err;
  let alertType;
  switch (props.errorType) {
    case FetchErrors.CouldNotRefreshToken:
      err = (
        <AlertText
          href={`/accounts/login?next=${loc()}`}
          preamble="Please "
          linkText="log back in"
          postamble=" and try again."
          errorHeading
        />);
      alertType = 'danger';
      break;

    case FetchErrors.CouldNotObtainToken:
      err = (
        <AlertText
          href={`/accounts/login?next=${loc()}`}
          preamble="If you would like to participate in this discussion please "
          linkText="log in"
          postamble="."
        />);
      alertType = 'info';
      break;
    default:
      err = null;
  }
  return (
    <div className={`alert alert-${alertType} alert-dismissible`} role="alert">
      <button
        type="button"
        className="close"
        data-dismiss="alert"
        aria-label="Close"
      ><span aria-hidden="true">&times;</span>
      </button>
      {err}
    </div>
  );
};

ErrorView.propTypes = {
  errorType: PropTypes.string.isRequired,
};

export default ErrorView;
