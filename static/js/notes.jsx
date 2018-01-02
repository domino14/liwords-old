import React from 'react';
import PropTypes from 'prop-types';

class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentComment: '',
    };
    this.onCommentEdit = this.onCommentEdit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
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

  render() {
    return (
      <div>
        <span className="text-muted">{this.props.addlDescription}</span>
        <div
          className={`panel panel-default ${this.props.gcgNote === '' ? 'hidden' : ''}`}
        >
          <div className="panel-body">
            {this.props.gcgNote}
          </div>
        </div>
        <hr />
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
    );
  }
}

Notes.propTypes = {
  turnIdx: PropTypes.number.isRequired,
  gcgNote: PropTypes.string.isRequired,
  addlDescription: PropTypes.string.isRequired,
  onSubmitComment: PropTypes.func.isRequired,
};

export default Notes;
