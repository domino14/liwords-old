import React from 'react';
import PropTypes from 'prop-types';

import { Route } from 'react-router';

import Navbar from './navbar';
import ErrorView from './error_view';
import Viewer from './viewer';
import GCGUploadModal from './gcg_upload';
import ListGamesModal from './list_games_modal';
import { GAME_LIST_LIMIT } from '../actions/viewer_ajax_actions';

class Root extends React.Component {
  componentWillMount() {
    const { initEnvironment, loadGame } = this.props;
    initEnvironment();
    loadGame({
      ...this.props.gameRepr,
    });

    this.showUploadModal = this.showUploadModal.bind(this);
    this.showListGamesModal = this.showListGamesModal.bind(this);
    this.onGCGUpload = this.onGCGUpload.bind(this);
  }

  componentDidMount() {
    this.props.login();
  }

  onGCGUpload(acceptedFiles, rejectedFiles) {
    if (!acceptedFiles.length) {
      window.console.log('Files rejected', rejectedFiles);
      return;
    }
    const data = new FormData();
    data.append('file', acceptedFiles[0]);
    this.props.uploadGCG(data);
  }

  showUploadModal() {
    this.gcgUploadModal.show();
  }

  showListGamesModal() {
    this.props.fetchGameList(this.props.gameListOffset);
    this.listGamesModal.show();
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
        requestComments={this.props.requestComments}
        gameComments={this.props.gameComments}
        gameID={this.props.gameID}
        initialTurnID={this.props.initialTurnID}
        windowWidth={this.props.windowWidth}
        windowHeight={this.props.windowHeight}
        username={this.props.username}
        routeMatch={match}
      />
    );
    return (
      <div>
        <Navbar
          handleUpload={this.showUploadModal}
          handleListGames={this.showListGamesModal}
        />
        <div className="row">
          <div className="col-lg-6 col-md-5 col-lg-offset-3 col-md-offset-3">
            <ErrorView
              errorType={this.props.fetchError}
            />
          </div>
        </div>
        <div className="container-fluid">
          <Route
            path={`${this.props.routeMatch.path}/games/:gameId`}
            render={viewer}
            exact
          />
          <Route
            path={`${this.props.routeMatch.path}/games/:gameId/:turnIdx`}
            render={viewer}
            exact
          />
        </div>

        <GCGUploadModal
          ref={(el) => {
            this.gcgUploadModal = el;
          }}
          onGCGUpload={this.onGCGUpload}
          currentGCG={this.props.uploadedGCGLink}
        />

        <ListGamesModal
          ref={(el) => {
            this.listGamesModal = el;
          }}
          games={this.props.gamesOnDisplay}
          fetchPrevious={this.props.fetchPreviousGames}
          fetchNext={this.props.fetchNextGames}
          hasPrevious={
            this.props.totalGames >
            this.props.gameListOffset + GAME_LIST_LIMIT}
          hasNext={this.props.gameListOffset > 0}
        />

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
  login: PropTypes.func.isRequired,
  requestComments: PropTypes.func.isRequired,
  uploadGCG: PropTypes.func.isRequired,
  fetchPreviousGames: PropTypes.func.isRequired,
  fetchNextGames: PropTypes.func.isRequired,
  fetchGameList: PropTypes.func.isRequired,

  uploadedGCGLink: PropTypes.string.isRequired,
  gameID: PropTypes.string.isRequired,
  initialTurnID: PropTypes.number.isRequired,

  gamesOnDisplay: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    user1: PropTypes.string.isRequired,
    user2: PropTypes.string.isRequired,
    uuid: PropTypes.string.isRequired,
  })).isRequired,
  totalGames: PropTypes.number.isRequired,
  gameListOffset: PropTypes.number.isRequired,

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
  gameComments: PropTypes.arrayOf(PropTypes.shape({
    uuid: PropTypes.string,
    comment: PropTypes.string,
    turn_num: PropTypes.number,
    username: PropTypes.string,
    created: PropTypes.string,
    edited: PropTypes.bool,
  })).isRequired,
  username: PropTypes.string,
  windowWidth: PropTypes.number.isRequired,
  windowHeight: PropTypes.number.isRequired,
  fetchError: PropTypes.string.isRequired,
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
