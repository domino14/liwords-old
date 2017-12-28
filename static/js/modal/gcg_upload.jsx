import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

import ModalSkeleton from './modal_skeleton';

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
        <div className="modal-body" style={{ height: '60vh', overflowY: 'auto' }} >
          <Dropzone
            ref={(dropzone) => {
              this.dropzone = dropzone;
            }}
            onDrop={this.props.onListUpload}
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
      </ModalSkeleton>);
  }
}

GCGUploadModal.propTypes = {
  onListUpload: PropTypes.func.isRequired,
};

export default GCGUploadModal;
