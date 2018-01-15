import React from 'react';
import PropTypes from 'prop-types';

import Navbar from './navbar';
import Viewer from './viewer/viewer';
import GCGUploadModal from './modal/gcg_upload';
import CrosswordsFetch from './fetch_wrapper';

class CrosswordAppContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      currentGCGLink: '',
      jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhZXJvbGl0aC5vcmciLCJ1c24iOiJjZXNhcjIiLCJzdWIiOjIsImV4cCI6MTUxNTc5OTg4NH0.VLZilcYomP0XXlrcF3De6R7izGnBc4D1xANTH_CbesI',
      gameComments: [],
    };
    this.showUploadModal = this.showUploadModal.bind(this);
    this.onListUpload = this.onListUpload.bind(this);
    this.submitComment = this.submitComment.bind(this);
    this.requestComments = this.requestComments.bind(this);

    this.crosswordsFetch = new CrosswordsFetch(this.state.jwt);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
    // Get this token from elsewhere.
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
      'api/comments', 'POST',
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
        window.console.log(error.message);
      });
  }

  requestComments() {
    this.crosswordsFetch.restwrap('api/comments', 'GET', {
      game_id: this.props.gameID,
    })
      .then((result) => {
        this.setState({
          gameComments: result.data,
        });
      })
      .catch(error => window.console.log(error.message));
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

  render() {
    return (
      <div>
        <Navbar
          handleUpload={this.showUploadModal}
        />
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
  }),
  viewMode: PropTypes.string.isRequired,
  gameID: PropTypes.string.isRequired,
};

export default CrosswordAppContainer;

