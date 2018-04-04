import React from 'react';
import { connect } from 'react-redux';

import { initEnvironment } from '../actions/environment_actions';
import { loadGame } from '../actions/game_actions';
import Root from '../components/root';

const RootContainer = props => <Root {...props} />;

const mapStateToProps = (state) => {
  console.log('mapStateToProps received state', state);
  return {};
};

export default connect(mapStateToProps, {
  // An object here with action creators is used as a mapDispatchToProps
  initEnvironment,
  loadGame,
})(RootContainer);
