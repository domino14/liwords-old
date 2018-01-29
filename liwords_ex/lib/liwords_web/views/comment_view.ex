defmodule LIWordsWeb.CommentView do
  use LIWordsWeb, :view
  alias LIWordsWeb.CommentView

  def render("show.json", %{comment: comment}) do
    %{data: render_one(comment, CommentView, "comment.json")}
  end

  def render("index.json", %{comments: comments}) do
    %{data: render_many(comments, CommentView, "comment.json")}
  end

  def render("comment.json", %{comment: comment}) do
    %{uuid: comment.uuid,
      comment: comment.comment,
      turn_num: comment.turn_num,
      username: comment.user.username,
      created: comment.inserted_at,
      edited: comment.edited,
      }
  end

end
