import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

import ModalSkeleton from './modal_skeleton';

const GCGLink = props => (
  props.link ?
    <div>
      Uploaded game! You can access it here:
      <div style={{ marginTop: 5 }}>
        <a href={`${props.link}`}>{props.link}</a>
      </div>
    </div> : null
);

GCGLink.propTypes = {
  link: PropTypes.string.isRequired,
};

class GCGUploadModal extends React.Component {
  show() {
    this.modal.show();
  }

  render() {
    return (
      <ModalSkeleton
        title="GCG Upload"
        modalClass="solutions-modal"
        size=""
        ref={(el) => {
          this.modal = el;
        }}
      >
        <div className="modal-body">
          <div className="row">
            <div className="col-lg-12">
              <Dropzone
                ref={(dropzone) => {
                  this.dropzone = dropzone;
                }}
                onDrop={this.props.onGCGUpload}
                multiple={false}
                maxSize={100000}
                style={{ display: 'none' }}
              />
              <button
                className="btn btn-info"
                onClick={() => this.dropzone.open()}
              >Upload a file
              </button>
            </div>
          </div>

          <div className="row" style={{ marginTop: '10px' }}>
            <div className="col-lg-12">
              <GCGLink
                link={this.props.currentGCG}
              />
            </div>
          </div>
        </div>
      </ModalSkeleton>);
  }
}

GCGUploadModal.defaultProps = {
  currentGCG: '',
};

GCGUploadModal.propTypes = {
  onGCGUpload: PropTypes.func.isRequired,
  currentGCG: PropTypes.string,
};

export default GCGUploadModal;
