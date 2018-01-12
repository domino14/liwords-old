import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment-timezone';
import ReactMarkdown from 'react-markdown';


function timeFormatter(dtstring) {
  return moment(dtstring).tz(moment.tz.guess()).format('MMMM Do YYYY, h:mm:ss a');
}

const Comment = props => (
  <li className="media">
    <hr />
    <div className="media-body">
      <h5 className="media-heading">{props.username} @ {props.date}</h5>
      <ReactMarkdown source={props.comment} />
    </div>
  </li>
);

Comment.propTypes = {
  username: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
};

const Comments = (props) => {
  const divider = null;
  const comments = props.comments.map(comment => (
    <Comment
      key={comment.uuid}
      username={comment.username}
      date={timeFormatter(comment.created)}
      comment={comment.comment}
    />));
  return (
    <div
      style={{ maxHeight: 350, overflowY: 'scroll' }}
      ref={(domNode) => {
        if (domNode === null) {
          return;
        }
        domNode.scrollTop = domNode.scrollHeight; // eslint-disable-line no-param-reassign
      }}
    >
      {divider}
      <ul className="media-list">
        {comments}
      </ul>
    </div>
  );
};

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    username: PropTypes.string,
    created: PropTypes.string,
    comment: PropTypes.string,
    uuid: PropTypes.string,
  })).isRequired,
};

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

        <Comments
          comments={this.props.comments}
        />

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
  comments: PropTypes.arrayOf(PropTypes.shape({
    uuid: PropTypes.string,
    comment: PropTypes.string,
    turn_num: PropTypes.number,
    username: PropTypes.string,
    created: PropTypes.string,
  })),
};

export default Notes;
