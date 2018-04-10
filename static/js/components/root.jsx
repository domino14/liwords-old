import React from 'react';
import PropTypes from 'prop-types';

import Navbar from './navbar';
import ErrorView from './error_view';
import Viewer from './viewer';

class Root extends React.Component {
  componentWillMount() {
    const { initEnvironment, loadGame } = this.props;
    initEnvironment();
    loadGame({
      ...this.props.gameRepr,
    });
  }

  render() {
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
          <Viewer

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
          />
        </div>
      </div>
    );
  }
}

Root.propTypes = {
  initEnvironment: PropTypes.func.isRequired,
  loadGame: PropTypes.func.isRequired,

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
    version: PropTypes.string,
    latestTurn: PropTypes.object,
  }).isRequired,

  username: PropTypes.string.isRequired,
  windowWidth: PropTypes.number.isRequired,
  windowHeight: PropTypes.number.isRequired,
};

export default Root;
