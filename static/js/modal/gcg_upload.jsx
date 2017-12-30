import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

import ModalSkeleton from './modal_skeleton';

const GCGLink = props => (
  props.link ? <a href={`${props.link}`}>{props.link}</a> : null
);

GCGLink.propTypes = {
  link: PropTypes.string.isRequired,
};

class GCGUploadModal extends React.Component {
  show() {
    this.modal.show();
  }

  render() {
    console.log('curr gcg', this.props.currentGCG);
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
          <div className="row">
            <div className="col-lg-12">
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
          </div>

          <div className="row">
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
  onListUpload: PropTypes.func.isRequired,
  currentGCG: PropTypes.string,
};

export default GCGUploadModal;
