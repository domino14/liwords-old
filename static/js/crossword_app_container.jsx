import React from 'react';
import PropTypes from 'prop-types';

import Navbar from './navbar';
import ErrorView from './error_view';
import Viewer from './viewer/viewer';
import GCGUploadModal from './modal/gcg_upload';
import CrosswordsFetch, { FetchErrors } from './fetch_wrapper';

import Utils from './util';

class CrosswordAppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      currentGCGLink: '',
      gameComments: [],
      errorType: '',
      username: '',
    };
    this.showUploadModal = this.showUploadModal.bind(this);
    this.onListUpload = this.onListUpload.bind(this);
    this.submitComment = this.submitComment.bind(this);
    this.requestComments = this.requestComments.bind(this);
    this.handleFetchError = this.handleFetchError.bind(this);
    this.crosswordsFetch = new CrosswordsFetch();
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
    this.crosswordsFetch.restwrap('/jwt/', 'GET', {})
      .then((result) => {
        this.crosswordsFetch.setAuthToken(result.token);
        const parsedToken = Utils.parseJWT(result.token);
        this.setState({
          username: parsedToken.usn,
        });
      })
      .catch(() => {
        this.handleFetchError(new Error(FetchErrors.CouldNotObtainToken));
      });
  }

  onListUpload(acceptedFiles, rejectedFiles) {
    if (!acceptedFiles.length) {
      window.console.log('Files rejected', rejectedFiles);
      return;
    }
    const data = new FormData();
    data.append('file', acceptedFiles[0]);
    this.crosswordsFetch.uploadwrap(data)
      .then((result) => {
        const link = `${window.location.protocol}//${window.location.host}${result}`;
        window.console.log('Setting link to', link);
        this.setState({
          currentGCGLink: link,
        });
      })
      .catch((error) => {
        // Could be an expired token; in that case, refresh token.
        window.console.log(error.message);
      });
  }

  submitComment(comment, turnNumber) {
    const data = {
      comment: {
        comment,
        turn_num: turnNumber,
        game_id: this.props.gameID,
      },
    };
    this.crosswordsFetch.restwrap(
      '/crosswords/api/comments', 'POST',
      data, 'application/json',
    )
      .then((result) => {
        this.setState((previousState) => {
          previousState.gameComments.push(result.data);
          return {
            gameComments: previousState.gameComments,
          };
        });
      })
      .catch((error) => {
        this.handleFetchError(error);
      });
  }

  requestComments() {
    this.crosswordsFetch.restwrap('/crosswords/api/comments', 'GET', {
      game_id: this.props.gameID,
    })
      .then((result) => {
        this.setState({
          gameComments: result.data,
        });
      })
      .catch((error) => { this.handleFetchError(error); });
  }

  showUploadModal() {
    this.gcgUploadModal.show();
  }

  handleResize() {
    this.setState({
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
    });
  }

  handleFetchError(error) {
    window.console.log('Caught an error', error);
    this.setState({
      errorType: error.message,
    });
  }

  render() {
    return (
      <div>
        <Navbar
          handleUpload={this.showUploadModal}
        />
        <div className="row">
          <div className="col-lg-6 col-md-5 col-lg-offset-3 col-md-offset-3">
            <ErrorView
              errorType={this.state.errorType}
            />
          </div>
        </div>
        <div className="container-fluid">
          <Viewer
            gameRepr={this.props.gameRepr}
            viewMode={this.props.viewMode}
            submitComment={this.submitComment}
            requestComments={this.requestComments}
            gameComments={this.state.gameComments}
            gameID={this.props.gameID}
            windowWidth={this.state.windowWidth}
            windowHeight={this.state.windowHeight}
            username={this.state.username}
          />
        </div>

        <GCGUploadModal
          ref={(el) => {
            this.gcgUploadModal = el;
          }}
          onListUpload={this.onListUpload}
          currentGCG={this.state.currentGCGLink}
        />
      </div>
    );
  }
}

CrosswordAppContainer.propTypes = {
  gameRepr: PropTypes.shape({
    version: PropTypes.number.isRequired,
    turns: PropTypes.arrayOf(PropTypes.object).isRequired,
    players: PropTypes.arrayOf(PropTypes.shape({
      real_name: PropTypes.string,
      p_number: PropTypes.string,
      nick: PropTypes.string,
    })),
  }).isRequired,
  viewMode: PropTypes.string.isRequired,
  gameID: PropTypes.string.isRequired,
};

export default CrosswordAppContainer;

