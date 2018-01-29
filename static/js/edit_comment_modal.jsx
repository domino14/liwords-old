/**
 * @fileOverview A modal for editing a comment. Perhaps we will eventually
 * provide a preview or reuse the modal for adding a comment in the first
 * place.
 */
import React from 'react';
import PropTypes from 'prop-types';

import ModalSkeleton from './modal/modal_skeleton';

class EditCommentModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentComment: '',
    };
    this.onCommentEdit = this.onCommentEdit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const commentChanged = this.props.commentToEdit &&
      this.props.commentToEdit.uuid !== nextProps.commentToEdit.uuid;
    const newCommentReceived = !this.props.commentToEdit;
    if (nextProps.commentToEdit && (commentChanged || newCommentReceived)) {
      this.setState({
        currentComment: nextProps.commentToEdit.comment,
      });
    }
  }

  onCommentEdit(event) {
    this.setState({
      currentComment: event.target.value,
    });
  }

  onSubmit(event) {
    this.props.onSubmitComment(this.state.currentComment);
    this.setState({
      currentComment: '',
    });
    event.preventDefault();
  }

  show() {
    this.modal.show();
  }

  render() {
    return (
      <ModalSkeleton
        title="Edit Comment"
        modalClass="edit-comment-modal"
        size=""
        ref={(el) => {
          this.modal = el;
        }}
      >
        <div className="modal-body">
          <div className="row">
            <div className="col-lg-12">
              <form>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    rows="4"
                    onChange={this.onCommentEdit}
                    value={this.state.currentComment}
                    placeholder="Add a comment for this turn..."
                  />
                </div>
                <button
                  className="btn btn-primary"
                  onClick={this.onSubmit}
                >Submit
                </button>
              </form>
            </div>
          </div>
        </div>

      </ModalSkeleton>
    );
  }
}

EditCommentModal.defaultProps = {
  commentToEdit: null,
};

EditCommentModal.propTypes = {
  onSubmitComment: PropTypes.func.isRequired,
  commentToEdit: PropTypes.shape({
    username: PropTypes.string,
    created: PropTypes.string,
    comment: PropTypes.string,
    uuid: PropTypes.string,
    edited: PropTypes.bool,
  }),
};

export default EditCommentModal;
