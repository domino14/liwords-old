/**
 * @fileOverview This should be replaced with a reducer or something more
 * Reduxy. Also, while typing this I just realized the name Redux is probably
 * based on the concept of a reducer.
 */

class CommentHelper {
  /**
   * Return a list of comments that is the result of merging comment into
   * the commentList. Note: this assumes the comment already exists in the
   * comment list, we are just replacing the comment with the same UUID!
   * XXX: Does a linear search. If we move over to Redux, we'll make
   * some sort of database-like structure.
   */
  static mergeComment(comment, commentList) {
    return commentList.map((c) => {
      if (c.uuid === comment.uuid) {
        return comment;
      }
      return c;
    });
  }
  /**
   * Delete the comment and return a new list without the comment.
   * @param {string} uuid
   * @param {Array.<Object>} commentList
   */
  static deleteComment(uuid, commentList) {
    return commentList.filter(c => uuid !== c.uuid);
  }
}

export default CommentHelper;
