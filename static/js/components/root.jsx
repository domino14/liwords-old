import React from 'react';
import PropTypes from 'prop-types';

import { Route } from 'react-router';

import Navbar from './navbar';
import ErrorView from './error_view';
import Viewer from './viewer';

class Root extends React.Component {
  componentWillMount() {
    const { initEnvironment, loadGame, gameViewerSeek } = this.props;
    console.log('proppies', this.props);
    initEnvironment();
    loadGame({
      ...this.props.gameRepr,
    });
    gameViewerSeek(-1);
  }

  render() {
    const viewer = ({ match }) => (
      <Viewer
        gameViewerSeek={this.props.gameViewerSeek}

        game={this.props.game}
        viewMode={this.props.viewMode}
        submitComment={this.submitComment}
        editComment={this.editComment}
        deleteComment={this.deleteComment}
        requestComments={this.requestComments}
        // gameComments={this.state.gameComments}
        gameID={this.props.gameID}
        windowWidth={this.props.windowWidth}
        windowHeight={this.props.windowHeight}
        username={this.props.username}
        routeMatch={match}
      />
    );
    return (
      <div>
        <Navbar />
        <div className="row">
          <div className="col-lg-6 col-md-5 col-lg-offset-3 col-md-offset-3">
            <ErrorView
              // errorType={this.state.errorType}
            />
          </div>
        </div>
        <div className="container-fluid">
          <Route
            path={`${this.props.routeMatch.path}/games/:gameId`}
            render={viewer}
            // component={Viewer}
          />
        </div>
      </div>
    );
  }
}

Root.defaultProps = {
  username: '',
};

Root.propTypes = {
  initEnvironment: PropTypes.func.isRequired,
  loadGame: PropTypes.func.isRequired,
  gameViewerSeek: PropTypes.func.isRequired,

  gameID: PropTypes.string.isRequired,
  viewMode: PropTypes.string.isRequired,
  game: PropTypes.shape({
    currentRack: PropTypes.string,
    currentUser: PropTypes.string,
    lastPlayedLetters: PropTypes.object,
    moveIndex: PropTypes.number,
    perPlayerTurns: PropTypes.object,
    players: PropTypes.array,
    pool: PropTypes.object,
    scores: PropTypes.object,
    tilesLayout: PropTypes.arrayOf(PropTypes.string),
    turns: PropTypes.array,
    version: PropTypes.number,
    latestTurn: PropTypes.object,
  }).isRequired,

  username: PropTypes.string,
  windowWidth: PropTypes.number.isRequired,
  windowHeight: PropTypes.number.isRequired,

  gameRepr: PropTypes.shape({
    version: PropTypes.number.isRequired,
    turns: PropTypes.arrayOf(PropTypes.object).isRequired,
    players: PropTypes.arrayOf(PropTypes.shape({
      real_name: PropTypes.string,
      p_number: PropTypes.string,
      nick: PropTypes.string,
    })),
    originalGCG: PropTypes.string,
  }).isRequired,
  routeMatch: PropTypes.shape({
    params: PropTypes.object,
    isExact: PropTypes.boolean,
    path: PropTypes.string,
    url: PropTypes.string,
  }).isRequired,
};

export default Root;
