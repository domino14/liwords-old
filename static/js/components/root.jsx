import React from 'react';
import PropTypes from 'prop-types';

class Root extends React.Component {
  componentWillMount() {
    const { initEnvironment } = this.props;
    console.log('initEnvironment', initEnvironment);
    initEnvironment();
  }

  render() {
    return (
      <div>
        Hello Redux world!
      </div>
    );
  }
}

Root.propTypes = {
  initEnvironment: PropTypes.func.isRequired,
};

export default Root;
