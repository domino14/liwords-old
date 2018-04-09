import React from 'react';
import PropTypes from 'prop-types';

class Root extends React.Component {
  componentWillMount() {
    const { initEnvironment, loadGame } = this.props;
    initEnvironment();
    loadGame({
      ...window.Globals.gameRepr,
    });
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
  loadGame: PropTypes.func.isRequired,
};

export default Root;
