import React from 'react';
import { connect } from 'react-redux';

import { initEnvironment } from '../actions/environment_actions';
import {
  loadGame, gameViewerSeek,
} from '../actions/game_actions';
import { requestComments, uploadGCG } from '../actions/viewer_ajax_actions';
import { login } from '../actions/session_actions';

import Root from '../components/root';

const RootContainer = props => <Root {...props} />;

const mapStateToProps = state => ({
  windowWidth: state.environment.width,
  windowHeight: state.environment.height,
  game: state.game,
  username: state.session.username,
  gameComments: state.viewer.comments,
  uploadedGCGLink: state.gamelist.uploadedGCGLink,
});

export default connect(mapStateToProps, {
  // An object here with action creators is used as a mapDispatchToProps
  initEnvironment,
  loadGame,
  login,
  requestComments,
  uploadGCG,



  gameViewerSeek,
})(RootContainer);
