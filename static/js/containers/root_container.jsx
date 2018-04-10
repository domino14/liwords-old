import React from 'react';
import { connect } from 'react-redux';

import { initEnvironment } from '../actions/environment_actions';
import { loadGame } from '../actions/game_actions';
import Root from '../components/root';

const RootContainer = props => <Root {...props} />;

const mapStateToProps = state => ({
  windowWidth: state.environment.width,
  windowHeight: state.environment.height,
  game: state.game,
});

export default connect(mapStateToProps, {
  // An object here with action creators is used as a mapDispatchToProps
  initEnvironment,
  loadGame,
})(RootContainer);
