import React from 'react';
import PropTypes from 'prop-types';

const Navbar = props => (
  <nav className="navbar navbar-inverse">
    <div className="container-fluid">
      <div className="navbar-header">
        <button
          type="button"
          className="navbar-toggle collapsed"
          data-toggle="collapse"
          data-target="#bs-example-navbar-collapse-1"
          aria-expanded="false"
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        <a className="navbar-brand" href="/crosswords">Aerolith Crosswords</a>
      </div>

      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul className="nav navbar-nav">
          <li className="dropdown">
            <a
              className="dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >Load New Game
              <span className="caret" />
            </a>
            <ul className="dropdown-menu">
              <li><a onClick={props.handleUpload}>Upload New Game</a></li>
              <li role="separator" className="divider" />
              <li><a href="#something">One more separated link</a></li>
            </ul>
          </li>
          <li>
            {props.errorMsg}
          </li>
        </ul>

      </div>
    </div>
  </nav>
);

Navbar.propTypes = {
  handleUpload: PropTypes.func.isRequired,
};

export default Navbar;

