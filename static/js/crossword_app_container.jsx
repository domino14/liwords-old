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
    };
    this.showUploadModal = this.showUploadModal.bind(this);
    this.onListUpload = this.onListUpload.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
    // Get this token from elsewhere.
    const tkn = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhZXJvbGl0aC5vcmciLCJ1c24iOiJDXHUwMGU5c2FyRGVsU29sYXIiLCJzdWIiOjEsImV4cCI6MTUxNDY2NzAzMn0.X0siTfziPtGusQ-gCXxGRvD-vNYcEBOu76KQKlNzhXc';
    this.crosswordsFetch = new CrosswordsFetch(tkn);
  }

  onListUpload(acceptedFiles, rejectedFiles) {
    if (!acceptedFiles.length) {
      window.console.log('Files rejected', rejectedFiles);
      return;
    }
    const data = new FormData();
    data.append('file', acceptedFiles[0]);
    this.crosswordsFetch.uploadwrap('gcg_upload', data)
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
};

export default CrosswordAppContainer;

