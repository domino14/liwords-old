import React from 'react';

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
    };
    this.showUploadModal = this.showUploadModal.bind(this);
    this.onListUpload = this.onListUpload.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
    // Get this token from elsewhere.
    const tkn = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJhZXJvbGl0aC5vcmciLCJ1c24iOiJDXHUwMGU5c2FyRGVsU29sYXIiLCJzdWIiOjEsImV4cCI6MTUxNDUxMzMwMX0.QusVRqciqHAj3PqCk6QHgvroyd-kmGt3oU0n-0OrOsw';
    this.crosswordsFetch = new CrosswordsFetch(tkn);
  }

  onListUpload(acceptedFiles, rejectedFiles) {
    console.log(acceptedFiles, rejectedFiles);
    if (!acceptedFiles.length) {
      console.log('Files rejected', rejectedFiles);
      return;
    }
    const data = new FormData();
    data.append('file', acceptedFiles[0]);
    this.crosswordsFetch.uploadwrap('gcg_upload', data)
      .then(result => window.console.log('got from upload', result))
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
          <Viewer />
        </div>

        <GCGUploadModal
          ref={(el) => {
            this.gcgUploadModal = el;
          }}
          onListUpload={this.onListUpload}
        />
      </div>
    );
  }
}

export default CrosswordAppContainer;
