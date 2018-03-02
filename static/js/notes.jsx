import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment-timezone';
import ReactMarkdown from 'react-markdown';

import EditCommentModal from './edit_comment_modal';

function timeFormatter(dtstring) {
  return moment(dtstring).tz(moment.tz.guess()).format('MMMM Do YYYY, h:mm:ss a');
}

const Comment = (props) => {
  let commentToolbar = null;
  if (props.loggedInUsername === props.username) {
    commentToolbar = (
      <span className="text-danger">
        <span
          className="glyphicon glyphicon-pencil"
          aria-hidden="true"
          onClick={props.onEdit}
        />&nbsp;
        <span
          className="glyphicon glyphicon-trash"
          aria-hidden="true"
          onClick={props.onDelete}
        />
      </span>
    );
  }
  return (
    <div>
      <hr />
      <div>
        <h5>{`${props.username} @ ${props.date}${props.edited ? '*' : ''}`} {commentToolbar}</h5>
        <ReactMarkdown source={props.comment} />
      </div>
    </div>
  );
};

Comment.defaultProps = {
  edited: false,
};

Comment.propTypes = {
  username: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  edited: PropTypes.bool,
  loggedInUsername: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

const Comments = (props) => {
  const divider = null;
  const { onEdit, onDelete } = props;
  const comments = props.comments.map(comment => (
    <Comment
      key={comment.uuid}
      username={comment.username}
      date={timeFormatter(comment.created)}
      comment={comment.comment}
      loggedInUsername={props.loggedInUsername}
      edited={comment.edited}
      onEdit={() => onEdit(comment)}
      onDelete={() => onDelete(comment.uuid)}
    />));
  return (
    <div
      style={{ maxHeight: 350, overflowY: 'scroll' }}
      ref={(domNode) => {
        if (domNode === null) {
          return;
        }
        if (domNode.scrollTop === 0) {
          // Only scroll down if we are at the very top.
          domNode.scrollTop = domNode.scrollHeight; // eslint-disable-line no-param-reassign
        }
      }}
    >
      {divider}
      <div>
        {comments}
      </div>
    </div>
  );
};

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    username: PropTypes.string,
    created: PropTypes.string,
    comment: PropTypes.string,
    uuid: PropTypes.string,
    edited: PropTypes.bool,
  })).isRequired,
  loggedInUsername: PropTypes.string.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

class NotesAndComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentComment: '',
      commentToEdit: null,
    };
    this.onCommentTyping = this.onCommentTyping.bind(this);
    this.onEditCommentClicked = this.onEditCommentClicked.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onCommentTyping(event) {
    this.setState({
      currentComment: event.target.value,
    });
  }

  onEditCommentClicked(comment) {
    this.editCommentModal.show();
    this.setState({
      commentToEdit: comment,
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

        <Comments
          comments={this.props.comments}
          loggedInUsername={this.props.loggedInUsername}
          onEdit={this.onEditCommentClicked}
          onDelete={this.props.onDeleteComment}
        />
        <EditCommentModal
          commentToEdit={this.state.commentToEdit}
          onSubmitComment={this.props.onEditComment}
          ref={(el) => {
            this.editCommentModal = el;
          }}
        />

        <hr />
        <form>
          <div className="form-group">
            <textarea
              className="form-control"
              rows="4"
              onChange={this.onCommentTyping}
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

NotesAndComments.propTypes = {
  gcgNote: PropTypes.string.isRequired,
  addlDescription: PropTypes.string.isRequired,
  onSubmitComment: PropTypes.func.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    uuid: PropTypes.string,
    comment: PropTypes.string,
    turn_num: PropTypes.number,
    username: PropTypes.string,
    created: PropTypes.string,
    edited: PropTypes.bool,
  })).isRequired,
  loggedInUsername: PropTypes.string.isRequired,

  onDeleteComment: PropTypes.func.isRequired,
  onEditComment: PropTypes.func.isRequired,
};

export default NotesAndComments;
