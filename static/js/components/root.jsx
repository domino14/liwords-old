import React from 'react';
import PropTypes from 'prop-types';

class Root extends React.Component {
  componentWillMount() {
    const { initEnvironment } = this.props;
    initEnvironment();
  }

  render() {
    return (

    );
  }
}

Root.propTypes = {
  initEnvironment: PropTypes.func.isRequired(),
}

export default Root;
