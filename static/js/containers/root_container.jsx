import React from 'react';
import { connect } from 'react-redux';

import { initEnvironment } from '../actions/environment_actions';
import {
  loadGame, gameViewerForward, gameViewerBackward,
  gameViewerFastForward, gameViewerFastBackward, gameViewerSeek,
} from '../actions/game_actions';
import Root from '../components/root';

const RootContainer = props => <Root {...props} />;

const mapStateToProps = state => {
  console.log('mapping state to props, state is', state);
  return {
    windowWidth: state.environment.width,
    windowHeight: state.environment.height,
    game: state.game,
  };
};

export default connect(mapStateToProps, {
  // An object here with action creators is used as a mapDispatchToProps
  initEnvironment,
  loadGame,
  gameViewerForward,
  gameViewerBackward,
  gameViewerFastForward,
  gameViewerFastBackward,
  gameViewerSeek,
})(RootContainer);
